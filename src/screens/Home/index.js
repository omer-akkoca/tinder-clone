import React from "react";
import { View } from "react-native";
import useAuth from "../../hooks/useAuth";

const Home = () => {

    const { user } = useAuth()
    console.log(user)
    return(
        <View>
            
        </View>
    )
}

export { Home };