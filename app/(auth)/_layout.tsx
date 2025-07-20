import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from 'react';

export default function AuthLayout() {
    const [token, setToken] = useState<string | null>(null);

    const getToken = async () => {
        const token = await AsyncStorage.getItem('token');
        setToken(token);
    }

    useEffect(() => {
        getToken();
    }, []);

    if (token) {
        return <Redirect href="/(tabs)" />;
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
    );
}