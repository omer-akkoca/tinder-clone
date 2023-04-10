import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ViewMyProfile } from "./ViewMyProfile";
import { EditMyProfile } from "./EditMyProfile";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons'; 
import { W } from "../../config/constants";
import { useNavigation, useRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const Profile = () => {

    const navigation = useNavigation()
    const { params } = useRoute()

    return(
        <SafeAreaView className="flex-1 bg-white">
            <View className="bg-white flex-row items-center justify-between px-4 pb-1 pt-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={W(5)} color="black" />
                </TouchableOpacity>
                <Text className="flex-1 text-center font-bold text-sm">Profile</Text>
            </View>
            <View className="flex-1 bg-white">
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { textTransform: "capitalize", fontWeight: "bold" },
                        tabBarActiveTintColor: "#ff5864",
                        tabBarIndicatorStyle: { backgroundColor: "#ff5864" }
                    }}
                    initialRouteName={params?.edit ? "EditMyProfile" : "ViewMyProfile"}
                >
                    <Tab.Screen name="ViewMyProfile" component={ViewMyProfile} options={{ title: "View Profile" }} />
                    <Tab.Screen name="EditMyProfile" component={EditMyProfile} options={{ title: "Edit Profile" }} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    )
}

export { Profile };