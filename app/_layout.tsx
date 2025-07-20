import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "./global.css";


import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  })

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </QueryClientProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
