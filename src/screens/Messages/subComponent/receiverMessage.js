import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { W } from "../../../config/constants";
import { useNavigation } from "@react-navigation/native";

const ReceiverMessage = ({ message }) => {

    const navigation = useNavigation()

    return (
        <View
            className="flex-row self-start items-center" 
            style={{ maxWidth: W(75) }}
        >
            <TouchableOpacity onPress={() => navigation.navigate("Profile", { userId: message.userId })}>
                <Image
                    source={{ uri: message.photoURL }}
                    style={{ width: W(9), height: W(9), resizeMode: "cover" }}
                    className="rounded-full mr-2"
                />
            </TouchableOpacity>
            <View className="bg-[#ff5864] self-start flex-row py-2 px-4 rounded-md rounded-tl-none">
                <Text className="text-white font-bold">{message.message}</Text>
            </View>
        </View>
    )
}

export default ReceiverMessage;