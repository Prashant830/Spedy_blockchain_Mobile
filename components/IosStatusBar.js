import Constants from 'expo-constants'
import React from 'react'
import { Dimensions, Platform, Text, View } from 'react-native'
const IosStatusBar = () => {
    return (
        <View
            style={
                Platform.OS === 'ios' ?
                    {
                        width: Dimensions.get("window").width,
                        backgroundColor: "#f5220f",
                        height: Constants.statusBarHeight,

                    }
                    :
                    {
                        display: "none"
                    }
            }
        ></View>
    )
}

export default IosStatusBar