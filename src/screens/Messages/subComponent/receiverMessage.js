import React from "react";
import { View, Text, Image } from "react-native";
import { W } from "../../../config/constants";

const ReceiverMessage = ({ message }) => {
    console.log(message.timestamp)
    return (
        <View
            className="flex-row self-start items-center" 
            style={{ maxWidth: W(75) }}
        >
            <Image
                source={{ uri: message.photoURL }}
                style={{ width: W(9), height: W(9), resizeMode: "cover" }}
                className="rounded-full mr-2"
            />
            <View className="bg-[#ff5864] self-start flex-row py-2 px-4 rounded-md rounded-tl-none">
                    <Text className="text-white font-bold">{message.message}</Text>
            </View>
        </View>
    )
}

export default ReceiverMessage;