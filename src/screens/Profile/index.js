import React from "react";
import { useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import MyProfile from "./MyProfile";
import OtherProfile from "./OtherProfile";

const Profile = () => {

    const { user } = useAuth()
    const { params } = useRoute()
    const { edit, userId } = params

    const isMyProfile = userId === user.email

    return(
        isMyProfile
            ?   <MyProfile edit={edit}/>
            :   <OtherProfile userId={userId}/>
    )
}

export { Profile };