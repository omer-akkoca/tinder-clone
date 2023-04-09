import React, { Component } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

class CustomModal extends Component{

    static instance = null

    state = {
        show: false,
        title: "",
        description: "",
    }

    componentDidMount(){
        CustomModal.instance = this
    }

    static showModal = ({ title, description }) => {
        this.instance.setState({ show: true, title, description })
    }

    hideModal = () => {
        this.setState({ show: false })
    }

    render(){
        const { show, title, description } = this.state

        if (!show) return;
        return (
            <Modal visible={this.state.show} transparent={true} statusBarTranslucent={true}>
                <View className="bg-[#00000090] flex-1 justify-center items-center">
                    <View className="bg-white p-4 w-11/12">
                        <Text className="text-center font-bold text-lg mb-2">{title}</Text>
                        <Text className="text-center mb-4">{description}</Text>
                        <View className="flex-row items-center space-x-4">
                            <TouchableOpacity
                                onPress={() => this.hideModal()} activeOpacity={0.5}
                                className="flex-1 bg-[#ff5864] p-3 rounded-full shadow-md"
                            >
                                <Text className="text-center font-bold text-white">Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

/*
<TouchableOpacity activeOpacity={0.5} className="flex-1 bg-white border border-[#ff5864] p-3 rounded-full shadow-md">
                                <Text className="text-center font-bold text-[#ff5864]">İptal</Text>
                            </TouchableOpacity>
*/

export { CustomModal };