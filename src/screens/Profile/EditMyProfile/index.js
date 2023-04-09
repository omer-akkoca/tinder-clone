import React, { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import useAuth from "../../../hooks/useAuth";

const EditMyProfile = () => {

    const { user, updateProfileOnFirebase } = useAuth()

    const [name, setName] = useState(user.displayName)
    const [age, setAge] = useState(null)
    const [job, setJob] = useState("")

    return (
        <View className="flex-1">
            <ScrollView className="space-y-4 pt-4">
                <View>
                    <Text className="font-bold px-4 mb-2">Name</Text>
                    <View className="bg-white">
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Set your name..."
                            className="p-4"
                        />
                    </View>
                </View>

                <View>
                    <Text className="font-bold px-4 mb-2">Age</Text>
                    <View className="bg-white">
                        <TextInput
                            value={age}
                            onChangeText={setAge}
                            placeholder="Set your age..."
                            keyboardType="numeric"
                            className="p-4"
                        />
                    </View>
                </View>

                <View>
                    <Text className="font-bold px-4 mb-2">About {user.displayName}</Text>
                    <View className={`bg-white h-28`}>
                        <TextInput
                            value={job}
                            onChangeText={setJob}
                            placeholder="Hello!"
                            multiline
                            className="p-4"
                        />
                    </View>
                </View>

                <View>
                    <Text className="font-bold px-4 mb-2">Job Title</Text>
                    <View className="bg-white">
                        <TextInput
                            value={job}
                            onChangeText={setJob}
                            placeholder="Add Job Title"
                            className="p-4"
                        />
                    </View>
                </View>

                <View>
                    <Text className="font-bold px-4 mb-2">Location</Text>
                    <View className="bg-white">
                        <TextInput
                            value={job}
                            onChangeText={setJob}
                            placeholder="Add Your Location (Town/City)"
                            className="p-4"
                        />
                    </View>
                </View>
                
                <TouchableOpacity
                    onPress={() => updateProfileOnFirebase({ displayName: name })}
                    className="bg-[#ff5864] p-4 rounded-full mt-5 m-4 mb-4"
                >
                    <Text className="text-sm font-bold text-center text-white">Kaydet</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export { EditMyProfile };

/*
import { Entypo } from '@expo/vector-icons';

<TouchableOpacity
                        onPress={() => pickImage()}
                        className="absolute right-4 -bottom-6 bg-[#ff5864] h-12 w-12 rounded-full items-center justify-center"
                        activeOpacity={0.5}
                    >
                        <Entypo name="camera" size={W(5)} color="white" />
                    </TouchableOpacity>
*/