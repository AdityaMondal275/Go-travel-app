import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useLayoutEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import { HeroImage } from '../assets';
import { AppLogo} from '../assets';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {

const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown : false,
    });
  }, [])

  // [#A0C4C7]
  return (
    <SafeAreaView className ="bg-[#2A2B4B] flex-1 relative">
      {/* First Section  */}
      <View className="flex-row px-6 mt-12 items-center space-x-2">
        
        <View className="w-20 h-20 bg-white rounded-full items-center justify-center">
          {/* <Text className="text-[#4DABB7] text-4xl font-semibold ">Go</Text> */}
          <Image
                source={AppLogo}
                className="w-full h-full object-cover"
            />
        </View>

        <Text className="text-white text-3xl font-bold">The Travel Guide</Text>

      </View>

      <View className="px-6 mt-6 mb-8 space-y-3">
      
          <Text className="text-black text-2xl font-semibold">
            Let's plan for Trips    
          </Text>
          <Text className="text-[#d2cd84] text-3xl font-bold">
            Together
          </Text>
        

        <Text className="text-[#a9b9c1] text-base">Search for your faourite places and know all the best restaurants, hotels and attraction spots.</Text>
      </View>


      <View className="w-[50%] h-[50%] bg-[#a9b9c1] rounded-[90px] absolute bottom-24 -right-36"></View>
      <View className="w-[50%] h-[60%] bg-[#d2cd84] rounded-[90px] absolute -bottom-32 -left-36"></View>


      <View className="flex-1 relative items-center justify-center">
        <Animatable.Image 
        animation="fadeIn"
        easing="ease-in-out"
        source={HeroImage} className="w-[221px] h-[500px] object-cover"
      />

      <Pressable
      onPress={()=>navigation.navigate("Discover")}
       
       className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border-black rounded-full items-center justify-center">
            
        <Animatable.View 
          animation={"pulse"}
          easing="ease-in-out"
          iterationCount={"infinite"}
          className="w-20 h-20 items-center justify-center rounded-full bg-black">
            <Text className="text-gray-50 text-[40px] font-semibold">
              Go
            </Text>
        </Animatable.View> 
      </Pressable>

      </View>

      
    </SafeAreaView>
  )
}

export default HomeScreen