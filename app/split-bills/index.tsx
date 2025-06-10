import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/assets/styles/split-bills/home.styles.js";
import { Image } from "expo-image";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import SplitBillCard from "@/components/SpliBillCard";
import {
  Icon,
  IconElement,
  Tab,
  TabBar,
  TabBarProps,
} from "@ui-kitten/components";
const PersonIcon = () => (
  <Ionicons name="person-outline" size={20} color="gray" />
);

const BellIcon = () => (
  <Ionicons name="notifications-outline" size={20} color="gray" />
);

const MailIcon = () => <Ionicons name="mail-outline" size={20} color="gray" />;

// const useTabBarState = (initialState = 0): Partial<TabBarProps> => {
//   const [selectedIndex, setSelectedIndex] = React.useState(initialState);
//   return { selectedIndex, onSelect: setSelectedIndex };
// };

const SplitBillsIndex = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/split-bill.png")}
              style={styles.headerLogo}
            />
            <Text style={styles.headerTitle}>Split Bills</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.groupAddButton}>
              <FontAwesome6 name="users-viewfinder" size={24} color="white" />
              <Text style={styles.groupAddButtonText}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>

        <SplitBillCard />
      </View>
      <View style={{ marginTop: 80 }}>
        <TabBar
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab title="USERS" icon={PersonIcon} />
          <Tab title="ORDERS" icon={BellIcon} />
          <Tab title="TRANSACTIONS" icon={MailIcon} />
        </TabBar>
      </View>
    </View>
  );
};

export default SplitBillsIndex;
