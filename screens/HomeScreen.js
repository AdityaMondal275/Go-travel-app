import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";
import { AppLogo } from "../assets";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState("signUp"); // 'signUp' or 'login'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [animation, setAnimation] = useState("fadeIn"); // Animation state

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSignUp = () => {
    if (!name || !email || !phone || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const userData = {
      name,
      email,
      mobile: phone,
      password,
    };
    axios
      .post("http://192.168.29.72:5000/register", userData)
      .then((res) => {
        if (res?.data?.status == "ok") {
          Alert.alert("Registered Successfully");
          setTimeout(() => {
            setMode("login");
          }, 1000);
        } else {
          Alert.alert("Error", JSON.stringify(res?.data));
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.29.72:5000/login", userData)
      .then((res) => {
        if (res?.data?.status == "ok") {
          Alert.alert("Logged in  Successfully");
          console.log("first", res?.data?.status);
          AsyncStorage.setItem("token", res?.data?.token);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          setTimeout(() => {
            closeModal();
            navigation.navigate("Discover");
          }, 1300);
        } else {
          Alert.alert("Error", JSON.stringify(res?.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeMode = (newMode) => {
    setAnimation("fadeOut");
    setTimeout(() => {
      setMode(newMode);
      setAnimation("fadeIn");
    }, 500); // Duration of the fadeOut animation
  };

  return (
    <SafeAreaView className="bg-[#2A2B4B] flex-1 relative">
      {/* First Section */}
      <View className="flex-row px-6 mt-12 items-center space-x-2">
        <View className="w-20 h-20 bg-white rounded-full items-center justify-center">
          <Image source={AppLogo} className="w-full h-full object-cover" />
        </View>
        <Text className="text-white text-3xl font-bold">The Travel Guide</Text>
      </View>

      <View className="px-6 mt-6 mb-8 space-y-3">
        <Text className="text-white text-2xl font-semibold">
          Let's plan for Trips
        </Text>
        <Text className="text-[#d2cd84] text-3xl font-bold">Together</Text>
        <Text className="text-[#a9b9c1] text-base">
          Search for your favourite places and know all the best restaurants,
          hotels, and attraction spots.
        </Text>
      </View>

      <View className="w-[50%] h-[50%] bg-[#a9b9c1] rounded-[90px] absolute bottom-24 -right-36"></View>
      <View className="w-[50%] h-[60%] bg-[#d2cd84] rounded-[90px] absolute -bottom-32 -left-36"></View>

      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image
          animation="fadeIn"
          easing="ease-in-out"
          source={HeroImage}
          className="w-[221px] h-[500px] object-cover"
        />

        <Pressable
          onPress={openModal}
          className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-black rounded-full items-center justify-center"
        >
          <Animatable.View
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"}
            className="w-20 h-20 items-center justify-center rounded-full bg-black"
          >
            <Text className="text-gray-50 text-[40px] font-semibold">Go</Text>
          </Animatable.View>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white w-80 p-6 rounded-lg shadow-lg">
            <Text className="text-xl font-bold mb-4 text-center">
              {mode === "signUp" ? "Sign Up" : "Login"}
            </Text>

            <View className="flex-row justify-center mb-4">
              <TouchableOpacity
                onPress={() => changeMode("signUp")}
                className={`px-4 py-2 ${
                  mode === "signUp" ? "bg-[#2A2B4B]" : "bg-gray-300"
                } rounded-full mx-2`}
              >
                <Text
                  className={`text-center font-semibold ${
                    mode === "signUp" ? "text-white" : "text-black"
                  }`}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeMode("login")}
                className={`px-4 py-2 ${
                  mode === "login" ? "bg-[#2A2B4B]" : "bg-gray-300"
                } rounded-full mx-2`}
              >
                <Text
                  className={`text-center font-semibold ${
                    mode === "login" ? "text-white" : "text-black"
                  }`}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            <Animatable.View animation={animation} duration={500}>
              {mode === "signUp" && (
                <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  className="border-b border-gray-300 mb-4 p-2"
                />
              )}
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                className="border-b border-gray-300 mb-4 p-2"
                keyboardType="email-address"
              />
              {mode === "signUp" && (
                <TextInput
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  className="border-b border-gray-300 mb-4 p-2"
                  keyboardType="phone-pad"
                />
              )}
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                className="border-b border-gray-300 mb-4 p-2"
                secureTextEntry
              />
              <TouchableOpacity
                onPress={mode === "signUp" ? handleSignUp : handleLogin}
                className="bg-[#2A2B4B] py-2 px-4 rounded-full mb-2"
              >
                <Text className="text-white text-center font-semibold">
                  {mode === "signUp" ? "Sign Up" : "Login"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                className="bg-red-500 py-2 px-4 rounded-full"
              >
                <Text className="text-white text-center font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
