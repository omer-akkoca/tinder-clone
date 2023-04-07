import React, { useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TextInput } from "react-native";
import useAuth from "../../hooks/useAuth"
import { H, W } from "../../config/constants"
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

const defaultUserCover = "https://i.stack.imgur.com/l60Hf.png"

const Profile = () => {

    const navigation = useNavigation()
    const { user, updateProfileOnFirebase } = useAuth()

    const [image, setImage] = useState(null)
    const [name, setName] = useState(user.displayName)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })
        if (result.assets) {
            setImage(result.assets[0].uri)
        }
    }

    return(
        <View className="flex-1 bg-gray-100">
            <ScrollView keyboardShouldPersistTaps="always">
                <View className="relative border-b border-gray-400">
                    <Image
                        source={{ uri: user.photoURL ? user.photoURL : defaultUserCover }}
                        className="w-full object-cover" style={{ height: H(45) }}
                    />
                    <TouchableOpacity
                        onPress={() => pickImage()}
                        className="absolute right-4 -bottom-6 bg-[#ff5864] h-12 w-12 rounded-full items-center justify-center"
                        activeOpacity={0.5}
                    >
                        <Entypo name="camera" size={W(5)} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="absolute top-8 left-4 bg-[#ff5864] h-10 w-10 rounded-full items-center justify-center"
                        activeOpacity={0.5}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="p-4 space-y-2">
                    <View>
                        <Text className="font-bold text-lg mb-2">Your Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            className="bg-white px-4 py-2"
                            placeholder="Your name..."
                        />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => updateProfileOnFirebase({ displayName: name, image })}
                    className="bg-[#ff5864] p-4 rounded-full mt-5 m-4"
                >
                    <Text className="text-sm font-bold text-center text-white">Kaydet</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export { Profile };