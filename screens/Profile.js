import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Avater } from "../assets"; // Corrected import for Avatar
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ScrollView } from "react-native-web";

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    axios
      .post("http://192.168.29.72:5000/userdata", { token: token })
      .then((res) => {
        setUserData(res.data.data.user);
        setBookings(res.data.data.bookings);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("isLoggedIn");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#2A2B4B] relative">
      <ScrollView className="flex-1 px-4 py-4 bg-[#2A2B4B]">
        <View className="flex-1 px-8 pt-16">
          <View className="flex-1 absolute flex-row inset-x-0 top-5 justify-between px-4">
            <Pressable
              onPress={() => navigation.navigate("Discover")}
              className="w-6 h-6 rounded-md items-center justify-center bg-[#2A2B4B]"
            >
              <FontAwesome name="chevron-left" size={14} color="white" />
            </Pressable>
            <Pressable
              onPress={handleLogout}
              className="w-6 h-6 rounded-md items-center justify-center bg-[#2A2B4B]"
            >
              <FontAwesome name="sign-out" size={20} color="white" />
            </Pressable>
          </View>
          <View className="flex-row items-center mb-8">
            <Image source={Avater} className="w-20 h-20 rounded-full mr-4" />
            <Text className="text-2xl font-bold text-white">
              {userData.name}
            </Text>
          </View>
          <View className="mb-4">
            <Text className="text-lg font-bold text-white">
              Personal Information
            </Text>
          </View>
          <View className="mb-4">
            <Text className="text-lg text-white">Email: {userData.email}</Text>
          </View>
          <View className="mb-4">
            <Text className="text-lg text-white">
              Mobile: {userData.mobile}
            </Text>
          </View>
          <View className="mb-4">
            <Text className="text-lg font-bold text-white">Bookings</Text>
            {bookings.map((booking, index) => (
              <View key={index} className="mb-4 p-4 bg-gray-300 rounded-lg">
                <Image
                  source={{ uri: booking.itemImage }}
                  className="w-full h-40 rounded-lg"
                />
                <Text className="text-lg text-black mt-2">
                  Item: {booking.itemName}
                </Text>
                <Text className="text-lg text-black">
                  Details: {booking.itemDetails}
                </Text>
                <Text className="text-lg text-black">
                  Date: {new Date(booking.bookingDate).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
