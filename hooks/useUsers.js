import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { API_URL } from '@/constants/api';

const API = `${API_URL}/users`;

export const useUsers = ()=>{
    const { getToken, userId } = useAuth();
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useUser();
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

    const fetchUsers =  useCallback(async ()=>{
        setError(null);
        setLoadingUsers(true);
        try {
            const axiosInstance = await createAxiosInstance();
            const response = await axiosInstance.get('/');
            const { data } = response.data;
            const filteredUsers = data.filter((u) => u.clerk_id !== user?.id);
            setUsers(filteredUsers || []);
        
            setLoadingUsers(false);
        } catch (err) {
            console.error('[Users] Error:', err);
            setLoadingUsers(false);
            setError(err.message || 'Unknown error');
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch users',
            });
        }
    })

    useEffect(()=>{
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loadingUsers,
        error,
        fetchUsers,
    };
}