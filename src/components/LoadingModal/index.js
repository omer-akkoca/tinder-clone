import React, { useEffect, useRef } from "react";
import { View, Modal } from "react-native";
import { W } from "../../config/constants";
import LottieView from 'lottie-react-native';

const LoadingModal = ({ show }) => {

    const animation = useRef(null);
    
    useEffect(() => {
        animation.current?.play();
        return () => animation.current?.reset();
    }, []);

    return (
        <>
            <Modal transparent visible={show}>
                <View style={{ backgroundColor: "rgba(255, 255, 255, .5)" }} className="flex-1 items-center justify-center">
                    <LottieView
                        autoPlay
                        ref={animation}
                        loop
                        style={{  width: W(75), height: W(75) }}
                        
                        source={require("../../../assets/loading.json")}
                    />
                </View>
            </Modal>
        </>
    )
}

export { LoadingModal };