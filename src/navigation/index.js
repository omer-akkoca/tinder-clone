import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat, Home, Login, Register } from "../screens"

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Chat" component={Chat}/>
        </Stack.Navigator>
    )
}

export default Navigation;