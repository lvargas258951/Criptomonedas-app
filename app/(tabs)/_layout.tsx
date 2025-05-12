import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Home, Heart, Settings } from 'lucide-react-native';
import { useTheme } from '@/contexts';
import { Colors } from '@/constants';

/**
 * Tab layout component
 */
export default function TabLayout() {
  const { theme } = useTheme();
  
  // Use theme colors
  const isDark = theme === 'dark';
  const backgroundColor = isDark ? Colors.dark.background : Colors.light.background;
  const tabBarColor = isDark ? Colors.dark.card : Colors.light.card;
  const textColor = isDark ? Colors.dark.text : Colors.light.text;
  const activeColor = Colors.primary.main;
  const inactiveColor = isDark ? Colors.neutral.medium : Colors.neutral.dark;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: tabBarColor,
          borderTopColor: isDark ? Colors.dark.border : Colors.light.border,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}