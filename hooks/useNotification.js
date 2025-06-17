import { useState, useCallback, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useAuth } from '@clerk/clerk-expo';
import { API_URL } from '@/constants/api';

const API = `${API_URL}/notifications`;

export const useNotifications = () => {
  const { getToken, userId } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithAuth = async (url, options = {}) => {
    const token = await getToken({ template: 'mobile' });
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const fetchNotifications = useCallback(async () => {
    setError(null);
    try {
      const res = await fetchWithAuth(API);
      if (!res.ok) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to fetch notifications',
        });
        return;
      }
      const json = await res.json();
      setNotifications(json?.data || []);
    } catch (err) {
      console.error('[Notifications] Error:', err);
      setError(err.message);
    }
  }, []);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    await fetchNotifications();
    setLoading(false);
  }, [fetchNotifications]);

  const markAsRead = useCallback(async (id) => {
    try {
      const res = await fetchWithAuth(`${API}/read/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to mark as read');
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error('[Notifications] markAsRead error:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not mark notification as read',
      });
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      const res = await fetchWithAuth(`${API}/read-all`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error('Failed to mark all as read');
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('[Notifications] markAllAsRead error:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not mark all notifications as read',
      });
    }
  }, []);

  useEffect(() => {
    if (userId) loadNotifications();
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refresh: loadNotifications,
    markAsRead,
    markAllAsRead,
  };
};
