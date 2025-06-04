import {useCallback, useState } from 'react';
import { Alert} from 'react-native';

const API_URL = 'https://e-wallet-be.onrender.com/api/transactions';
export const useTransactions = (userId) => {
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
    
    const fetchTransactions = useCallback(async () => {
        setError(null);
        
        try {
            const response = await fetch(`${API_URL}?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
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
            const response = await fetch(`${API_URL}/summary?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch summary');
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
            const response = await fetch(`${API_URL}/userId=${userId}/transactionId=${transactionId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete transaction');
            }
            loadData(); // Refresh data after deletion
            Alert.alert('Success', 'Transaction deleted successfully');
        } catch (err) {
           Alert.alert('Error', err.message);
        }
    };
    
    return { transactions, summary, loading, error, loadData, deleteTransaction };
    }