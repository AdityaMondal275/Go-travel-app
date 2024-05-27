import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ItemCardContainer = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ItemScreen", { param: data !== null && data })
      }
      className="rounded-md space-y-2 px-3 py-2 bg-gray-200 w-[182px] my-2"
    >
      <Image
        source={{ uri: imageSrc }}
        className="w-full h-40 rounded-md object-cover"
      />

      {title ? (
        <>
          <Text className="text-[rgb(66,130,136)] text-[2xl] font-bold">
            {title?.length > 14 ? `${title.slice(0, 14)}..` : title}
          </Text>
          <View className="flex-row">
            <Ionicons name="location-outline" size={24} color="black" />
            <Text className="text-[rgb(66,130,136)] text-[2xl]">
              {location?.length > 14 ? `${location.slice(0, 14)}..` : location}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default ItemCardContainer;
