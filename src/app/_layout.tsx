import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserProvider from './context/UserContext';
import HistoryProvider from './context/HistoryContext';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AnimatedSplashOverlay />
          <HistoryProvider>
            <Stack
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="index" />
            </Stack>
          </HistoryProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </UserProvider>
  );
}
