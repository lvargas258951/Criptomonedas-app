import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFrameworkReady } from '@/hooks';
import { ThemeProvider, LanguageProvider, FavoritesProvider } from '@/contexts';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <FavoritesProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
            </Stack>
            <StatusBar style="auto" />
          </FavoritesProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}