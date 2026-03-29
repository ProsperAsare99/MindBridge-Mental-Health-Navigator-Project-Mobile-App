import { Stack, useRouter, useSegments } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext';
import { AuthProvider, useAuthContext } from '../src/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { token, isLoading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const onLandingPage = !segments[0] || segments[0] === 'index';

    if (!token && !inAuthGroup && !onLandingPage) {
      // Redirect to landing if not authenticated and not in auth group/landing
      router.replace('/');
    } else if (token && (inAuthGroup || onLandingPage)) {
      // Redirect to dashboard if authenticated but trying to access auth/landing
      router.replace('/(tabs)/dashboard');
    }
  }, [token, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RootLayoutNav />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
