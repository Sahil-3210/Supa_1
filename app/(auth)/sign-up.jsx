import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase"; // Import the Supabase client

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("user"); // Default role is "user"
  const [showRoleOptions, setShowRoleOptions] = useState(false); // Toggle role selection UI
  const [loading, setLoading] = useState(false); // Loading state for sign-up process

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const goToSignIn = () => {
    router.push("/sign-in");
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setShowRoleOptions(false); // Close the role selection UI after selection
  };

  const handleSignUp = async () => {
    // Validate inputs
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Step 1: Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (authError) {
        throw authError;
      }
  
      // Step 2: Insert user details into the `users` table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([
          {
            user_id: authData.user.id, // Use the user ID from Supabase Auth
            email,
            full_name: fullName, // Ensure this matches the column name in the table
            role,
          },
        ])
        .select(); // Use .select() to return the inserted data
  
      if (userError) {
        throw userError;
      }
  
      // Success
      Alert.alert("Success", "Account created successfully!");
      router.push("/sign-in"); // Redirect to the Sign-In screen
    } catch (error) {
      Alert.alert("Error", error.message);
      console.error("Sign-up error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-8 pt-10">
          {/* Header */}
          <View className="items-center mt-2">
            <Image
              source={images.logo}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>

          {/* Main Content */}
          <View className="mt-2">
            <Text className="text-3xl font-bold text-gray-800 text-center">
              Create Account
            </Text>
            <Text className="text-base text-gray-500 text-center mb-6">
              Sign up to get started
            </Text>

            {/* Form Container with shadow */}
            <View className="bg-white rounded-2xl p-6 shadow-md mb-6">
              {/* Full Name Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">
                  Full Name
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 border border-gray-100">
                  <Text className="text-gray-400 mr-2">👤</Text>
                  <TextInput
                    className="flex-1 py-3 text-gray-800"
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">
                  Email Address
                </Text>
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
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">
                  Password
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 border border-gray-100">
                  <Text className="text-gray-400 mr-2">🔒</Text>
                  <TextInput
                    className="flex-1 py-3 text-gray-800"
                    placeholder="Create password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image
                      source={showPassword ? images["eye-hide"] : images.eye}
                      className="w-5 h-5"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Input */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">
                  Confirm Password
                </Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 border border-gray-100">
                  <Text className="text-gray-400 mr-2">🔒</Text>
                  <TextInput
                    className="flex-1 py-3 text-gray-800"
                    placeholder="Confirm password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                    <Image
                      source={
                        showConfirmPassword ? images["eye-hide"] : images.eye
                      }
                      className="w-5 h-5"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Role Selection */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">
                  Select Role
                </Text>
                <TouchableOpacity
                  className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
                  onPress={() => setShowRoleOptions(!showRoleOptions)}
                >
                  <Text className="text-gray-800">{role}</Text>
                </TouchableOpacity>

                {/* Role Options */}
                {showRoleOptions && (
                  <View className="mt-2 bg-gray-50 rounded-xl border border-gray-100">
                    <TouchableOpacity
                      className="px-4 py-3"
                      onPress={() => handleRoleSelection("user")}
                    >
                      <Text className="text-gray-800">User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-4 py-3 border-t border-gray-100"
                      onPress={() => handleRoleSelection("checker")}
                    >
                      <Text className="text-gray-800">Checker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="px-4 py-3 border-t border-gray-100"
                      onPress={() => handleRoleSelection("admin")}
                    >
                      <Text className="text-gray-800">Admin</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                className="bg-blue-600 rounded-xl py-4 shadow-sm"
                activeOpacity={0.8}
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text className="text-white text-center font-bold text-base">
                  {loading ? "Creating Account..." : "CREATE ACCOUNT"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Alternative Sign Up Options */}
            <View className="mb-4">
              <View className="flex-row items-center mb-4">
                <View className="flex-1 h-0.5 bg-gray-200" />
                <Text className="mx-4 text-gray-500 font-medium">
                  OR SIGN UP WITH
                </Text>
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

            {/* Sign In Link */}
            <View className="flex-row justify-center mt-2">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={goToSignIn}>
                <Text className="text-blue-600 font-bold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;