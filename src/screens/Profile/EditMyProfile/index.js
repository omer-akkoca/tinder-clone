import React, { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import useAuth from "../../../hooks/useAuth";

const EditMyProfile = () => {

    const { user, loading, editProfile, detailedUser } = useAuth()

    const [name, setName] = useState(user.displayName)
    const [age, setAge] = useState(detailedUser?.age)
    const [job, setJob] = useState(detailedUser?.job)
    const [about,setAbout] = useState(detailedUser?.about)
    const [location, setLocation] = useState(detailedUser?.location)
    const [school, setSchool] = useState(detailedUser?.school)

    const handleEditProfile = () => {
        const editedProfile = {
            name,
            age,
            job,
            email: user.email,
            photoURL: user.photoURL,
            about,
            location,
            school
        }
        editProfile(editedProfile)
    }

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
                            value={about}
                            onChangeText={setAbout}
                            placeholder="Hello!"
                            multiline
                            className="p-4"
                        />
                    </View>
                </View>

                <View>
                    <Text className="font-bold px-4 mb-2">School</Text>
                    <View className="bg-white">
                        <TextInput
                            value={school}
                            onChangeText={setSchool}
                            placeholder="Set Gratuated School"
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
                            value={location}
                            onChangeText={setLocation}
                            placeholder="Add Your Location (Town/City)"
                            className="p-4"
                        />
                    </View>
                </View>
                
                <TouchableOpacity
                    disabled={loading}
                    onPress={handleEditProfile}
                    className="bg-[#ff5864] p-4 rounded-full mt-5 m-4 mb-4"
                >
                    <Text className="text-sm font-bold text-center text-white">Kaydet</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export { EditMyProfile };
