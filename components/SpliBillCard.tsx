import { View, Text } from "react-native";
import React from "react";
import { styles } from "@/assets/styles/split-bills/home.styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { COLORS } from "@/constants/colors";
import RupeeIcon from "@/assets/images/rupee.svg";

const SplitBillCard = () => {
  const { user } = useUser();
  return (
    <View style={styles.billBalanceCard}>
      <Text style={{ fontSize: 16 }}>Hello,</Text>
      <Text style={styles.usernameText}>
        {user?.firstName || user?.username || "User"}
      </Text>

      <View style={styles.balanceCardContainer}>
        <View style={styles.balanceOwed}>
          <Text style={styles.balanceStatLabel}>You Get</Text>
          <View style={styles.balanceOwedContainer}>
            <RupeeIcon height={18} width={18} stroke={COLORS.primary} />
            <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
               500
            </Text>
          </View>
        </View>
        <View style={[styles.balanceOwed, styles.statDivider]} />
        <View style={styles.balanceOwed}>
          <Text style={styles.balanceStatLabel}>You Need To Pay</Text>
          <View style={styles.balanceOwedContainer}>
            <RupeeIcon height={18} width={18} stroke={COLORS.primary} />
            <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
               600
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SplitBillCard;
