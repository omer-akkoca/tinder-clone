import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from "firebase/auth";
import { auth, storage } from "../library/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { CustomModal } from "../components";

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
                setUser(user)
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
        if (!(email || password)) return;
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoading(false)
            })
            .catch((error) =>{
                const errorCode = error.code;
                if (errorCode === "auth/email-already-in-use") {
                    setError("This email adress is already in use.")
                }
            })
            .finally(() => setLoading(false))
    }

    const updateProfileOnFirebase = async ({ displayName, image }) => {
        let photoURL;
        if (image) {
            photoURL = await uploadFileOnFirebase(image)
        }
        updateProfile(auth.currentUser, {
            displayName,
            photoURL
        }).then((x) => {
            if (displayName && image) {
                setUser(user => ({ ...user, displayName: displayName, image }))
            }
            else if (displayName) {
                setUser(user => ({ ...user, displayName }))
            }
            else if (image) {
                setUser(user => ({ ...user, image }))
            }
            CustomModal.showModal({ title: "Success", description: "Your profile updated successfully." })
        }).catch((error) => {
            setError("Your profile could not be updated.")
        })
    }

    const uploadFileOnFirebase = async (file) => {
        const fileName = uuidv4()
        const profileImageRef = ref(storage, fileName);
        const response = await fetch(file)
        const blob = await response.blob()
        const uploadedResult = await uploadBytes(profileImageRef, blob)
        const url = await getDownloadURL(uploadedResult.ref)
        return url;
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