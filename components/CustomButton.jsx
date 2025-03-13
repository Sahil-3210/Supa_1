import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import "../global.css"


const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (

    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.5}
        className={`bg-black rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
        >

      <Text className={`text-white font-bold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton