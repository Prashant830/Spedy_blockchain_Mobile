import { Entypo, Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import haversine from "haversine";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import IosStatusBar from './IosStatusBar';
import firebaseApp from "../config";
import TabNavigation from './TabNavigation';

const Cart = () => {
    const userCoordinates = useSelector((state) => state.userLocationReducer.location)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const cart = useSelector((state) => state.CartReducer.cart)
    const [cartItems, setCartItems] = useState()
    const [isLoading, setIsLoading] = useState(true)
    var grandTotal = 0
    const [isInternet, setIsInternet] = useState(true)
    var PriceTotal = cartItems?.map((item) => (item.price)).reduce((prev, curr) => prev + curr, 0)
    var restaurantsDistance = []

    //location delivery price..
    const [minimumShopToUserLocation, setMinimumShopToUserLocation] = useState()
    const [minimumLocationPrice, setMinimumLocationPrice] = useState()
    const [maximumLocationPrice, setMaximumLocationPrice] = useState()






    useEffect(() => {
        setCartItems(cart)

    }, [cart])

    useEffect(() => {
        const internet = NetInfo.fetch().then(state => {
            setIsInternet(state?.isConnected)


        }).catch((err) => {
            alert(err)
        })



    }, [])

    useEffect(() => {

        (async () => {

            firebaseApp.firestore().collection("AppStatus").doc("SpedyAppStatus").onSnapshot((res) => {
                setMinimumShopToUserLocation(res?.data()?.MinimumShopToUserLocation)
                setMaximumLocationPrice(res?.data()?.MaximumLocationPrice)
                setMinimumLocationPrice(res?.data()?.minimumLocationPrice)

            })
        })

        ()


    }, [])

    console.log(minimumShopToUserLocation)
    console.log(maximumLocationPrice)
    console.log(minimumLocationPrice)


    const RemoveItem = (index) => {

        dispatch({
            type: "REMOVE_TO_CART",
            payload: index
        })
        navigation.replace("Cart")
    }


    cart?.forEach((restaurant) => {

        const startPoint = {
            latitude: userCoordinates?.latitude,
            longitude: userCoordinates?.longitude
        }

        const endPoint = {
            latitude: restaurant?.ShopLocation?.Latitude,
            longitude: restaurant?.ShopLocation?.Longitude
        }

        const distance = haversine(startPoint, endPoint, { unit: 'meter' })



        restaurantsDistance.push(Number((distance / 1000).toFixed(1)))


    })



    const maxDistance = Math.max(...restaurantsDistance)


    if (maxDistance >= minimumShopToUserLocation) {
        grandTotal = PriceTotal + maximumLocationPrice
    }
    else {
        grandTotal = PriceTotal + minimumLocationPrice
    }

    // console.log(PriceTotal)
    return (
        isInternet === false ?
            <>
                <IosStatusBar />

                <View
                    style={{
                        width: "100%",
                        height: "90%",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}
                >
                    <Image source={require('../assets/images/notavalible.png')} resizeMode="cover" style={{ height: 200, width: 200 }} />
                    <Text style={{ fontSize: 12 }}>Please Check Your Internet Connection</Text>

                </View>
            </>
            :

            cartItems === undefined ?
                <>
                    <IosStatusBar />
                    {/* <View style={

                        { width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                        <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>

                    </View> */}
                    <View style={{ width: "100%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                        <View style={{ backgroundColor: "#f5220f", padding: 10, borderRadius: 50 }}>
                            <ActivityIndicator size={30} color="#fff" />
                        </View>
                    </View>
                </>
                :
                cartItems?.length === 0 ?
                    <>
                        <IosStatusBar />
                        {/* <View style={

                            { width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                            <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={30} color="#fff" />
                            </TouchableOpacity>

                        </View> */}
                        <View style={{ width: "100%", height: "80%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <View>
                                <Image source={require('../assets/images/cartImage.png')} resizeMode='cover' style={{
                                    height: 200,
                                    width: 200
                                }} />
                                <Text style={{ fontWeight: "500" }}>Looks Nothing Added to Cart</Text>
                            </View>
                        </View>
                        <TabNavigation isCart={true} />
                    </>
                    :
                    <>
                        <IosStatusBar />
                        {/* <View style={

                            { width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                            <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={30} color="#fff" />
                            </TouchableOpacity>

                        </View> */}
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{ fontSize: 24, fontWeight: '300', marginVertical: 20, paddingLeft: 10 }}>Cart <Text style={{ color: "#f5220f", fontWeight: "500" }}>{`Items(${cartItems?.length})`}</Text></Text>
                            <View style={{
                                paddingBottom: Platform.OS === 'android' ? 60 : 100,
                                display: "flex",

                                justifyContent: "center"
                            }}>
                                {
                                    cartItems?.map((item, index) => (

                                        <View key={index} style={{
                                            display: 'flex',
                                            flexDirection: "row",
                                            paddingHorizontal: 20,
                                            borderBottomWidth: 0.5,
                                            borderColor: "lightgrey",
                                            paddingBottom: 10,
                                            marginBottom: 20,
                                            overflow: 'hidden',
                                            alignItems: 'center'
                                        }}>
                                            <View style={
                                                isLoading ?
                                                    {
                                                        display: "flex",
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: 120,
                                                        width: "100%",
                                                    }
                                                    :
                                                    {
                                                        display: 'none'
                                                    }
                                            }>
                                                <ActivityIndicator color="#f5220f" />
                                            </View>

                                            <View style={
                                                isLoading ?
                                                    {
                                                        height: 0,
                                                        width: 0
                                                    }
                                                    :
                                                    {
                                                        display: "flex",
                                                        alignItems: "center",

                                                    }}>
                                                <Image
                                                    source={{ uri: item?.img }}
                                                    onLoadEnd={() => setIsLoading(false)}
                                                    style={
                                                        isLoading ?
                                                            {
                                                                display: Platform.OS === 'android' ? "none" : "flex",
                                                                width: 50,
                                                                height: 50,

                                                            }
                                                            :
                                                            {
                                                                width: 50,
                                                                height: 50,
                                                                resizeMode: "cover",

                                                            }} />
                                                <Text style={
                                                    isLoading ?
                                                        {
                                                            display: "none"
                                                        }
                                                        :
                                                        { marginTop: 5 }
                                                }>
                                                    Qty: {item?.qty}</Text>

                                            </View>
                                            <View
                                                style={
                                                    isLoading ?
                                                        {
                                                            display: "none"
                                                        }
                                                        :
                                                        {
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            flex: 0.85,
                                                            paddingLeft: 10,
                                                            overflow: "hidden",

                                                        }}>
                                                <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 5, width: 200, overflow: "hidden" }}>{item.name}</Text>
                                                <Text style={{ marginTop: 5, width: "100%" }}>
                                                    {Array(item?.rating).fill().map((_, i) => (
                                                        <Entypo name='star' size={16} color="gold" key={i} />
                                                    ))}

                                                </Text>
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                    <Text style={{ fontWeight: '500', marginTop: 5, marginLeft: 5 }}>wei {item?.price} </Text>
                                                    <Text style={{ fontWeight: '300', fontSize: 12, marginTop: 5 }}>({item?.size})</Text>
                                                </View>
                                                <Text style={{ marginTop: 5, fontSize: 10, width: 200, overflow: 'hidden' }}>{item.description}</Text>
                                                <Text style={{ marginTop: 5, fontSize: 10, width: 200, overflow: 'hidden', fontWeight: "500" }}>{item.ShopName}</Text>

                                            </View>

                                            <TouchableOpacity style={
                                                isLoading ?
                                                    {
                                                        display: "none"
                                                    }
                                                    :
                                                    { backgroundColor: "#f5220f", padding: 5, borderRadius: 5, position: 'absolute', right: 10 }}
                                                onPress={() => RemoveItem(index)}
                                            >
                                                <Text style={{ fontWeight: '700', fontSize: 10, color: "#fff" }}>Remove</Text>
                                            </TouchableOpacity>

                                        </View>

                                    ))
                                }

                                <View
                                    style={{
                                        width: "100%",
                                        paddingVertical: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <View style={{
                                        backgroundColor: "#fff",
                                        width: "90%",
                                        borderRadius: 10,
                                        padding: 10,
                                        borderWidth: 0.5,
                                        borderColor: "#f5220f"
                                    }}>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', width: "100%", alignItems: 'center', paddingHorizontal: 20 }}>
                                            <Text style={{ flex: 1, fontWeight: "300" }}>Total Items</Text>
                                            <Text style={{ fontWeight: "500" }}>{cartItems?.length}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', width: "100%", alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }}>
                                            <Text style={{ flex: 1, fontWeight: "300" }}>Total Price</Text>
                                            <Text style={{ fontWeight: "500" }}>wei {PriceTotal}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', width: "100%", alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }}>
                                            <Text style={{ flex: 1, fontWeight: "300" }}>Delivery Fee</Text>
                                            <Text style={{ fontWeight: "500" }}>wei {maxDistance >= minimumShopToUserLocation ? maximumLocationPrice : minimumLocationPrice}</Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', width: "100%", alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }}>
                                            <Text style={{ flex: 1, fontWeight: "300" }}>Pay</Text>
                                            <Text style={{ fontWeight: "500" }}>wei {grandTotal}</Text>
                                        </View>

                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', width: "100%", alignItems: 'center', paddingHorizontal: 20, marginTop: 30 }}>
                                        <TouchableOpacity style={{ backgroundColor: "#f5220f", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, paddingVertical: 10 }}
                                            onPress={() => {
                                                navigation.navigate('PaymentPage', {
                                                    cart: cart,
                                                    PriceTotal: PriceTotal,
                                                    grandTotal: grandTotal,
                                                    DeliveryFee: maxDistance >= minimumShopToUserLocation ? maximumLocationPrice : minimumLocationPrice
                                                }

                                                )
                                            }
                                            }
                                        >
                                            <Text style={{ color: "#fff", fontWeight: "500", fontSize: 18 }}>Proceed Order</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </ScrollView>
                        <TabNavigation isCart={true} />
                    </>
    )
}

export default Cart