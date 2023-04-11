import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import useAuth from "../../hooks/useAuth";
import { Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { collection, onSnapshot } from "firebase/firestore";
import { store } from "../../library/firebase";
import { H, W } from "../../config/constants"

const Home = () => {

    const navigation = useNavigation()
    const swiperRef = useRef(null)
    const { user } = useAuth()
    const [users, setUsers] = useState([])
    const [swipedAll, setSwipedAll] = useState(false)

    useEffect(() => {
        const unsub = onSnapshot(collection(store, "users"), (doc) => {
            const users = doc.docs.filter(x => x.data().id !== user.email).map(item => item.data()) 
            setUsers(users) 
        })
        return () => unsub();
    }, [])

    return(
        <SafeAreaView className="flex-1 bg-white">

            <View className="p-4 items-center justify-between flex-row z-50">
                <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                    <Image 
                        className="h-8 w-8 rounded-full"
                        source={user.photoURL ? { uri: user.photoURL } : require("../../../assets/default-user.png")}
                    />
                </TouchableOpacity>
                <Image className="h-10 w-10 object-contain" source={require("../../../assets/logo.png")}/>
                <TouchableOpacity onPress={() => navigation.navigate("Match")}>
                    <Ionicons name="chatbubbles" size={28} color="#ff5864" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 bg-white items-center justify-center -mt-10">
                {
                    users.length > 0 && (
                        <Swiper
                            ref={swiperRef}
                            containerStyle={{ flex: 1, display: !swipedAll ? "flex" : "none" }}
                            cards={users}
                            cardIndex={0}
                            stackSize={5}
                            verticalSwipe={false}
                            backgroundColor="transparent"
                            animateCardOpacity
                            onSwipedAll={() => {
                                setSwipedAll(true)
                                console.log("Omer AKKOCA")
                            }} // userları resetle
                            overlayLabels={{
                                left: {
                                    title: "NOPE",
                                    style: {
                                        label: {
                                            textAlign: "right",
                                            color: "red"
                                        }
                                    }
                                },
                                right: {
                                    title: "MATCH",
                                    style: {
                                        label: {
                                            textAlign: "left",
                                            color: "#4ded30"
                                        }
                                    }
                                }
                            }}
                            onSwipedLeft={() => {
                                //pass
                            }}
                            onSwipedRight={() => {
                                //match
                            }}
                            keyExtractor={(item) => item?.id}
                            renderCard={(item) => (
                                <View key={item?.email} style={{ height: H(65) }} className="w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                                    <Image
                                        className="flex-1 bg-gray-100"
                                        source={{ uri: item?.photoURL }}
                                    />
                                    <View className="p-4 flex-row items-center justify-between">
                                        <View className="">
                                            <Text className="font-bold text-lg">{item?.displayName}</Text>
                                            <Text>{item?.job}</Text>
                                        </View>
                                        <Text className="font-bold text-2xl">{item?.age}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    )
                }
                <View style={{ height: H(65), display: swipedAll ? "flex" : "none" }} className="w-11/12 mx-auto bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 justify-center items-center">
                    <Text className="font-bold text-center text-base mb-4">No More Profiles</Text>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3129/3129281.png" }}
                        style={{ width: W(25), height: W(25), resizeMode: "cover" }}
                        className="mb-4"
                    />
                    <TouchableOpacity onPress={() => {
                        setSwipedAll(false)
                        swiperRef.current.jumpToCardIndex(0)
                    }}>
                        <Text className="text-gray-400">Click to turn start</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-white px-4 py-2 flex-row justify-evenly">
                <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()} className="items-center justify-center rounded-full p-5 bg-red-200">
                <Entypo name="cross" size={20} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => swiperRef.current.swipeRight()} className="items-center justify-center rounded-full p-5 bg-green-200">
                <AntDesign name="heart" size={20} color="green" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export { Home };