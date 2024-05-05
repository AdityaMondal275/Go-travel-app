import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity,  } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { Attractions, Avater, Hotels, Restaurants } from '../assets';
import MenuContainer from '../components/MenuContainer';

import { FontAwesome } from '@expo/vector-icons';
import ItemCarContainer from '../components/ItemCarContainer';

const Discover = () => {
    const navigation = useNavigation();

    const [type, setType] = useState("restaurants")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown : false,
    });
  }, [])
  
  return (
    <SafeAreaView className="flex-1 bg-[#2A2B4B] relative">
      <View  className="flex-row items-center justify-between px-8 mt-8">
        <View>
            <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
            <Text className="text-[#527283] text-[36px]">The beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-full items-center justify-center">
            <Image
                source={Avater}
                className="w-full h-full rounded-full object-cover shadow-lg"
            />
        </View>
      </View>

      <View className="flex-row items-center bg-gray-50 mx-4 rounded-xl py-1 px-2 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields : 'geometry'}}
          placeholder='Search for places here'
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
          }}

          // query={{
          //   key: 'YOUR API KEY',
          //   language: 'en',
          // }}
        />

      </View>

      {/*Menu container*/}
      <ScrollView>
        <View className='flex-row irems-center justify-between px-8 mt-8'>
            <MenuContainer
              key={"hotel"}
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
            <Text className="text-[#2C7379] text-[28px] font-bold">Top Tips</Text>
            <TouchableOpacity className="flex-row items-center justify-center space-x-2">
              <Text className="text-[#A0C4C7] text-[20px] font-bold">Explore</Text>
              <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
            </TouchableOpacity>
          </View>

          <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
            <ItemCarContainer 
              key={"101"} 
              imageSrc={
                "https://cdn.pixabay.com/photo/2024/01/04/16/48/landscape-8487906_1280.jpg"
                } 
              title="Soothing" 
              location="Italy"/>
            <ItemCarContainer 
            key={"102"} 
            imageSrc={
              "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
              } 
            title="Adventure" 
            location="Barcelona"/>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Discover

