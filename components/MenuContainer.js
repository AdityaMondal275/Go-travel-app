import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const MenuContainer = ({title,imageSrc,type,setType}) => {

  const handlePress = () => {
    setType(title.toLowerCase());
  }
  return (
    <TouchableOpacity className="items-center justify-center space-y-2" onPress={handlePress}>
      <View className={`w-24 h-24 p-2 rounded-full items-center justify-center ${type===title.toLowerCase() ? "bg-black" :""}`}>
        <Image
            source={imageSrc} className="w-full h-full object-contain rounded-full"
        />
      </View>
      <Text className="text-black text-xl font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}

export default MenuContainer