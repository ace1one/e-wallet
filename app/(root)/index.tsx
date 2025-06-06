import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { useState,useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '@/hooks/useTransactions'
import PageLoader from '@/components/PageLoader'
import { styles } from '@/assets/styles/home.styles'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import BalanceCard from '@/components/BalanceCard'
import TransactionList from '@/components/TransactionList'
import NoTransactionPage from '@/components/NoTransactionPage'
import { groupTransactionsByDate } from '@/lib/utils'


export default function Page() {
  const { user } = useUser()
  const router = useRouter()
  const [isAmountShow, setIsAmountShow] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, summary, loading, loadData, deleteTransaction  } =  useTransactions(user?.id)
  useEffect(() => {
    if (user?.id) {
      loadData()
    }
  },[loadData])

  const onRefreshTransaction = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  const handleTransaction = (id: number) => {
    Alert.alert('Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTransaction(id,user?.id)
          }
        }
      ]
    )
  }

if(loading && !refreshing) return <PageLoader />
const groupedTransactions = groupTransactionsByDate(transactions);
console.log('Grouped Transactions:', groupedTransactions);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.firstName || user?.username || "User"}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={24} color="white" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            <SignedIn>
              <SignOutButton />
            </SignedIn>
          </View>
        </View>

        <BalanceCard
          summary={summary}
          isAmountShow={isAmountShow}
          toggleAmountShow={() => setIsAmountShow((prev) => !prev)}
        />
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recents Transactions</Text>
        </View>
      </View>

      {/* <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionList
            item={item}
            isAmountShow={isAmountShow}
            onDelete={(id: number) => handleTransaction(id)}
           />
        )}
        ListEmptyComponent={<NoTransactionPage />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshTransaction} />}
      /> */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        keyExtractor={(item, index) => {
          if (item.type === 'header') {
            // Use date + "header" as key
            return `header-${item.date}`;
          } else {
            // Use unique transaction id with a prefix
            return `item-${item.id}`;
          }
        }}
        data={groupedTransactions}
        renderItem={({ item }) =>
          item.type === "header" ? (
            <Text style={styles.dateLabel}>
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          ) : (
            <TransactionList
              item={item}
              isAmountShow={isAmountShow}
              onDelete={(id: number) => handleTransaction(id)}
            />
          )
        }
        ListEmptyComponent={<NoTransactionPage />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshTransaction}
          />
        }
      />
    </View>
  );
}