import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import IosStatusBar from './IosStatusBar';
import ResCard from './ResCard';
import StoreItemCard from './StoreItemCard';
import TabNavigation from './TabNavigation';
import firebaseApp from "../config";


const SearchPage = ({ route }) => {
    const userAddress = useSelector((state) => state.userLocationReducer.address)
    const [restaurants, setRestaurants] = useState()
    const [stores, setStore] = useState()
    const FetchRestaurants = firebaseApp.firestore().collection("Restaurants")
    const FetchStore = firebaseApp.firestore().collection("Store")

    const onlyRes = route.params?.onlyRes
    const navigation = useNavigation()
    var searchResult = []
    var storeSearchResult = []
    const date = new Date
    var searchLoading = false
    var search = false

    const [searchValue, setSearchValue] = useState()


    useEffect(() => {

        (async () => {

            FetchRestaurants.orderBy("Ranking").onSnapshot(res => {
                setRestaurants(
                    res.docs.map((restaurant) => (
                        restaurant.data()
                        
                    ))
                )
            })



            FetchStore.onSnapshot(res => {
                setStore(
                    res.docs.map((restaurant) => (
                        restaurant.data()
                        

                    ))
                )
            })



        }
        )
            ()


    }, [userAddress])

    if (restaurants !== undefined || stores !== undefined) {

        searchLoading = true
        restaurants?.forEach((restaurant) => {
            var result
            result = restaurant?.RestaurantTag?.search(searchValue)

            if (result !== -1) {

                searchResult.push(restaurant)
            }

        })



        stores?.forEach((store) => {
            var result

            store?.ShopItems?.forEach((item) => {
                result = item?.tags?.search(searchValue)
                if (result !== -1 && result !== undefined) {

                    storeSearchResult.push(item)
                }

            })
            searchLoading = false


        })
    }

    // console.log("j")


    return (
        
        (restaurants===undefined || stores===undefined) ? 
            <>
                    <IosStatusBar />
                    <View style={{ width: "100%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                        <ActivityIndicator size={24} color="#f5220f" />
                    </View>
                </>
                :
                <>
            <IosStatusBar />
            <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

            </View>
            <View style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 10, height: 60, backgroundColor: 'transparent' }}>
                <View style={

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
                    <TextInput

                        autoFocus={true}
                        onChangeText={(value) => setSearchValue(value.toLowerCase())}

                        style={

                            { width: "90%", height: 35, fontSize: 14, fontWeight: "300" }} placeholder={onlyRes ? "Search for restaurant or dish" : "Search for restaurant, dishe or item"} />
                    <FontAwesome name="search" size={23} color="#f5220f" style={

                        { height: 35, paddingTop: 3 }} />
                </View>
            </View>
            <ScrollView>


                <Text style={{ fontSize: 24, fontWeight: '300', paddingHorizontal: 10, marginTop: 20 }}>Search<Text style={{ color: "#f5220f", fontWeight: "500" }}> Result({onlyRes ? searchResult?.length : searchResult?.length + storeSearchResult?.length})</Text></Text>

                { ( (onlyRes ? searchResult?.length : searchResult?.length + storeSearchResult?.length) == 0) ?  
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

                                    <TouchableOpacity activeOpacity={0.9} disabled={(restaurant?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || restaurant?.Isopen === false) ? true : false} key={index} onPress={() => navigation.navigate('RestaurantDetail', {
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
                                            shopOpen={restaurant?.ShopOpen}
                                            isopen={restaurant?.Isopen}
                                        />
                                    </TouchableOpacity>


                                ))}


                                {searchResult.map((restaurant, index) => (

                                    <TouchableOpacity activeOpacity={0.9} disabled={(restaurant?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || restaurant?.Isopen === false) ? true : false} key={index} onPress={() => navigation.navigate('RestaurantDetail', {
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
                                            shopOpen={restaurant?.ShopOpen}
                                            isopen={restaurant?.Isopen}
                                        />
                                    </TouchableOpacity>


                                ))}

                                <View style={

                                    { display: "flex", flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: "wrap", width: "100%", paddingBottom: Platform.OS === 'android' ? 100 : 120, }

                                }>
                                    {
                                        storeSearchResult?.map((item, index) => (
                                            <StoreItemCard
                                                key={index}
                                                RPrice={item?.RPrice}
                                                SPrice={item?.SPrice}
                                                category={item?.category}
                                                description={item?.description}
                                                id={item?.id}
                                                img={item?.img}
                                                isVeg={item?.isVeg}
                                                name={item?.name}
                                                rating={item?.rating}
                                                size={item?.size}
                                                tags={item?.tags}

                                                ShopAddress={stores?.[0].ShopAddress}
                                                ShopId={stores?.[0].ShopId}
                                                ShopLocation={stores?.[0].ShopLocation}
                                                ShopName={stores?.[0].ShopName}
                                                ShopNumber={stores?.[0].ShopNumber}
                                                ShopRating={stores?.[0].ShopRating}
                                                ShopTags={stores?.[0].ShopTags}
                                                isAval={item?.isAval}
                                            />
                                        ))
                                    }
                                </View>

                            </View>



                        </View>
                }

            </ScrollView>
            <TabNavigation />
        </>

    )
}

export default SearchPage