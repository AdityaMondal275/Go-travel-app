import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Discover from "./screens/Discover";
import ItemScreen from "./screens/ItemScreen";
import Profile from "./screens/Profile";
import Bookings from "./screens/Bookings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const WithoutLogin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Bookings" component={Bookings} />
    </Stack.Navigator>
  );
};

const WithLogin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Bookings" component={Bookings} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem("isLoggedIn");
      if (data !== null) {
        setIsLoggedIn(data === "true");
      }
    } catch (error) {
      console.error("Failed to fetch login status from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TailwindProvider>
      <NavigationContainer>
        {isLoggedIn ? <WithLogin /> : <WithoutLogin />}
      </NavigationContainer>
    </TailwindProvider>
  );
}
