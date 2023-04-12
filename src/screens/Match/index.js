import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { W } from "../../config/constants"

const Match = () => {

    const navigation = useNavigation()
    const { params } = useRoute()

    const { userSwiped, detailedUser } = params;

    return(
        <View className="flex-1 bg-[#ff586495]">
            <View className="flex-1 items-center justify-center px-4 bg-[#ff586499]">
                <Image
                    source={{ uri: "https://links.papareact.com/mg9" }}
                    className="w-9/12 h-24 mx-auto mb-5" style={{ resizeMode: "contain" }}
                />
                <Text className="text-xs font-bold text-white mb-4">You can message with each other now. Enjoy...</Text>
                <View className="flex-row items-center mb-5">
                    <Image
                        source={{ uri: userSwiped.photoURL }}
                        style={{ width: W(30), height: W(30), resizeMode: "cover" }}
                        className="rounded-full"
                    />
                    <View className="w-10"/>
                    <Image
                        source={{ uri: detailedUser.photoURL }}
                        style={{ width: W(30), height: W(30), resizeMode: "cover" }}
                        className="rounded-full"
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.5} className="w-full p-5 rounded-full bg-white"
                    onPress={() => navigation.navigate("Chat")}
                >
                    <Text className="text-center text-sm">Send a Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export { Match };