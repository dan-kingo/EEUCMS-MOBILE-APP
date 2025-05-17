// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: 'transparent',
        },
        tabBarIcon: ({ color, size }) => {
          // Import the type for icon names
          type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];
          let iconName: IconName = 'home-outline';

          switch (route.name) {
            case 'home':
              iconName = 'home-outline';
              break;
            case 'complaints':
              iconName = 'file-document-outline';
              break;
            case 'notifications':
              iconName = 'bell-outline';
              break;
            case 'profile':
              iconName = 'account-outline';
              break;
            case 'settings':
              iconName = 'cog-outline';
              break;
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="complaints" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
