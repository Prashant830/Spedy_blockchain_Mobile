import { FontAwesome, Ionicons } from "@expo/vector-icons";
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from "@react-navigation/native";
import haversine from "haversine";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import firebaseApp from "../config";
import { shop } from "./Db";
import Header from "./Header";
import IosStatusBar from './IosStatusBar';
import ResCard from "./ResCard";
import TabNavigation from './TabNavigation';
import { FlashList } from "@shopify/flash-list";

const Restaurants = () => {
    const navigation = useNavigation()
    const [restaurants, setRestaurants] = useState()
    var restaurantsInRange = []
    const Height = Dimensions.get('screen').height
    const FetchRestaurants = firebaseApp.firestore().collection("Restaurants")
    const userLocation = useSelector((state) => state.userLocationReducer.location)
    const userAddress = useSelector((state) => state.userLocationReducer.address)
    const date = new Date
    const [isInternet, setIsInternet] = useState(true)
    const [fixedAppLocation, setFixedAppLocation] = useState()


    useEffect(() => {
        const internet = NetInfo.fetch().then(state => {
            setIsInternet(state?.isConnected)


        }).catch((err) => {
            alert(err)
        })



    }, [])


    useEffect(() => {
        (async () => {
            FetchRestaurants.orderBy("Ranking").onSnapshot(res => {
                setRestaurants(
                    res.docs.map((restaurant) => (
                        restaurant.data()
                    ))
                )
            })
            // console.log(restaurants)

        })
            ()
    }, [])


    useEffect(() => {

        (async () => {

            firebaseApp.firestore().collection("AppStatus").doc("SpedyAppStatus").onSnapshot((res) => {
                    setFixedAppLocation(res.data().MainAppLocationLimit)
            })
        }
        )
            ()


    }, [])

    restaurants?.forEach((restaurant) => {
        const startPoint = {
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude
        }

        const endPoint = {
            latitude: restaurant?.Coordinates?.Latitude,
            longitude: restaurant?.Coordinates?.Longitude
        }

        const distance = haversine(startPoint, endPoint, { unit: "meter" })

        if ((distance / 1000).toFixed(1) <= fixedAppLocation) {
            // console.log(Math.floor(distance))
            restaurantsInRange?.push(restaurant)
        }

    }
    )

    // console.log(restaurantsInRange[0].OwnerNumber)

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
            restaurants?.length === undefined ?
                <>
                    <IosStatusBar />
                    {/* <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                        <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>

                    </View> */}
                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >

                        <ActivityIndicator size={30} color="#f5220f" />

                    </View>

                </>
                :
                <>
                    <IosStatusBar />
                    {/* <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                        <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>

                    </View> */}
                    <ScrollView

                        style={{
                            backgroundColor: "#fff",
                            marginBottom: -Height + Height + 50,
                            height: "100%"
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    navigation.navigate("SearchPage", {
                                        restaurants: restaurantsInRange.length > 0 ? restaurantsInRange : restaurants,
                                        onlyRes: true
                                    })
                                }}
                                style={

                                    {
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        width: "90%",
                                        justifyContent: "center",
                                        borderRadius: 10,
                                        padding: 5,
                                        backgroundColor: "#fff",
                                        borderWidth: 1,
                                        borderColor: "#f5220f"
                                    }}>
                                <View
                                    style={

                                        { width: "90%" }}
                                >
                                    <Text style={{ color: "lightgray" }}>Search for restaurant or dish</Text>
                                </View>
                                {/* <TextInput onFocus={() => {
                                navigation.navigate("SearchPage", {
                                    restaurants: restaurantsInRange
                                })
                            }} style={

                                { width: "90%", height: 35, fontSize: 14, fontWeight: "300" }}  
                                
                                /> */}
                                <FontAwesome name="search" size={23} color="#f5220f" style={

                                    { height: 35, paddingTop: 3 }} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ marginTop: 30, paddingHorizontal: 5 }}>
                            <Text style={{
                                marginTop: 0,
                                marginHorizontal: 5,
                                fontSize: 24,
                                fontWeight: "500",
                                marginBottom: 0
                            }}
                            >{(restaurantsInRange?.length > 0) ? restaurantsInRange?.length : restaurants?.length} Restaurants on
                                <Text style={{
                                    color: "#f5220f",
                                    fontWeight: "700"
                                }}
                                > Spedy</Text></Text>
                        </View>

                        <View style={{
                            width: "100%",
                            display: "flex",
                            marginBottom: 50,
                            marginStart:13,

                        }}>
                            {(userAddress?.country === undefined) &&
                            <FlashList
                                     
                                     data={restaurantsInRange}
                                     renderItem={({item, index}) =>

                                <TouchableOpacity activeOpacity={0.9} disabled={(item?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || item?.Isopen === false) ? true : false} key={item?.Id} onPress={() => navigation.navigate('RestaurantDetail', {
                                    name: item?.Name,
                                    address: item?.Address,
                                    id: item?.Id,
                                    isopen: item?.Isopen,
                                    coordinates: item?.Coordinates,
                                    dishes: item?.Dishes,
                                    img: item?.RestaurantImage,
                                    rating: item?.Rating,
                                    location: item?.Coordinates,
                                    ownerNumber: item?.OwnerNumber,
                                })} style={{
                                    elevation: 10,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowColor: 'grey',
                                    shadowOpacity: .5,
                                    shadowRadius: 5,
                                    marginTop: 50,

                                }}>
                                    <ResCard
                                        img={item?.RestaurantImage}
                                        name={item?.Name}
                                        key={item?.Id}
                                        shopid={item?.Id}
                                        address={item?.Address}
                                        rating={item?.Rating}
                                        location={item?.Coordinates}
                                        ownerNumber={item?.OwnerNumber}
                                        shopOpen={item?.ShopOpen}
                                        isopen={item?.Isopen}
                                    />
                                </TouchableOpacity>

                                   }
                                  >
                                </FlashList>
                        }

                                      
                                      <FlashList
                                     data={restaurantsInRange}
                                     renderItem={({item, index}) =>

                                <TouchableOpacity activeOpacity={0.9} disabled={(item?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || item?.Isopen === false) ? true : false} key={item?.Id} onPress={() => navigation.navigate('RestaurantDetail', {
                                    name: item?.Name,
                                    address: item?.Address,
                                    id: item?.Id,
                                    isopen: item?.Isopen,
                                    coordinates: item?.Coordinates,
                                    dishes: item?.Dishes,
                                    img: item?.RestaurantImage,
                                    rating: item?.Rating,
                                    location: item?.Coordinates,
                                    ownerNumber: item?.OwnerNumber,

                                })} style={{
                                    elevation: 10,
                                    shadowOffset: { width: 0, height: 5 },
                                    shadowColor: 'grey',
                                    shadowOpacity: .5,
                                    shadowRadius: 5,
                                    marginTop: 50,

                                }}>

                                    <ResCard
                                        img={item?.RestaurantImage}
                                        name={item?.Name}
                                        key={item?.Id}
                                        shopid={item?.Id}
                                        address={item?.Address}
                                        rating={item?.Rating}
                                        location={item?.Coordinates}
                                        ownerNumber={item?.OwnerNumber}
                                        shopOpen={item?.ShopOpen}
                                        isopen={item?.Isopen}
                                    />
                                </TouchableOpacity>
                              }
                              >
                            </FlashList>
                        </View>


                    </ScrollView>
                    <TabNavigation isRestaurants={true} />
                </>
    )
}

export default Restaurants