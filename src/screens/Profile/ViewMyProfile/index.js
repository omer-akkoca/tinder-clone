import React, { useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import useAuth from "../../../hooks/useAuth";
import { Ionicons, MaterialIcons, Entypo  } from '@expo/vector-icons';
import { W } from "../../../config/constants"
import * as ImagePicker from 'expo-image-picker';

const defaultUserCover = "https://i.stack.imgur.com/l60Hf.png"

const ViewMyProfile = () => {

    const { user, updateProfileOnFirebase } = useAuth()

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })
        if (result.assets) {
            const image = result.assets[0].uri
            updateProfileOnFirebase({ image })
        }
    }

    return(
        <View className="flex-1 bg-white">
            <ScrollView className="pt-4">
                <View className="items-center justify-center mb-4">
                    <View className="relative">
                        <Image
                            source={{ uri: user.photoURL ? user.photoURL : defaultUserCover }}
                            className="rounded-full object-cover" style={{ height: W(40), width: W(40) }}
                        />
                        <TouchableOpacity
                            onPress={() => pickImage()}
                            className="absolute right-1 bottom-1 bg-[#ff5864] h-10 w-10 rounded-full items-center justify-center"
                            activeOpacity={0.5}
                        >
                            <Entypo name="camera" size={W(4.5)} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-row space-x-2 items-center px-4">
                    <Text className="font-bold text-2xl">{user.displayName}</Text>
                    <Text className="font-medium text-2xl">{23}</Text>
                    { user.emailVerified && <Ionicons name="shield-checkmark" size={W(6)} color="green"/>}
                </View>
                <View className="space-y-2 p-4">
                    <View className="flex-row items-center space-x-2">
                        <MaterialIcons name="work-outline" size={W(4)} color="gray" />
                        <Text className="text-gray-500">Software Enginner</Text>
                    </View>
                    <View className="flex-row items-center space-x-2">
                        <Ionicons name="md-school-outline" size={W(4.25)} color="gray" />
                        <Text className="text-gray-500">Karadeniz Technical University</Text>
                    </View>
                    <View className="flex-row items-center space-x-2">
                        <Ionicons name="ios-location-outline" size={W(4)} color="gray" />
                        <Text className="text-gray-500">Sancaktepe/Istanbul</Text>
                    </View>
                </View>
                <View className="border-t border-gray-200 p-4">
                    <Text className="text-gray-500">User description</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export { ViewMyProfile };

/*
            <View className="relative border-b border-gray-400">
                <Image
                    source={{ uri: user.photoURL ? user.photoURL : defaultUserCover }}
                    className="w-full object-cover" style={{ height: H(45) }}
                />

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="absolute top-8 left-4 bg-[#ff5864] h-10 w-10 rounded-full items-center justify-center"
                    activeOpacity={0.5}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            </View>
            */