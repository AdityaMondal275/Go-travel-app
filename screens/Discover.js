import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avater, Hotels, NotFound, Restaurants } from "../assets";
import MenuContainer from "../components/MenuContainer";

import { FontAwesome } from "@expo/vector-icons";
import ItemCardContainer from "../components/ItemCardContainer";

import {
  OpeenStreetMap,
  OpenStreetMapAutocomplete,
} from "@amraneze/osm-autocomplete";
import { getPlacesData } from "../api/index";

const Discover = () => {
  const navigation = useNavigation();

  let handleOnOptionSelected = (option) => {
    console.log(JSON.stringify(option));

    setBl_lat(option.boundingbox[0]);
    setTr_lat(option.boundingbox[1]);
    setBl_lng(option.boundingbox[2]);
    setTr_lng(option.boundingbox[3]);
  };

  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleTextChange = (text) => {
    console.log(text);
    setInputValue(text);
  };

  const handleSuggestionSelect = (suggestion) => {
    // Handle the selected suggestion here
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  console.log("first", mainData);

  return (
    <SafeAreaView className="flex-1 bg-[#2A2B4B] relative">
      <View className="flex-row items-center justify-between px-8 mt-8">
        <View>
          <Text className="text-[40px] text-white font-bold">Discover</Text>
          <Text className="text-[#a9b9c1] text-2xl">The beauty today</Text>
        </View>

        <View className="relative">
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            className="w-12 h-12 bg-black rounded-full items-center justify-center"
          >
            <Image
              source={Avater}
              className="w-full h-full rounded-full object-cover"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row items-center bg-gray-500 mx-6 rounded-xl py-1 px-2 mt-4 z-10">
        <OpenStreetMapAutocomplete
          value={null}
          onChange={handleOnOptionSelected}
          fetchDetails={true}
        />
      </View>

      {isLoading ? (
        <View className="flex-1 mt-[100px]">
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <ScrollView>
          <View className="flex-row items-center justify-between rounded-full px-8 mt-8">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#a9b9c1] text-[28px] font-bold">
                Top Tips
              </Text>
              <Pressable className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#a9b9c1] text-[20px] font-bold">
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#a9b9c1"
                />
              </Pressable>
            </View>

            <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCardContainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[600px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className="w-40 h-40 object-cover"
                    />
                    <Text className="text-white font-bold">Not Found..</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
