import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ViewMyProfile } from "./ViewMyProfile";
import { EditMyProfile } from "./EditMyProfile";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

const Profile = () => {
    return(
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { textTransform: "capitalize", fontWeight: "bold" },
                        tabBarActiveTintColor: "#ff5864",
                        tabBarIndicatorStyle: { backgroundColor: "#ff5864" }
                    }}
                >
                    <Tab.Screen name="ViewMyProfile" component={ViewMyProfile} options={{ title: "View Profile" }} />
                    <Tab.Screen name="EditMyProfile" component={EditMyProfile} options={{ title: "Edit Profile" }} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    )
}

export { Profile };