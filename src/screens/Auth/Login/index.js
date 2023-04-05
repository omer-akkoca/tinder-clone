import React from "react";
import { Button, View } from "react-native";
import useAuth from "../../../hooks/useAuth";

const Login = () => {

    const { authenticationWithGoogle } = useAuth()

    return(
        <View className="p-4">
            <Button title="Login" onPress={() => authenticationWithGoogle()}/>
        </View>
    )
}

export { Login };