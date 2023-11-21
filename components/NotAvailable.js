import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import Header from './Header'
import IosStatusBar from './IosStatusBar'

const NotAvailable = () => {
    return (
        <>
            <IosStatusBar />
            <Header delivery={false} />
            <View style={{
                width: "100%",
                height: "70%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff"

            }}>
                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5220f",
                    width: Dimensions.get('window').width - 25,
                    height: 350,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: "hidden",

                    // borderWidth: 2,
                    borderColor: "#f5220f",
                    borderRadius: 10,
                    elevation: 10,
                    shadowOffset: { width: 5, height: 5 },
                    shadowColor: 'black',
                    shadowOpacity: .8,
                    shadowRadius: 1,
                }}>
                    <Image source={require('../assets/images/Spedy_Logo.png')} style={{ width: 100, height: 100, marginBottom: 20 }}></Image>
                    <Text style={{ fontSize: 35, color: "#fff", fontWeight: "700" }}>We're Sorry </Text>
                    <Text style={{ fontSize: 18, color: "#fff", fontWeight: "500", marginTop: 20, textAlign: "center" }}>Spedy is not available at your location yet.We will be there soon. </Text>

                </View>
            </View>
        </>
    )
}

export default NotAvailable