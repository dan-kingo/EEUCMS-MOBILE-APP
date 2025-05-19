import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import useNotificationStore from "../../store/notificationsStore";
const router = useRouter();
const NotificationScreen = () => {
  const { notifications, fetchNotifications, markAsRead, markAllAsRead } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleClick = async (n: any) => {
    if (!n.isRead) await markAsRead(n._id);
    router.push("/(tabs)/complaints");
  };

  const handleMarkAll = async () => {
    await markAllAsRead();
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#212121" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#ff784b"
          />
          <Text style={{ color: "#f2f2f2", fontSize: 20, marginLeft: 8 }}>
            Notifications
          </Text>
        </View>

        {unreadCount > 0 && (
          <Button
            mode="text"
            compact
            onPress={handleMarkAll}
            textColor="#ff784b"
            style={{ paddingVertical: 0 }}
            icon={() => (
              <MaterialCommunityIcons
                name="check-all"
                size={16}
                color="#ff784b"
              />
            )}
          >
            Mark all as read
          </Button>
        )}
      </View>

      <Divider style={{ marginBottom: 12, backgroundColor: "#444" }} />

      {/* Notification List */}
      {notifications.length === 0 ? (
        <Text style={{ color: "#aaa", textAlign: "center", marginTop: 40 }}>
          No notifications
        </Text>
      ) : (
        <FlashList
          data={notifications}
          estimatedItemSize={80}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClick(item)}>
              <Card
                style={{
                  backgroundColor: item.isRead ? "#333" : "#2c2c2c",
                  marginBottom: 12,
                }}
              >
                <Card.Content>
                  <Text
                    style={{
                      fontSize: 14,
                      color: item.isRead ? "#999" : "#f2f2f2",
                      marginBottom: 4,
                    }}
                  >
                    {item.message}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#888" }}>
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
