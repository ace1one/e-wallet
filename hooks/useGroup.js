import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '@clerk/clerk-expo';
import { API_URL } from '@/constants/api';


const API = `${API_URL}/group`;

export const useGroups = () => {
    const { getToken, userId } = useAuth();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false)
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

      const fetchGroupsDetails = useCallback(async () => {
        setError(null);
        try {
          const response = await fetchWithAuth(`${API}/details`);
          if (!response.ok) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Failed to fetch groups',
            });
            return;
          }
          const result = await response.json();
          console.log('[Groups] Fetched:', result.data);
          setGroups(result?.data || []);
        } catch (err) {
          console.error('[Groups] Error:', err);
          setError(err.message);
        }
      }, []);
    
      const loadGroups = useCallback(async () => {
        setLoading(true);
        await fetchGroupsDetails();
        setLoading(false);
      }, [fetchGroupsDetails]);
    
      useEffect(() => {
        if (userId) loadGroups();
      }, [userId]);
    
      return {
        groups,
        loading,
        error,
        refresh: loadGroups,
      };

}