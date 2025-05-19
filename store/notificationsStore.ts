import { create } from "zustand";
import axios from "axios";

export interface Notification {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  markAllAsRead: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],

  fetchNotifications: async () => {
    try {
      const res = await axios.get(
        "https://aicms-api.onrender.com/api/notifications",
        { withCredentials: true }
      );
      set({ notifications: res.data });
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  },

  markAllAsRead: async () => {
    try {
      await axios.put(
        "https://aicms-api.onrender.com/api/notifications/mark-all-read",
        {},
        { withCredentials: true }
      );
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      }));
    } catch (error) {
      console.error("Error marking all notifications as read", error);
    }
  },

  markAsRead: async (id: string) => {
    try {
      await axios.put(
        `https://aicms-api.onrender.com/api/notifications/${id}/read`,
        {},
        { withCredentials: true }
      );
      set({
        notifications: get().notifications.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        ),
      });
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  },
}));

export default useNotificationStore;
