import { StatusBar } from 'expo-status-bar';
import { ScrollView , Image,  Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {images} from '../constants';
import CustomButton from '../components/CustomButton';
// import { useGlobalContext } from '../context/GlobalProvider';


export default function App() {

  //const {isLoading, isLoggedIn} = useGlobalContext();

  //if (!isLoading && isLoggedIn) return <Redirect href="/home" />;
  // if the user is logged in, then redirect to home page
  return (
    <SafeAreaView className="bg-white flex-1">
      {/* here i can change the backgorund color of the app */}
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-6 py-8 space-y-8">
          <Image
            source={images.logo}
            className="w-[150px] h-[97px]"
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className="w-[340px] h-[340px]"
            resizeMode='contain'
          />

          <View className="space-y-4 w-full">
            <Text className="text-4xl text-black font-bold text-center leading-tight">
              Join the Cashless Economy!
            </Text>
            <Text className="text-base text-gray-600 text-center font-regular">
              Where creativity meets Innovation!
            </Text>
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-auto"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light'/>
      {/* is used when we want to hide/unhide the top status bar */}
    </SafeAreaView>
  );
}


