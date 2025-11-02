import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function usePersistentState<T>(key: string, defaultValue: T): [T, (val: T) => void] {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(key);
                if (stored !== null) {
                    setState(JSON.parse(stored));
                }
            } catch (e) {
                console.error("Failed to load", e)
            }
        })();
    }, [key]);

    const setAndStore = (val: T) => {
        setState(val);
        AsyncStorage.setItem(key, JSON.stringify(val)).catch(e =>
            console.error("Failed to save", key, e)
        );
    };

    return [state, setAndStore];
}