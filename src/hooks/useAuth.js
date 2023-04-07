import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from "firebase/auth";
import { auth } from "../library/firebase"

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
            }
        })
        return () => unsub();
    }, [])

    const loginOnFirebase = ({ email, password }) => {
        if (!(email || password)) return;
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser({...user, ...userOnGoogle})
                setLoading(false)
            })
            .catch((error) => {
                const message = error.code
                setLoading(false)
                setError(message)
            })
            .finally(() => setLoading(false))
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
        }).then((user) => {
            console.log("UPDATED USER: ", user)
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
        loading,
        loginOnFirebase,
        registerOnFirebase,
        updateProfileOnFirebase,
        logout
    }), [user, error, loading])

    return(
        <AuthContext.Provider value={memoedValue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => useContext(AuthContext);

export { AuthProvider }