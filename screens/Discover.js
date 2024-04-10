import { View, Text, SafeAreaView, Image,  } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { Avater } from '../assets';

const Discover = () => {
    const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown : false,
    });
  }, [])
  
  return (
    <SafeAreaView className="flex-1 bg-white relative">
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
    </SafeAreaView>
  )
}

export default Discover