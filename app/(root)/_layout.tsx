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
      <Stack.Screen
                name="create"
                options={{ headerShown: false }} // Configure create.tsx as a stack screen
            />
        {/* <Stack  screenOptions={{ headerShown: false }} > */}
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue',headerShown:false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Statement',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="receipt-outline" color={color} />,
        }}
      />
    </Tabs>
        {/* </Stack> */}
    </SafeAreaView>
    )
   
    }