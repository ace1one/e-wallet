import { ScrollView, Dimensions, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useUser, SignedIn } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "@/hooks/useTransactions";
import PageLoader from "@/components/PageLoader";
import { styles } from "@/assets/styles/home.styles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import BalanceCard from "@/components/BalanceCard";
import TransactionList from "@/components/TransactionList";
import NoTransactionPage from "@/components/NoTransactionPage";
import { formatDate, groupTransactionsByDate } from "@/lib/utils";
import { COLORS } from "@/constants/colors";
import HorizontalBarChart from "@/components/HorizontalBarChart";

const screenWidth = Dimensions.get("window").width;

export default function Page() {
  const { user } = useUser();
  const router = useRouter();
  const [isAmountShow, setIsAmountShow] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, summary, loading, loadData, deleteTransaction } =
    useTransactions(user?.id);

  const limitedTransactions = transactions.slice(0, 5);
  const groupedTransactions = groupTransactionsByDate(limitedTransactions);

  useEffect(() => {
    if (user?.id) loadData();
  }, [loadData]);

  const onRefreshTransaction = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (loading && !refreshing) return <PageLoader />;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefreshTransaction}
        />
      }
    >
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
              onPress={() => router.push("/(screens)/createTransactions")}
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
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => router.push("/transactions")}
          >
            <Text style={styles.sectionTitle}>View All</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {groupedTransactions.length === 0 ? (
            <NoTransactionPage />
          ) : (
            groupedTransactions.map((item, index) =>
              item.type === "header" ? (
                <Text style={styles.dateLabel} key={`header-${item.date}`}>
                  { formatDate(item.date) }
                </Text>
              ) : (
                <TransactionList
                  key={`item-${item.id}`}
                  item={item}
                  isAmountShow={isAmountShow}
                  onDelete={(id: number) => deleteTransaction(id, user?.id)}
                />
              )
            )
          )}
        </View>

        {/* Horizontal Bar Chart */}
     
          {/* <HorizontalBarChart /> */}
       
      </View>
    </ScrollView>
  );
}
