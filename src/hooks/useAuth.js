import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut
} from "firebase/auth";
import { auth, storage, store } from "../library/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CustomModal } from "../components";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const navigation = useNavigation()

    const [user, setUser] = useState(null)
    const [detailedUser, setDetailedUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
                setDetailedUser(null)
            }
        })
        return () => unsub();
    }, [])

    useEffect(() => {
        const getDetailedUser = async () => {
            const docRef = doc(store, "users", user?.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDetailedUser(docSnap.data())
            } else {
                navigation.navigate("Profile", { edit: true })
            }
        }
        if (user) getDetailedUser()
    },[user])

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
                setUser(user => ({ ...user, displayName: displayName, photoURL }))
            }
            else if (displayName) {
                setUser(user => ({ ...user, displayName }))
            }
            else if (image) {
                setUser(user => ({ ...user, photoURL }))
                if (detailedUser) {
                    setDoc(doc(store, "users", user.email),{ ...detailedUser, photoURL })
                }
            }
            CustomModal.showModal({ title: "Success", description: "Your profile updated successfully." })
        }).catch((error) => {
            setError("Your profile could not be updated.")
        })
    }

    const editProfile = (user) => {
        setLoading(true)
        setDoc(doc(store, "users", user.email),{
            age: user.age,
            displayName: user.name,
            id: user.email,
            email: user.email,
            job: user.job,
            photoURL: user.photoURL,
            about: user.about,
            location: user.location,
            school: user.school,
            timestamp: serverTimestamp()   
        }, { merge: true }).then(() => {
            updateProfileOnFirebase({ displayName: user.name })
            setLoading(false)
        }).catch(err => {
            console.log(err.code)
        })
    }

    const uploadFileOnFirebase = async (file) => {
        const fileName = createAnId()
        const profileImageRef = ref(storage, fileName);
        const response = await fetch(file)
        const blob = await response.blob()
        const uploadedResult = await uploadBytes(profileImageRef, blob)
        const url = await getDownloadURL(uploadedResult.ref)
        return url;
    }

    const createAnId = () => {
        const id = Math.random() * 999999 + "+" + Date.now();
        return id;
    }

    const logout = () => {
        signOut(auth)
    }

    const memoedValue = useMemo(() => ({
        user,
        error,
        loading,
        detailedUser, // can usable redux
        setDetailedUser, // can usable redux
        loginOnFirebase,
        registerOnFirebase,
        updateProfileOnFirebase,
        editProfile,
        uploadFileOnFirebase,
        logout
    }), [user, error, loading, detailedUser])

    return(
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default useAuth = () => useContext(AuthContext);

export { AuthProvider }