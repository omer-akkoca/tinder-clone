import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { W } from "../../config/constants";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { getMatchedUserInfo } from "../../utilities";

const ChatRow = ({ matchDetails }) => {

    const navigation = useNavigation()
    const { user } = useAuth()

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        setUserInfo(getMatchedUserInfo(matchDetails.users, user.email))
    }, [matchDetails, user])

    return(
        <TouchableOpacity className="bg-white p-4 flex-row items-center rounded-lg shadow-md">
            <Image
                source={{ uri: userInfo?.photoURL }}
                style={{ width: W(17.5), height: W(17.5), resizeMode: "cover" }}
                className="rounded-full bg-red-400 mr-4"
            />
            <View className="flex-1">
                <Text className="font-bold text-lg">{userInfo?.displayName}</Text>
                <Text className="text-gray-600 text-xs">Hello!</Text>
            </View>
        </TouchableOpacity>
    )
}

export { ChatRow };