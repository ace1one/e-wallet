import { API_URL } from '@/constants/api';
import {useCallback, useState } from 'react';
import { Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import { useAuth } from '@clerk/clerk-expo';

const API = `${API_URL}/transactions`;
export const useTransactions = (userId) => {
    const { getToken } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [ summary, setSummary] = useState(
        {
            income: 0,
            expenses: 0,
            balance: 0,
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWithAuth = async (url, options = {}) => {
        const token = await getToken({ template: 'mobile' });
        console.log('JWT Token:', token);
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      };
    
    const fetchTransactions = useCallback(async () => {
        setError(null);
        
        try {
            const response = await fetchWithAuth(API);
            if (!response.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch transactions',
                });
                return;
            }
            const data = await response.json();
            console.log('Fetched transactions:', data);
            setTransactions(data);
        } catch (err) {
            setError(err.message);
        }
    },[userId]);

    const fetchSummary = useCallback(async () => {

        setError(null);
        
        try {
            const response = await fetchWithAuth(`${API}/summary`);
            console.log('Summary',response)
            if (!response.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch summary',
                });
                return;
            }
            const data = await response.json();
            setSummary(data);
        } catch (err) {
            setError(err.message);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            await Promise.all([fetchTransactions(), fetchSummary()]);
        }
        catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [fetchTransactions, fetchSummary,userId]);

    const deleteTransaction = async (transactionId,userId) => {
        setError(null);
        try {
            const params = new URLSearchParams({
                transactionId: transactionId.toString(),
              });
            const response = await fetchWithAuth(`${API}?${params}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to delete transaction',
                });
                return;
            }
            loadData(); // Refresh data after deletion
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Transaction deleted successfully',
            });
        } catch (err) {
           Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.message,
            });
        }
    };
    
    return { transactions, summary, loading, error, loadData, deleteTransaction };
    }