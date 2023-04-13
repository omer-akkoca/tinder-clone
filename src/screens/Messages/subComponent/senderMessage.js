import React from "react";
import { View, Text } from "react-native";
import { W } from "../../../config/constants";

const SenderMessage = ({ message }) => {
    return(
        <View
            className="bg-purple-500 py-2 px-4 self-end rounded-md rounded-tr-none"
            style={{ maxWidth: W(75) }}
        >
            <Text className="text-white font-bold">{message.message}</Text>
        </View>
    )
}

export default SenderMessage;