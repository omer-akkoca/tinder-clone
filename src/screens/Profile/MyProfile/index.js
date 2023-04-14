import React from 'react'
import { View } from 'react-native';
import { Header } from '../../../components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ViewMyProfile } from '../ViewMyProfile';
import { EditMyProfile } from '../EditMyProfile';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const MyProfile = ({ edit }) => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header title={"Profile"} showLogout/>
            <View className="flex-1 bg-white">
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { textTransform: "capitalize", fontWeight: "bold" },
                        tabBarActiveTintColor: "#ff5864",
                        tabBarIndicatorStyle: { backgroundColor: "#ff5864" }
                    }}
                    initialRouteName={edit ? "EditMyProfile" : "ViewMyProfile"}
                >
                    <Tab.Screen name="ViewMyProfile" component={ViewMyProfile} options={{ title: "View Profile" }} />
                    <Tab.Screen name="EditMyProfile" component={EditMyProfile} options={{ title: "Edit Profile" }} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    )
}

export default MyProfile;