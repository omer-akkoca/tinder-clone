import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from "firebase/auth";
import { auth } from "../library/firebase"

WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [userOnGoogle, setUserOnGoogle] = useState(null)
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '798289033174-apg6tf0gf6hbkc87roqgubptca73ku42.apps.googleusercontent.com',
        iosClientId: '798289033174-35c65hh40dp6socnd3s2b0klp63utame.apps.googleusercontent.com',
        expoClientId: "798289033174-mhfh66625uv6g7q820uv68udq1amn9ah.apps.googleusercontent.com",
        selectAccount: true
    })

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
            getUserInfo()
        }
    }, [response, token]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
            }
        })
        return () => unsub();
    }, [])

    const getUserInfo = async () => {
        const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )

        const user = await response.json()
        if (!user.error) {
            const { email, id: password, name, picture } = user
            loginOnFirebase({ email, password })
            setUserOnGoogle({ email, password, name, picture })
        }
    }

    const authenticationWithGoogle = async () => {
        await promptAsync()
    }

    const loginOnFirebase = ({ email, password }) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
            })
    }

    const registerOnFirebase = ({ email, password }) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) =>{
                const errorCode = error.code;
                if (errorCode === "auth/email-already-in-use") {
                    setError("This email adress is already in use.")
                }
            })
    }

    const updateProfileOnFirebase = ({ displayName, photoURL }) => {
        updateProfile(auth.currentUser, {
            displayName,
            photoURL
        }).then(() => {

        }).catch((error) => {
            setError("Your profile could not be updated.")
        })
    }

    const logout = () => {
        signOut(auth)
    }

    const memoedValue = useMemo(() => ({
        user,
        error,
        request,
        userOnGoogle,
        authenticationWithGoogle,
        loginOnFirebase,
        registerOnFirebase,
        updateProfileOnFirebase,
        logout
    }), [user, error, request, userOnGoogle])

    return(
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => useContext(AuthContext);

export { AuthProvider }