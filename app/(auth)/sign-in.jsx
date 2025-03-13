import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { router } from 'expo-router'; // Import the router

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle navigation to sign-up page
  const goToSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-8 pt-10">
          {/* Header */}
          <View className="items-center mt-12">
            <Image
              source={images.logo}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>
          
          {/* Main Content - Moved upward */}
          <View className="mt-10">
            <Text className="text-3xl font-bold text-gray-800 text-center">Welcome</Text>
            <Text className="text-base text-gray-500 text-center mb-8">Sign in to your account</Text>
          
            {/* Form Container with shadow */}
            <View className="bg-white rounded-2xl p-6 shadow-md mb-6">
              {/* Email Input */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Email Address</Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 border border-gray-100">
                  <Text className="text-gray-400 mr-2">✉️</Text>
                  <TextInput
                    className="flex-1 py-3 text-gray-800"
                    placeholder="you@example.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Password</Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 border border-gray-100">
                  <Text className="text-gray-400 mr-2">🔒</Text>
                  <TextInput
                    className="flex-1 py-3 text-gray-800"
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image
                      source={showPassword ? images['eye-hide'] : images.eye}
                      className="w-5 h-5"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="self-end mb-5">
                <Text className="text-blue-600 font-medium text-sm">Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity 
                className="bg-blue-600 rounded-xl py-4 shadow-sm"
                activeOpacity={0.8}
              >
                <Text className="text-white text-center font-bold text-base">SIGN IN</Text>
              </TouchableOpacity>
            </View>

            {/* Alternative Sign In Options */}
            <View className="mb-8">
              <View className="flex-row items-center mb-6">
                <View className="flex-1 h-0.5 bg-gray-200" />
                <Text className="mx-4 text-gray-500 font-medium">OR CONTINUE WITH</Text>
                <View className="flex-1 h-0.5 bg-gray-200" />
              </View>
              
              <View className="flex-row justify-center space-x-4">
                <TouchableOpacity className="bg-white p-3 rounded-full shadow-sm">
                  <Text className="text-2xl">🌐</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white p-3 rounded-full shadow-sm">
                  <Text className="text-2xl">👤</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-2">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity onPress={goToSignUp}>
                <Text className="text-blue-600 font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;