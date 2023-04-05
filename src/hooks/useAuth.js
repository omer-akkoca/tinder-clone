import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
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
    const [userOnGoogle, setUserFromGoogle] = useState(null)
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    console.log("LOADING: ", loading)

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '798289033174-apg6tf0gf6hbkc87roqgubptca73ku42.apps.googleusercontent.com',
        iosClientId: '798289033174-35c65hh40dp6socnd3s2b0klp63utame.apps.googleusercontent.com',
        expoClientId: "798289033174-mhfh66625uv6g7q820uv68udq1amn9ah.apps.googleusercontent.com",
        selectAccount: true
    });

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
            getUserInfo()
        }
    }, [response, token]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
            } else {
            }
        })
        return () => unsub();
    }, [])

    const getUserInfo =() => {
        fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then(res => res.json())
        .then(user => {
            const { email, id: password, name, picture } = user
            setUserFromGoogle({ email, password, name, picture })
        })
        .catch(() => setLoading(false))
        .finally(() => setLoading(false))

    };

    const authenticationWithGoogle = async () => {
        setLoading(true)
        await promptAsync()
        setLoading(false)
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
        userOnGoogle,
        loading,
        authenticationWithGoogle
    }), [user, error, userOnGoogle, loading])

    return(
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => useContext(AuthContext);

export { AuthProvider }