import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, ChatRow } from "../../components";
import useAuth from "../../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { store } from "../../library/firebase";

const Chat = () => {

    const { user } = useAuth()
    const [matches, setMatches] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(
            query(
                collection(store, "match"),
                where("usersMatch", "array-contains", user.email)
            ),
            (snapshot) => {
                const list = snapshot.docs.map(x => ({
                    id: x.id,
                    ...x.data()
                }))
                setMatches(list)
            }
        )
        return () => unsub();
    }, [user])

    return(
        <SafeAreaView className="flex-1 bg-gray-50">
            <Header title={"Chat"} transparent/>
            <View className="flex-1">
                {
                    matches.length > 0
                        ? (
                            <FlatList
                                data={matches}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => <ChatRow matchDetails={item}/>}
                                className="px-4"
                                ListHeaderComponent={() => <View className="h-2"/>}
                                ListFooterComponent={() => <View className="h-4"/>}
                                ItemSeparatorComponent={() => <View className="h-4"/>}
                            />
                        )
                        : (
                            <View className="flex-1 items-center justify-center">
                                <Text>No matches at the moment, sorry...</Text>
                            </View>
                        )
                }
            </View>
        </SafeAreaView>
    )
}

export { Chat };