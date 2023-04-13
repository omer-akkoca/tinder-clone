import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { W } from "../../config/constants";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { getMatchedUserInfo } from "../../utilities";
import { store } from "../../library/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const ChatRow = ({ matchDetails }) => {

    const navigation = useNavigation()
    const { user } = useAuth()

    const [userInfo, setUserInfo] = useState(null)
    const [lastMessage, setLastMessage] = useState("")

    useEffect(() => {
        setUserInfo(getMatchedUserInfo(matchDetails.users, user.email))
    }, [matchDetails, user])

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(store, "match", matchDetails.id, "messages"), orderBy("timestamp","desc")),
            (snapshot) => {
                setLastMessage(snapshot.docs[0].data()?.message)
            }
        )
        return () => unsub();
    }, [store, matchDetails])

    return(
        <TouchableOpacity onPress={() => navigation.navigate("Messages", { matchDetails })} className="bg-white p-4 flex-row items-center rounded-lg shadow-md">
            <Image
                source={{ uri: userInfo?.photoURL }}
                style={{ width: W(17.5), height: W(17.5), resizeMode: "cover" }}
                className="rounded-full bg-white mr-4"
            />
            <View className="flex-1">
                <Text className="font-bold text-lg">{userInfo?.displayName}</Text>
                <Text className="text-gray-600 text-xs">{lastMessage}</Text>
            </View>
        </TouchableOpacity>
    )
}

export { ChatRow };