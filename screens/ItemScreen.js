import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();
  const data = route?.params?.param;
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  console.log("data", data);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  console.log("first", data);

  const handleBookNow = async () => {
    const token = await AsyncStorage.getItem("token");
    const bookingDetails = {
      token: token,
      itemName: data?.name,
      itemDetails: details,
      itemImage: data?.photo?.images?.large?.url || "default_image_url",
    };

    try {
      const response = await axios.post(
        "http://192.168.29.72:5000/book",
        bookingDetails
      );
      if (response.data.status === "ok") {
        alert("Booking successful!");
        setModalVisible(false);
      } else {
        alert("Booking failed: " + response.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Booking failed: " + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#2A2B4B] relative">
      <ScrollView className="flex-1 px-4 py-4 bg-[#2A2B4B]">
        <View className="relative bg-gray-300 rounded-2xl">
          <Image
            source={{
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
            }}
            className="w-full h-60 rounded-2xl"
          />

          <View className="absolute flex-row inset-x-0 top-5 justify-between px-4">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")}
              className="w-6 h-6 rounded-md items-center justify-center bg-[#2A2B4B]"
            >
              <FontAwesome name="chevron-left" size={14} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="w-6 h-6 rounded-md items-center justify-center bg-[#2A2B4B]">
              <FontAwesome name="heart" size={14} color="red" />
            </TouchableOpacity>
          </View>

          <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-4">
            <View className="flex-row space-x-2 items-center">
              <Text className="text-[32px] font-bold text-white">
                {data?.price}
              </Text>
            </View>

            <View className="px-2 py-2 rounded-md bg-black">
              <Text className="text-[#d2cd84] font-semibold">
                {data?.open_now_text}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-[#d2cd84] text-[30px] font-bold">
            {data?.name}
          </Text>
          <View className="flex-row items-center space-x-2 mt-2">
            <FontAwesome name="map-marker" size={25} color="white" />
            <Text className="text-white text-[16px]">
              {data?.location_string}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          {data?.rating && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-200 items-center justify-center">
                <FontAwesome name="star" size={20} color="white" />
              </View>
              <View>
                <Text className="text-white">{data?.rating}</Text>
                <Text className="text-white">Ratings</Text>
              </View>
            </View>
          )}

          {data?.price_level && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-200 items-center justify-center">
                <MaterialIcons name="attach-money" size={20} color="white" />
              </View>
              <View>
                <Text className="text-white">{data?.price_level}</Text>
                <Text className="text-white">Price Level</Text>
              </View>
            </View>
          )}

          {data?.bearing && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-200 items-center justify-center">
                <FontAwesome5 name="map-signs" size={20} color="white" />
              </View>
              <View>
                <Text className="text-white capitalize">{data?.bearing}</Text>
                <Text className="text-white">Bearing</Text>
              </View>
            </View>
          )}
        </View>

        {data?.description && (
          <Text className="mt-4 tracking-wide text-[16px] font-semibold text-gray-300">
            {data?.description}
          </Text>
        )}

        {data?.cuisine && (
          <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
            {data?.cuisine.map((n) => (
              <TouchableOpacity
                key={n.key}
                className="px-2 py-1 rounded-md bg-white"
              >
                <Text>{n?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="space-y-2 mt-4 bg-gray-200 rounded-2xl px-4 py-2">
          {data?.phone && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="phone" size={24} color="red" />
              <Text className="text-lg text-black"> {data?.phone} </Text>
            </View>
          )}
          {data?.email && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="envelope" size={24} color="red" />
              <Text className="text-lg text-black"> {data?.email} </Text>
            </View>
          )}
          {data?.address && (
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="map-pin" size={24} color="red" />
              <Text className="text-lg text-black">{data?.address}</Text>
            </View>
          )}

          <TouchableOpacity
            className="mt-4 px-4 py-4 rounded-lg bg-black items-center justify-center mb-8"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-3xl font-semibold uppercase tracking-wider text-gray-200">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-800 bg-opacity-50">
          <View className="w-11/12 bg-white p-8 rounded-lg shadow-lg">
            <Text className="text-2xl font-bold mb-6 text-gray-800">
              Booking Form
            </Text>

            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              className="border-b border-gray-300 mb-6 p-2 text-lg text-gray-700"
            />

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              className="border-b border-gray-300 mb-6 p-2 text-lg text-gray-700"
            />

            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              className="border-b border-gray-300 mb-6 p-2 text-lg text-gray-700"
            />

            <TextInput
              placeholder="Details"
              value={details}
              onChangeText={setDetails}
              className="border-b border-gray-300 mb-6 p-2 text-lg text-gray-700"
            />

            <View className="flex-row justify-between mt-6">
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#FF6347" // Tomato color for cancel button
              />
              <Button
                title="Book"
                onPress={handleBookNow}
                color="#32CD32" // LimeGreen color for book button
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ItemScreen;
