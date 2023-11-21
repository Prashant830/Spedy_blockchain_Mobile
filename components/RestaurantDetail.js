import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import haversine from 'haversine';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import firebaseApp from '../config';
import DishCard from './DishCard';
import IosStatusBar from './IosStatusBar';
import TabNavigation from './TabNavigation';

const RestaurantDetail = ({ route }) => {
    const resNumber = route.params?.ownerNumber
    const FetchRestaurants = firebaseApp.firestore().collection("Restaurants")
    const userLocation = useSelector((state) => state.userLocationReducer.location)
    const userAddress = useSelector((state) => state.userLocationReducer.address)
    const [imgLoading, setImgLoading] = useState(true)
    const [disfromusertores, setDisfromusertores] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const navigation = useNavigation()

    var id
    var name
    var address
    var isOpen
    var dishes
    var img
    var location
    var rating
    var ownerNumber


    useEffect(() => {
        FetchRestaurants.onSnapshot(res => {
            setRestaurants(
                res.docs.map((restaurant) => (
                    restaurant.data()
                ))
            )
        })


    }, [resNumber])

    restaurants?.map((restaurant) => {

        if (restaurant?.OwnerNumber === resNumber) {
            id = restaurant?.Id
            name = restaurant?.Name
            address = restaurant?.Address
            isOpen = restaurant?.Isopen
            dishes = restaurant?.Dishes
            img = restaurant?.RestaurantImage
            location = restaurant?.Coordinates
            rating = restaurant?.Rating
            ownerNumber = restaurant?.OwnerNumber
        }
    })

    // console.log(location)


    useEffect(() => {
        (() => {


            const startPoint = {
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude
            }

            const endPoint = {
                latitude: location?.Latitude,
                longitude: location?.Longitude
            }

            const distance = haversine(startPoint, endPoint, { unit: "meter" })

            setDisfromusertores((distance / 1000).toFixed(1))
        })
            ()

    }, [userLocation, location])

    return (
        <>
            <IosStatusBar />
            <View style={

                { width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

            </View>
            <View style={
                imgLoading ?
                    { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", flexDirection: 'row' }
                    :
                    {
                        display: "none"
                    }
            }>
                <Text style={{ color: "#f5220f" }}>Please wait...</Text><ActivityIndicator color="#f5220f" />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>


                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "white",
                    width: Dimensions.get('window').width,
                    height: 250,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: "hidden",

                }} className="flex flex-col h-min flex-wrap" >

                    <Image source={{ uri: img }} onLoadEnd={() => setImgLoading(false)} style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                        opacity: 1
                    }} />



                    <Text style={{
                        position: "absolute",
                        bottom: 40,
                        width: "100%",
                        paddingHorizontal: 10,
                        fontSize: 26,
                        fontWeight: "500",
                        color: "white"
                    }}>{name}</Text>
                    <Text style={{
                        position: "absolute",
                        top: 5,
                        width: "100%",
                        paddingHorizontal: 10,
                        marginTop: 10,

                    }}>
                        {Array(rating)
                            .fill()
                            .map((_, i) => (
                                <Entypo name='star' size={24} color="gold" key={i} />
                            ))}

                    </Text>
                    <Text style={{
                        position: "absolute",
                        bottom: 10,
                        width: "100%",
                        paddingHorizontal: 10,
                        fontSize: 14,
                        fontWeight: "300",
                        color: "white"
                    }}>{address}</Text>
                    <Text style={{
                        position: "absolute",
                        top: 7,
                        right: 0,
                        width: "50%",
                        paddingHorizontal: 5,
                        fontSize: 14,
                        fontWeight: "500",
                        color: "white",
                        textAlign: 'right'
                    }}>{!userAddress?.country ? "" : (disfromusertores >= 5) ? `30 min ${disfromusertores} km` : `15 min ${disfromusertores} km`}</Text>



                </View>


                <View style={{ marginTop: 10, paddingHorizontal: 5 }}>
                    <Text style={{
                        marginTop: 15,
                        marginHorizontal: 5,
                        fontSize: 24,
                        fontWeight: "500",
                        marginBottom: 15
                    }}
                    >Restaurant
                        <Text style={{
                            color: "#f5220f",
                            fontWeight: "700"
                        }}
                        > Menu</Text></Text>
                </View>

                <View style={{
                    paddingBottom: Platform.OS === 'android' ? 60 : 70,
                }}>
                    {
                        dishes?.map((dish, index) => (
                            <View key={index} style={{
                                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10,

                            }}>
                                <DishCard
                                    key={index}
                                    category={dish?.Category}
                                    description={dish?.Description}
                                    id={dish?.DishId}
                                    name={dish?.DishName}
                                    tags={dish?.DishTags}
                                    img={dish?.Image}
                                    isVeg={dish?.Isveg}
                                    quantity={dish?.Quantity}
                                    rating={dish?.Rating}
                                    ShopName={name}
                                    ShopAddress={address}
                                    ShopNumber={ownerNumber}
                                    Shopid={id}
                                    ShopLocation={location}
                                    isShopOpen={isOpen}
                                    isAvailable={dish?.isAval}



                                />
                            </View>
                        ))
                    }

                </View>

            </ScrollView>
            <TabNavigation />
        </>
    )
}

export default RestaurantDetail