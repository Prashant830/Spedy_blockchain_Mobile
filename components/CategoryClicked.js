import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import IosStatusBar from './IosStatusBar';
import ResCard from './ResCard';
import TabNavigation from './TabNavigation';

const CategoryClicked = ({ route }) => {
    const userAddress = useSelector((state) => state.userLocationReducer.address)
    const restaurants = route.params?.restaurants
    const name = route.params?.name
    const date = new Date
    const navigation = useNavigation()
    var searchResult = []

    var searchLoading = false

    const searchValue = name?.name.toLowerCase();

    console.log(searchValue)


    if (restaurants !== undefined || stores !== undefined) {
        searchLoading = true
        restaurants?.forEach((restaurant) => {
            var result
            result = restaurant?.RestaurantTag?.search(searchValue)

            if (result !== -1) {

                searchResult.push(restaurant)
            }

        })

        // if (searchValue !== "" && searchValue !== undefined) {
        //     restaurants?.forEach((restaurant) => {
        //         var result

        //         restaurant?.Dishes?.forEach((dish) => {
        //             result = dish?.DishTags?.search(searchValue)
        //             if (result !== -1 && result !== undefined) {

        //                 searchResult.push(restaurant)
        //             }

        //         })


        //     })
        // }
        searchLoading = false
    }


    return (
        <>
            <IosStatusBar />
            <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

            </View>

            <ScrollView>


                <Text style={{ fontSize: 24, fontWeight: '300', paddingHorizontal: 10, marginTop: 20 }}>Category<Text style={{ color: "#f5220f", fontWeight: "500" }}> Result({searchResult.length})</Text></Text>

                { 
                (searchResult.length == 0) ?  
                 <View
                 style={{
                     width: "100%",
                     height: "80%",
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'

                 }}
             >
                 <Image source={require('../assets/images/notavalible.png')} resizeMode="cover" style={{ height: 400, width: 400 }} />
                 <Text style={{ fontSize: 12 }}>This Item is not availabile in Spedy.</Text>
                 <Text style={{ fontSize: 12 }}>We will be added it soon!</Text>
                  </View>
                    :
                    searchLoading ?
                        <View style={{ marginTop: 10, width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={24} color="#f5220f" />
                        </View>
                        :
                        <View>
                            <View style={
                                (restaurants[0]?.Address) ?
                                    {
                                        display: "none"
                                    }
                                    :
                                    {
                                        width: "100%",
                                        height: "10%",
                                        paddingBottom: Platform.OS === 'android' ? 100 : 100,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: 'center'
                                    }
                            }>
                                <ActivityIndicator color="#f5220f" />
                            </View>

                            <View
                                style={
                                    (restaurants[0]?.Address) ?
                                        {
                                            marginBottom: 0,
                                            marginTop: 0,
                                            paddingBottom: Platform.OS === 'android' ? 100 : 100,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }
                                        :
                                        {
                                            display: "none"
                                        }

                                }
                                className="shadow-md h-max"
                            >
                                {(userAddress?.country === undefined) && searchResult.map((restaurant, index) => (

                                <TouchableOpacity activeOpacity={1} disabled={(restaurant?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || restaurant?.Isopen === false) ? true : false} key={restaurant?.Id} onPress={() => navigation.navigate('RestaurantDetail', {
                     
                                    name: restaurant?.Name,
                                    address: restaurant?.Address,
                                    id: restaurant?.Id,
                                    isopen: restaurant?.Isopen,
                                    coordinates: restaurant?.Coordinates,
                                    dishes: restaurant?.Dishes,
                                    img: restaurant?.RestaurantImage,
                                    rating: restaurant?.Rating,
                                    location: restaurant?.Coordinates,
                                    ownerNumber: restaurant?.OwnerNumber,

                                    })} style={{
                                        opacity:restaurant?.isopen?1:0.6,
                                        elevation: 10,
                                        shadowOffset: { width: 0, height: 5 },
                                        shadowColor: 'grey',
                                        shadowOpacity: .5,
                                        shadowRadius: 5,
                                        marginTop: 50,

                                    }}>
                                        <ResCard
                                           img={restaurant?.RestaurantImage}
                                           name={restaurant?.Name}
                                           key={restaurant?.Id}
                                           shopid={restaurant?.Id}
                                           address={restaurant?.Address}
                                           rating={restaurant?.Rating}
                                           location={restaurant?.Coordinates}
                                           ownerNumber={restaurant?.OwnerNumber}
                                           shopOpen={restaurant?.ShopOpen}
                                           isopen={restaurant?.Isopen}
                                        />
                                    </TouchableOpacity>


                                ))}


                                {searchResult.map((restaurant, index) => (

                                <TouchableOpacity activeOpacity={1} disabled={(restaurant?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || restaurant?.Isopen === false) ? true : false} key={restaurant?.Id} onPress={() => navigation.navigate('RestaurantDetail', {

                                    name: restaurant?.Name,
                                    address: restaurant?.Address,
                                    id: restaurant?.Id,
                                    isopen: restaurant?.Isopen,
                                    coordinates: restaurant?.Coordinates,
                                    dishes: restaurant?.Dishes,
                                    img: restaurant?.RestaurantImage,
                                    rating: restaurant?.Rating,
                                    location: restaurant?.Coordinates,
                                    ownerNumber: restaurant?.OwnerNumber,
                                    })} style={{
                                        elevation: 10,
                                        shadowOffset: { width: 0, height: 5 },
                                        shadowColor: 'grey',
                                        shadowOpacity: .5,
                                        shadowRadius: 5,
                                        marginTop: 50,

                                    }}>
                                        <ResCard
                                           img={restaurant?.RestaurantImage}
                                           name={restaurant?.Name}
                                           key={restaurant?.Id}
                                           shopid={restaurant?.Id}
                                           address={restaurant?.Address}
                                           rating={restaurant?.Rating}
                                           location={restaurant?.Coordinates}
                                           ownerNumber={restaurant?.OwnerNumber}
                                           shopOpen={restaurant?.ShopOpen}
                                           isopen={restaurant?.Isopen}
                                        />
                                    </TouchableOpacity>


                                ))}

                            </View>



                        </View>
                }

            </ScrollView>
            <TabNavigation />
        </>

    )
}

export default CategoryClicked