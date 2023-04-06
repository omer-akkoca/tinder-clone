import React from "react";
import { View, ImageBackground, TouchableOpacity, Text, Image } from "react-native";
import useAuth from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {

    const navigation = useNavigation()
    const { authenticationWithGoogle, request } = useAuth()

    return(
        <View className="flex-1">
            <ImageBackground className="flex-1" source={require("../../../../assets/tinder.png")}>
                <SafeAreaView className="flex-1 items-center justify-between py-20">
                    <Text className="text-center font-bold text-4xl text-white">Login</Text>
                    <TouchableOpacity activeOpacity={0.75} className="items-center" disabled={!request} onPress={() => authenticationWithGoogle()}>
                        <Image source={require("../../../../assets/google.png")} className="h-12 w-12 rounded-full mb-2"/>
                        <Text className="font-bold text-white">Sign In With Google</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

export { Login };

/*<TouchableOpacity className="bg-white py-3 px-6 rounded-md" onPress={() => null}>
                    <Text className="font-semibold">Login</Text>
                </TouchableOpacity>*/