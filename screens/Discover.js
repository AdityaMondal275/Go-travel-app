import { View, Text, SafeAreaView, Image, ScrollView, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { Attractions, Avater, Hotels, NotFound, Restaurants } from '../assets';
import MenuContainer from '../components/MenuContainer';

import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';

import AutocompleteInput from 'react-native-autocomplete-input';

import { OpeenStreetMap, OpenStreetMapAutocomplete } from '@amraneze/osm-autocomplete';
import {getPlacesData} from '../api/index';


const Discover = () => {
    const navigation = useNavigation();

    const [location, setLocation] = useState(null);

    let handleOnOptionSelected = (option) => {
      console.log(JSON.stringify(option));

      bl_lat = option.boundingbox[0];
      tr_lat = option.boundingbox[1];
      bl_lng= option.boundingbox[2];
      tr_lng= option.boundingbox[3];
      //setLocation(option);
    }
    const [type, setType] = useState(type);
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);
    //Test Atuocom
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const handleTextChange = (text) => {
      console.log(text);
      setInputValue(text);
    };
  
    const handleSuggestionSelect = (suggestion) => {
      // Handle the selected suggestion here
    };
  //Test Atuocom

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown : false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data);
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    })
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);
  
  return (
    <SafeAreaView className="flex-1 bg-[#2A2B4B] relative">
      <View  className="flex-row items-center justify-between px-8 mt-8">
        <View>
            <Text className="text-[40px] text-white font-bold">Discover</Text>
            <Text className="text-[#a9b9c1] text-2xl">The beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-black rounded-full items-center justify-center">
            <Image
                source={Avater}
                className="w-full h-full rounded-full object-cover "
            />
        </View>
      </View>

      {/* <View className="flex-row items-center bg-black mx-4 rounded-xl py-1 px-2 mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields : 'geometry'}}
          placeholder='Search for places here'
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details?.geometry?.viewport);
          }}

          query={{
            key: 'AIzaSyA2Jikr1CvwRm0mDnhAad9x46-O0IfhaxA',
            language: 'en',
          }}
        />

      </View> */}

      { <View className="wrapper flex-row items-center bg-gray-500 mx-6 rounded-xl py-1 px-2 mt-4">
      <OpenStreetMapAutocomplete 
        value={null}
        onChange={handleOnOptionSelected}
        fetchDetails={true}
        onPress={(data, details = null) => {
        console.log(data?.details?.geometry?.viewport);
        setBl_lat(details?.geometry?.viewport?.southwest?.lat)
        setBl_lng(details?.geometry?.viewport?.southwest?.lon)
        setTr_lat(details?.geometry?.viewport?.northeast?.lat)
        setTr_lng(details?.geometry?.viewport?.northeast?.lon)
      }}

      />
     {/* <OpenStreetMapAutocomplete
        value={{
          lat: "0",
          lon: "0",
          type: "0",
          class: "0",
          osm_id: 0,
          licence: "0",
          osm_type: "0",
          place_id: 0,
          importance: 0,
          display_name: "",
          boundingbox: []
        }}
        onChange={(option) =>
          handleOnOptionSelected("Second component", option)
        }
      /> */}
      
    </View> }
{/*
  <View className="wrapper flex-row items-center bg-black mx-6 rounded-xl py-1 px-2 mt-4">
  <AutocompleteInput
        placeholder="Search"
        value={inputValue}
        onChangeText={handleTextChange}
        data={suggestions}
        onSuggestionSelected={handleSuggestionSelect}
      />
       </View>*/
}

      {/*Menu container*/}
      {isLoading ? (<View className="flex-1 mt-[100px]">
        <ActivityIndicator size="large" color="white"/>
      </View>) : (
      <ScrollView>
        <View className='flex-row irems-center justify-between rounded-full px-8 mt-8'>
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
            <Text className="text-[#a9b9c1] text-[28px] font-bold">Top Tips</Text>
            <Pressable className="flex-row items-center justify-center space-x-2">
              <Text className="text-[#a9b9c1] text-[20px] font-bold">Explore</Text>
              <FontAwesome name="long-arrow-right" size={24} color="#a9b9c1" />
            </Pressable>
          </View>

          <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
            {mainData?.length > 0 ? (
              <>
                {mainData?.map((data, i) => (
                  <ItemCardContainer 
                    key={i} 
                    imageSrc= {
                      data?.photo?.images?.medium?.url ?
                      data?.photo?.images?.medium?.url :
                      "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                    }
                    title={data?.name}
                    location={data?.location_string}
                    data={data}
              />))}
            
              </>
              ) : (
                <>
                  <View className="w-full h-[600px] items-center space-y-8 justify-center">
                    <Image
                    source={NotFound}
                      className="w-40 h-40 object-cover"
                    />
                    <Text className="text-white font-bold">
                      Not Found..
                    </Text>
                  </View>
                </>
                )
            }
            
          </View>
        </View>

      </ScrollView>
      )}
      
    </SafeAreaView>
  );
};

export default Discover;
