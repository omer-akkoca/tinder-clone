import React, { createContext, useContext, useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '798289033174-apg6tf0gf6hbkc87roqgubptca73ku42.apps.googleusercontent.com',
        iosClientId: '798289033174-35c65hh40dp6socnd3s2b0klp63utame.apps.googleusercontent.com',
        expoClientId: "798289033174-mhfh66625uv6g7q820uv68udq1amn9ah.apps.googleusercontent.com"
    });

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
            getUserInfo();
        }
    }, [response, token]);


    const getUserInfo = async () => {
        const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const user = await response.json();
        console.log("USER: ", user)
    };

    const authenticationWithGoogle = async () => {
        await promptAsync()
    }

    return(
        <AuthContext.Provider
            value={{
                user,
                authenticationWithGoogle
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => useContext(AuthContext);

export { AuthProvider }