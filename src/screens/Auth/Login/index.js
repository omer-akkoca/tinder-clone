import React, { useEffect, useRef, useState } from "react";
import { View, ImageBackground, TouchableOpacity, Text, TextInput, ScrollView } from "react-native";
import useAuth from "../../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { deviceHeight } from "../../../config/constants";
import useKeyboard from "../../../hooks/useKeyboard";

const Login = () => {

    const { loginOnFirebase, loading, error } = useAuth()
    const { isKeyboardVisible } = useKeyboard()

    const [email, setEmail] = useState("")
    const [password, setPasword] = useState("")
    const scrollViewRef = useRef(null)

    useEffect(() => {
        if (isKeyboardVisible) {
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
    }, [isKeyboardVisible])

    return(
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
            <View className="flex-1" style={{ minHeight: deviceHeight }}>
                <ImageBackground className="flex-1" source={require("../../../../assets/tinder.png")}>
                    <SafeAreaView className="flex-1 items-center justify-between py-10">
                        <Text className="text-center font-bold text-4xl text-white">Login</Text>
                        <View className="px-4 w-full">
                            <View className="flex-row space-x-2 mb-4">
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Email"
                                    className="flex-1 border border-gray-100 bg-white px-4 py-2 rounded-full"
                                />
                                <TextInput
                                    value={password}
                                    onChangeText={setPasword}
                                    placeholder="Password"
                                    className=" flex-1 border border-gray-100 bg-white px-4 py-2 rounded-full"
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => loginOnFirebase({ email, password })}
                                className="border border-white p-3 rounded-full shadow-md"
                                activeOpacity={0.5}
                                disabled={loading}
                            >
                                <Text className="text-center font-bold text-white">Login</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

export { Login };

/*
    <TouchableOpacity activeOpacity={0.75} className="items-center" onPress={() => authenticationWithGoogle()}>
        <Image source={require("../../../../assets/google.png")} className="h-12 w-12 rounded-full mb-2"/>
        <Text className="font-bold text-white">Sign In With Google</Text>
    </TouchableOpacity>
*/