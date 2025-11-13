import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const cache = new Map<string, unknown>();
const subs = new Map<string, Set<(v: unknown) => void>>();

export default function usePersistentState<T>(
    key: string,
    defaultValue: T
): [T, (val: T) => void, boolean] {
    const [state, setState] = useState<T>(() =>
        cache.has(key) ? (cache.get(key) as T) : defaultValue
    );
    const [isLoading, setIsLoading] = useState<boolean>(() => !cache.has(key));

    useEffect(() => {
        let mounted = true;

        // Subscribe to updates for this key
        let set = subs.get(key);
        if (!set) {
            set = new Set();
            subs.set(key, set);
        }
        const subscriber = (v: unknown) => {
            if (!mounted) return;
            setState(v as T);
        };
        set.add(subscriber);

        // If we don't have a cached value, load from AsyncStorage
        if (!cache.has(key)) {
            (async () => {
                try {
                    const stored = await AsyncStorage.getItem(key);
                    if (stored !== null) {
                        const parsed = JSON.parse(stored) as T;
                        cache.set(key, parsed);
                        set.forEach((s) => s(parsed));
                        if (mounted) setState(parsed);
                    } else {
                        // store default for future mounts
                        cache.set(key, defaultValue);
                    }
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error("usePersistentState: failed to load", key, e);
                } finally {
                    if (mounted) setIsLoading(false);
                }
            })();
        } else {
            // already in cache
            setIsLoading(false);
        }

        return () => {
            mounted = false;
            const s = subs.get(key);
            if (s) s.delete(subscriber);
        };
    }, [key, defaultValue]);

    const setAndStore = (val: T) => {
        // Update local state and in-memory cache immediately
        setState(val);
        cache.set(key, val);

        // Notify other subscribers
        const set = subs.get(key);
        if (set) {
            set.forEach((s) => {
                try {
                    s(val as unknown);
                } catch (_) {}
            });
        }

        // Persist asynchronously
        AsyncStorage.setItem(key, JSON.stringify(val)).catch((e) =>
            // eslint-disable-next-line no-console
            console.error("usePersistentState: Failed to save", key, e)
        );
    };

    return [state, setAndStore, isLoading];
}
