import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import style from './CSS';
import IosStatusBar from "./IosStatusBar";

const Header = ({ delivery }) => {
    const navigation = useNavigation()
    const getUserAddress = useSelector((state) => state.userLocationReducer.address)
    const getPermission = useSelector((state) => state.userLocationReducer.permission)

    const [userAddress, setUserAddress] = useState("finding...");


    //Set Usser Address to String
    useEffect(() => {
        if (getUserAddress?.name !== null) {
            setUserAddress(
                `${getUserAddress?.name +
                " " +
                getUserAddress?.city +
                " " +
                getUserAddress?.region +
                "," +
                getUserAddress?.postalCode
                }`
            );
        } else {
            setUserAddress(
                `${getUserAddress?.city + " " + getUserAddress?.region + "," + getUserAddress?.postalCode}`
            );
        }
    }, [getUserAddress]);

    return (
        <>
            {/* <IosStatusBar /> */}
            <View style={
                delivery === false ?
                    {
                        backgroundColor: "#f5220f",
                        color: "#fff",
                        overflow: 'hidden',
                        height: Platform.OS === 'android' ? "10%" : "8%",
                        zIndex: 1,
                    }
                    :
                    {
                        backgroundColor: "#f5220f",
                        color: "#fff",
                        overflow: 'hidden',
                        height: Platform.OS === 'android' ? "10%" : "8%",
                        zIndex: 1,
                    }
            }>
                <View
                    style={style.HomePage_Header_first}
                    className="items-center"
                >
                    <TouchableOpacity style={style.HomePage_Header_first_left} onPress={() => navigation.navigate('ProfilePage')}>
                        <FontAwesome5 name="user-circle" size={30} color="white" />
                    </TouchableOpacity>

                    <View
                        style={style.HomePage_Header_first_right}
                        className="place-items-end"
                    >
                        <View className="flex ">
                            <TouchableOpacity onPress={() => navigation.navigate('LocationPage')}>
                                <View className="flex flex-row items-center justify-end">
                                    <Ionicons name="ios-location" size={24} color="white" />
                                    <Text className="text-white font-bold text-sm text-right">
                                        {
                                            (getPermission) ?
                                                (getUserAddress?.postalCode === undefined)
                                                    ? "Finding..."
                                                    : getUserAddress?.name
                                                        ? `${getUserAddress?.name}`
                                                        : `${getUserAddress?.city}`

                                                :
                                                "Tab to Select Location "
                                        }

                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('LocationPage')}>
                                <View
                                    style={
                                        (getPermission && getUserAddress)
                                            ? {
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }
                                            : { display: "none" }
                                    }
                                >
                                    <Text
                                        className="text-white font-bold text-right"
                                        style={{
                                            fontSize: 10,
                                            height: 15,
                                        }}
                                    >
                                        {getUserAddress?.city === undefined ? "" : userAddress}

                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>

                <View style={{
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center",
                    width: Dimensions.get("window").width,
                    marginTop: 15,


                }}>
                    {/* <View style={
                        delivery === false ?
                            {
                                display: "none"

                            }
                            :
                            {
                                display: "flex",
                                flexDirection: "row",
                                alignItems: 'center',
                                width: "90%",
                                justifyContent: "center",
                                borderRadius: 10,
                                padding: 5,
                                backgroundColor: "#fff"
                            }}>
                        <TextInput style={
                            delivery === false ?
                                { display: 'none' }
                                :
                                { width: "90%", height: 35, fontSize: 14, fontWeight: "300" }} placeholder="Search for restaurant, item or more" />
                        <FontAwesome name="search" size={23} color="#f5220f" style={
                            delivery === false ?
                                { display: 'none' }
                                :
                                { height: 35, paddingTop: 3 }} />
                    </View> */}

                </View>
            </View>

        </>

    )
}

export default Header