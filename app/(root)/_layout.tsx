import { ClerkProvider, useUser } from "@clerk/clerk-expo";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Layout() {
    const { isSignedIn , isLoaded} = useUser();
    if (!isLoaded) return null; // Wait for user data to load
    if (!isSignedIn) return <Redirect href="/sign-in" />;
    
    return (
    <SafeAreaView style={{ flex:1}}>
        {/* <Stack  screenOptions={{ headerShown: false }} > */}
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Statement',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
        {/* </Stack> */}
    </SafeAreaView>
    )
   
    }