import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window")

const deviceHeight = height
const deviceWidth = width

const H = (x) => (x * deviceHeight) / 100;
const W = (x) => (x * deviceWidth) / 100; 

export { deviceHeight, deviceWidth, H, W };