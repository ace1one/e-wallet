import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useAuth } from '@clerk/clerk-expo';
import { API_URL } from '@/constants/api';

const API = `${API_URL}/group`;

export const useGroups = () => {
  const { getToken, userId } = useAuth();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create an axios instance once the token is available
  const createAxiosInstance = async () => {
    const token = await getToken({ template: 'mobile' });

    return axios.create({
      baseURL: API,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  const createGroup = useCallback(async (data) => {
    setError(null);
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.post('/create', data);

      console.log('[Groups] Created:', response.data?.data);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Group created successfully',
      });
      return response.data?.data;
    } catch (err) {
      console.error('[Groups] Error:', err);
      setError(err.message || 'Unknown error');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create group',
      });
    }
  }
  , [loadGroups]);  



  const fetchGroupsDetails = useCallback(async () => {
    setError(null);
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get('/details');

      setGroups(response.data?.data || []);
    } catch (err) {
      console.error('[Groups] Error:', err);
      setError(err.message || 'Unknown error');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch groups',
      });
    }
  }, []);

  const loadGroups = useCallback(async () => {
    setLoading(true);
    await fetchGroupsDetails();
    setLoading(false);
  }, [fetchGroupsDetails]);

  useEffect(() => {
    if (userId) loadGroups();
  }, [fetchGroupsDetails]);

  return {
    groups,
    loading,
    error,
    refresh: loadGroups,
    createGroup
  };
};
