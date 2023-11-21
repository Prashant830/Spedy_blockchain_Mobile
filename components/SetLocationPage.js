import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native';
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";


import React, { useEffect, useState } from 'react';
import { Dimensions, Linking, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { GooglePlaces } from "../Apikeys";
import style from "./CSS";
import Header from "./Header";
import IosStatusBar from './IosStatusBar';

// 

const SetLocationPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [userLat, setUserLat] = useState()
    const [userLong, setUserLong] = useState()
    const [getUserAddress, setGetUserAddress] = useState()
    const [address, setAddress] = useState()
    const [err, setErr] = useState()
    const [isadd, setIsadd] = useState(false)
    const [setting, setSetting] = useState(false)
    const [getPermission, setGetPermission] = useState(false)
    const [userLocation, setUserLocation] = useState()
    const [userAdd, setUserAdd] = useState({})
    const [finding, setFinding] = useState(false)
    var coords = {
        latitude: Number(userLat),
        longitude: Number(userLong)
    }

    useEffect(() => {
        if (getUserAddress?.name !== null) {
            setAddress(
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
            setAddress(
                `${getUserAddress?.city + " " + getUserAddress?.region + "," + getUserAddress?.postalCode}`
            );
        }
    }, [getUserAddress]);


    const fetchAddress = async () => {
        if (userLat === undefined || userLat === "") {

            setErr("Check the latitude")
        }
        else if (userLong === undefined || userLong === "") {
            setErr("Check the longitude")
        }
        else {
            await Location.reverseGeocodeAsync(coords).then((result) => {
                setGetUserAddress(result[0])
                setIsadd(true)
            }).catch((err) => {

                alert(err.message)

            })
        }

    }

    const fetchCurrentLocation = () => {

        (async () => {


            //inialize
            setFinding(true)




            //Request for location permission
            const { status } = await Location.requestForegroundPermissionsAsync().catch((err) => {
                console.log(err.message)
            })






            //Handle Error
            if (status === 'granted') {
                let coardinates
                let address

                coardinates = await Location.getCurrentPositionAsync({}).then(async (coardinate) => {
                    address = await Location.reverseGeocodeAsync(coardinate.coords)
                    dispatch({
                        type: 'ADD_ADDRESS',
                        payload: address[0],
                    })
                    dispatch({
                        type: 'ADD_LOCATION',
                        payload: coardinate?.coords,
                    })
                    dispatch({
                        type: 'ADD_PERMISSION',
                        payload: true
                    })
                    dispatch({
                        type: 'ADD_ADDRESSTYPE',
                        payload: 'current'
                    })
                    setFinding(false)
                    navigation.navigate("HomePage")

                }).catch((err) => {
                    setFinding(false)
                    console.log("this is the err in coardinates --> " + err.message)
                })


            }
            else {

                setFinding(false)

                dispatch({
                    type: 'ADD_ADDRESS',
                    payload: {},
                })
                dispatch({
                    type: 'ADD_LOCATION',
                    payload: {},
                })
                dispatch({
                    type: 'ADD_PERMISSION',
                    payload: false
                })
                dispatch({
                    type: 'ADD_ADDRESSTYPE',
                    payload: 'current'
                })
            }



        })
            //calling function
            ();
    }

    // useEffect(() => {
    //     if (userAdd !== undefined) {


    //     }

    // }, [userAdd])


    const setAddressToRedux = () => {
        setSetting(true)
        dispatch({
            type: 'ADD_ADDRESS',
            payload: getUserAddress,
        })
        dispatch({
            type: 'ADD_LOCATION',
            payload: coords,
        })
        dispatch({
            type: 'ADD_PERMISSION',
            payload: true
        })
        dispatch({
            type: 'ADD_ADDRESSTYPE',
            payload: "manual"
        })
        navigation.navigate('HomePage')
        setSetting(false)
    }

    // console.log(address)

    return (
        <>

            <IosStatusBar />
            <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 10, paddingHorizontal: 5 }}>
                    <Text style={{
                        marginTop: 15,
                        marginHorizontal: 5,
                        fontSize: 24,
                        fontWeight: "500",
                        marginBottom: 15
                    }}
                    >Select Your
                        <Text style={{
                            color: "#f5220f",
                            fontWeight: "700"
                        }}
                        > Location</Text></Text>
                </View>


                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    width: "100%",


                }}>
                    <TextInput
                        placeholder="Enter Latitude of Location"
                        keyboardType="numbers-and-punctuation"
                        onChangeText={(value) => {
                            setErr("")
                            setUserLat(value)
                        }}
                        style={{
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: userLat !== undefined && userLat !== "" ? "#f5220f" : "lightgrey",
                            width: "90%",
                            paddingVertical: 7,
                            paddingHorizontal: 10,
                            borderRadius: 10

                        }}
                    />
                    <TextInput
                        placeholder="Enter Longitude of Location"
                        keyboardType="numbers-and-punctuation"
                        onChangeText={(value) => {
                            setErr("")
                            setUserLong(value)
                        }}
                        style={{
                            marginTop: 20,
                            borderWidth: 1,
                            borderColor: userLong !== undefined && userLong !== "" ? "#f5220f" : "lightgrey",
                            width: "90%",
                            paddingVertical: 7,
                            paddingHorizontal: 10,
                            borderRadius: 10

                        }}
                    />

                    <View style={{ width: "90%", display: 'flex', alignItems: "flex-end", marginTop: 5 }}>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => {
                                if (Platform.OS !== 'android') {
                                    Linking.openURL("https://youtube.com/watch?v=ubF1yN-41zA&feature=share");
                                }
                                else {
                                    Linking.openURL("https://youtube.com/watch?v=ubF1yN-41zA&feature=share");
                                }
                            }}
                        >
                            <Text style={{ fontSize: 12, color: "#f5220f" }}>How to find latitude and longitude ?</Text>
                        </TouchableOpacity>

                    </View>

                    <View
                        style={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            marginTop: 5

                        }}
                    >
                        <TouchableOpacity
                            disabled={finding ? true : false}
                            onPress={() => fetchCurrentLocation()}
                            activeOpacity={0.5}
                            style={{

                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                marginTop: 5

                            }}>
                            <Text style={{ fontSize: 16, fontWeight: "500", color: "#f5220f", paddingHorizontal: 5 }}>{finding ? "Finding..." : "use current location"}</Text>
                            <MaterialIcons name="my-location" size={24} color="#f5220f" />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={
                            err === undefined || err === "" ?
                                {
                                    display: 'none'
                                }
                                :

                                { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }
                        }
                    >
                        <Text style={{ color: "#f5220f" }}>{err}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => fetchAddress()}
                        style={{ backgroundColor: "#f5220f", padding: 10, borderRadius: 10, marginTop: err === undefined || err === "" ? 30 : 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>Search</Text>
                    </TouchableOpacity>

                </View>
                <View

                    style={
                        !isadd || getUserAddress?.postalCode === undefined ?
                            {
                                display: 'none'
                            }
                            :
                            {
                                display: 'flex',
                                marginTop: 10,
                                width: "100%",
                                paddingHorizontal: 5
                            }

                    }>

                    <Text style={{
                        marginTop: 15,
                        marginHorizontal: 5,
                        fontSize: 24,
                        fontWeight: "500",
                        marginBottom: 15
                    }}
                    >Selected
                        <Text style={{
                            color: "#f5220f",
                            fontWeight: "700"
                        }}
                        > Address</Text></Text>


                    <Text style={{ width: "100%", paddingHorizontal: 20, textAlign: 'center', fontSize: 16 }}>{address}</Text>
                    <View style={{
                        width: "100%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => setAddressToRedux()}
                            style={{ backgroundColor: "#f5220f", padding: 10, borderRadius: 10, marginTop: 30, width: "50%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: "500", color: "#fff" }}>{setting ? "Setting.." : "Set Address"}</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </ScrollView>




        </>
    )
}

export default SetLocationPage