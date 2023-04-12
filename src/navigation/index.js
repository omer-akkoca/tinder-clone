import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat, Home, Login, Profile, Register, Match } from "../screens"
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const { user } = useAuth()

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {
                user
                    ? (
                        <>
                            <Stack.Group>
                                <Stack.Screen name="Home" component={Home} />
                                <Stack.Screen name="Chat" component={Chat} />
                                <Stack.Screen name="Profile" component={Profile} />
                            </Stack.Group>
                            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
                                <Stack.Screen name="Match" component={Match}/>
                            </Stack.Group>
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