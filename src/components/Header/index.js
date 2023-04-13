import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import useAuth from "../../hooks/useAuth";
import { W } from "../../config/constants";

const Header = ({ title, showCall = false, showLogout = false, transparent = false }) => {

    const { logout } = useAuth()
    const navigation = useNavigation()

    return(
        <View className={`${transparent ? "bg-transparent" : "bg-white" } h-16 flex-row items-center justify-between px-4`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={W(5)} color="#ff5864" />
            </TouchableOpacity>
            <Text className="flex-1 text-center font-bold text-base">{title || "Title"}</Text>
            {
                showLogout && (
                    <TouchableOpacity onPress={() => logout()}>
                        <Ionicons name="power" size={W((5))} color="#ff5864" />
                    </TouchableOpacity>
                )
            }
            {
                showCall && (
                    <TouchableOpacity onPress={() => null}>
                        <Ionicons name="call" size={W(5)} color="#ff5864" />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export { Header };