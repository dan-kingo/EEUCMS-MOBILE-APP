import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { View, Text } from 'react-native';
import useNotificationStore from '../store/notificationsStore';

export default function TabLayout() {
  const theme = useTheme();

  // Get unread notification count from Zustand store
  const unreadCount = useNotificationStore((state) =>
    state.notifications.filter((n) => !n.isRead).length
  );

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
        tabBarIcon: ({ color, size, focused }) => {
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

          // Add badge for notifications tab
          if (route.name === 'notifications') {
            return (
              <View style={{ position: 'relative' }}>
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
                {unreadCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -8,
                      backgroundColor: 'red',
                      borderRadius: 10,
                      paddingHorizontal: 5,
                      minWidth: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            );
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
