import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { store } from "../../../library/firebase";
import { CustomModal } from "../../../components";
import { H, W } from "../../../config/constants";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const defaultUserCover = "https://i.stack.imgur.com/l60Hf.png"

const OtherProfile = ({ userId }) => {

    const navigation = useNavigation()
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        getDoc(doc(store, "users", userId))
        .then((x) =>{
            if (x.exists()) {
                setUserInfo(x.data())
            } else{
                CustomModal.showModal({ title: "Error", description: "Could not find the profile" })
            }
        })
    }, [userId])

    return(
        <View className="flex-1 bg-white">
            <ScrollView>
                <View className="relative mb-4">
                    <Image
                        source={{ uri: userInfo.photoURL ? userInfo.photoURL : defaultUserCover }}
                        style={{ height: H(40), resizeMode: "cover" }}
                        className="w-full"
                    />
                    <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-8 left-4 bg-[#ff5864] w-9 h-9 items-center justify-center rounded-full">
                        <Ionicons name="arrow-back" size={W(5)} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row space-x-2 items-center px-4">
                    <Text className="font-bold text-2xl">{userInfo?.displayName}</Text>
                    <Text className="font-medium text-2xl">{userInfo?.age}</Text>
                </View>
                <View className="space-y-2 p-4">
                    <View className="flex-row items-center space-x-2">
                        <MaterialIcons name="work-outline" size={W(4)} color="gray" />
                        <Text className="text-gray-500">{userInfo?.job}</Text>
                    </View>
                    <View className="flex-row items-center space-x-2">
                        <Ionicons name="md-school-outline" size={W(4.25)} color="gray" />
                        <Text className="text-gray-500">{userInfo?.school}</Text>
                    </View>
                    <View className="flex-row items-center space-x-2">
                        <Ionicons name="ios-location-outline" size={W(4)} color="gray" />
                        <Text className="text-gray-500">{userInfo?.location}</Text>
                    </View>
                </View>
                <View className="border-t border-gray-200 p-4">
                    <Text className="text-gray-500">{userInfo?.about}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default OtherProfile;