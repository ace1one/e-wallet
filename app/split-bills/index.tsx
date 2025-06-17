import { View, TouchableOpacity,Text } from "react-native";
import React from "react";
import { styles } from "@/assets/styles/split-bills/home.styles.js";
import { Image } from "expo-image";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import SplitBillCard from "@/components/SpliBillCard";
import RupeeIcon from '@/assets/images/rupee.svg';
import {
  Icon,
  IconElement,
  Layout,
  Tab,
  TabBar,
  TabBarProps,
  TabView
} from "@ui-kitten/components";
import { COLORS } from "@/constants/colors";
import  SplitBillCategory  from "@/constants/split-bill-category.js";
import { dateTimeFormat, formatDate } from "@/lib/utils";
import { router } from "expo-router";
import Group from "./group";

const PersonIcon = (index: number, selectedIndex: number) => (
  <Ionicons
    name="person-outline"
    size={20}
    color={index === selectedIndex ? COLORS.primary : COLORS.textLight}
  />
);

const GroupIcon = (index: number, selectedIndex: number) => (
  <Ionicons
    name="people-outline"
    size={20}
    color={index === selectedIndex ? COLORS.primary : COLORS.textLight}
  />
);

const ActivityIcon = (index: number, selectedIndex: number) => (
  <Ionicons
    name="newspaper-outline"
    size={20}
    color={index === selectedIndex ? COLORS.primary : COLORS.textLight}
  />
);






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
            <TouchableOpacity style={styles.groupAddButton} onPress={()=> router.push('/split-bills/create-group')}>
              <FontAwesome6 name="users-viewfinder" size={24} color="white" />
              <Text style={styles.groupAddButtonText}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>

        <SplitBillCard />
      </View>
      <View style={styles.tabContainer}>
        <TabView style={{ borderRadius:20 }}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab title="FRIENDS" icon={() => PersonIcon(0, selectedIndex)}>
            <Layout>
              <Text>USERS</Text>
            </Layout>
          </Tab>
          <Tab title="GROUP" icon={() => GroupIcon(1, selectedIndex)}>
            <Group />
          </Tab>
          <Tab title="ACTIVITY" icon={() => ActivityIcon(2, selectedIndex)}>
            <Layout>
              <Text>USERS</Text>
            </Layout>
          </Tab>
        </TabView>
      </View>
    </View>
  );
};

export default SplitBillsIndex;
