import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";

import { Image } from "expo-image";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import SplitBillCard from "@/components/SpliBillCard";
import RupeeIcon from "@/assets/images/rupee.svg";
import { dateTimeFormat } from "@/lib/utils";
import { styles } from "@/assets/styles/split-bills/home.styles";
import SplitBillCategory from "@/constants/split-bill-category";
import PageLoader from "@/components/PageLoader";
import { useGroups } from "@/hooks/useGroup.js";


    type CategoryIconName =
    | "home-outline"
    | "airplane-outline"
    | "heart-outline"
    | "help-circle-outline";
    export const getCategoryIcon = (type: string): CategoryIconName => {
    const match = SplitBillCategory.find(
        (item) => item.name.toLowerCase() === type.toLowerCase()
    );
    return (match?.icon ?? "help-circle-outline") as CategoryIconName;
    };


const Group = () => {
  const { groups, loading, error, refresh } = useGroups();
    console.log('group', groups)
  if (loading) return <PageLoader />;
  return (
    <View>
      {groups.map((group: any) => (
        <TouchableOpacity style={styles.groupListContainer} key={group.id}>
          <View style={styles.groupListItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.groupIconContainer}>
                <Ionicons
                  style={styles.groupIcon}
                  size={35}
                  name={getCategoryIcon(group.type)}
                />
              </View>
              <View style={styles.transactionContainer}>
                <Text style={styles.groupTitle}>{group.name}</Text>
                <Text style={styles.groupLastTransaction}>{group.status}</Text>

              </View>
            </View>

            <View style={styles.balanceOwedContainer}>
              <RupeeIcon height={18} width={18} stroke={COLORS.primary} />
              <Text>{group.totalExpense}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Group;
