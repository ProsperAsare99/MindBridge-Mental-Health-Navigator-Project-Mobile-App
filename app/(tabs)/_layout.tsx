import { Tabs } from 'expo-router';
import { Home, BarChart2, ClipboardCheck, BookOpen, User } from 'lucide-react-native';
import { useTheme } from '../../src/context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="assessment"
        options={{
          title: 'Assess',
          tabBarIcon: ({ color, size }) => <ClipboardCheck color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          href: null, // Hidden for now, accessible from dashboard
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          href: null, // Hidden for now, accessible from dashboard
        }}
      />
    </Tabs>
  );
}
