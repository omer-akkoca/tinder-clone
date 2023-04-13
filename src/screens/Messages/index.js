import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, FlatList, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components";
import { useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { getMatchedUserInfo } from "../../utilities";
import { H } from "../../config/constants";
import SenderMessage from "./subComponent/senderMessage";
import ReceiverMessage from "./subComponent/receiverMessage";
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { store } from "../../library/firebase";

const Messages = () => {

    const { user } = useAuth()
    const { params } = useRoute()
    const { matchDetails } = params

    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [text, setText] = useState("")
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setUserInfo(getMatchedUserInfo(matchDetails.users, user.email))
    }, [matchDetails, user])

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(store, "match", matchDetails.id, "messages"), orderBy("timestamp", "desc")),
            (snapshot) => {
                const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setMessages(messages)
            }
        )
        return () => unsub();
    }, [matchDetails, store])

    const sendMessage = () => {
        setLoading(true)
        addDoc(collection(store, "match", matchDetails.id, "messages"), {
            timestamp: serverTimestamp(),
            userId: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            message: text.trim()
        })
        .finally(() => {
            setText("")
            setLoading(false)
        })
    }

    return(
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <Header title={userInfo?.displayName} showCall/>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    className="flex-1"
                    keyboardVerticalOffset={10}
                >
                    <View className="flex-1 overflow-hidden">
                        <FlatList
                            data={messages}
                            keyExtractor={(e) => e.id}
                            inverted={-1}
                            renderItem={({ item: message }) => (
                                message.userId === user.email
                                    ? <SenderMessage message={message} />
                                    : <ReceiverMessage message={message} />
                            )}
                            className="px-4"
                            ItemSeparatorComponent={() => <View className="h-4"/>}
                            ListFooterComponent={() => <View className="h-4"/>}
                            ListHeaderComponent={() => <View className="h-4"/>}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View className="flex-row items-center p-4 space-x-4 border-t border-gray-100" style={{ maxHeight: H(15) }}>
                        <TextInput
                            value={text}
                            onChangeText={setText}
                            placeholder="Type a message..."
                            style={{  }}
                            className="flex-1"
                            multiline
                        />
                        <TouchableOpacity disabled={loading} onPress={() => sendMessage()}>
                            <Text className="text-[#ff5864] font-bold">Send</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export { Messages };