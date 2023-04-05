import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat, Home, Login, Register } from "../screens"
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const { user } = useAuth()

    return (
        <Stack.Navigator>
            {
                user
                    ? (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Chat" component={Chat} />
                        </>
                    )
                    : (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />
                        </>
                    )
            }
        </Stack.Navigator>
    )
}

export default Navigation;