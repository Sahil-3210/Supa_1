import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className = 'items-center justify-center gap-1 w-16'>
      <Image
        source = {icon}
        resizeMode = "contain"
        tintColor={color}
        // style={{ width: 24, height: 24 }}
        className = 'w-5 h-5'
      />
      <Text className = {`${focused ? 'font-psemibold': 'font-pregular'} text-xs text-center w-full`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { 
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: 'gray-200',
            height: 84,
            paddingTop: 10, 
          },
        }}
      >
        <Tabs.Screen 
          name = "home"
          options={{ 
              title:'Home' ,
              headerShown: false , 
              tabBarIcon: ({ color, focused}) => (
                <TabIcon
                  icon = {icons.home}
                  color = {color}
                  name = "Home"
                  focused = {focused}
                />
              ) 
          }}
        />
        <Tabs.Screen 
          name = "create"
          options={{ 
              title:'Create' ,
              headerShown: false , 
              tabBarIcon: ({ color, focused}) => (
                <TabIcon
                  icon = {icons.plus}
                  color = {color}
                  name = "Create"
                  focused = {focused}
                />
              ) 
          }}
        />
        <Tabs.Screen 
          name = "bookmark"
          options={{ 
              title:'Bookmark',
              headerShown: false , 
              tabBarIcon: ({ color, focused}) => (
                <TabIcon
                  icon = {icons.bookmark}
                  color = {color}
                  name = "Saved"
                  focused = {focused}
                />
              ) 
          }}
        />
        <Tabs.Screen 
          name = "profile"
          options={{ 
              title:'Profile',
              headerShown: false , 
              tabBarIcon: ({ color, focused}) => (
                <TabIcon
                  icon = {icons.profile}
                  color = {color}
                  name = "Profile"
                  focused = {focused}
                />
              ) 
          }}
        />
        
      </Tabs>
    </>
  )
}

export default TabsLayout