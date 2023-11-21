import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import IosStatusBar from './IosStatusBar';
import ResCard from './ResCard';
import StoreItemCard from './StoreItemCard';
import TabNavigation from './TabNavigation';

const StoreCategoryClicked = ({ route }) => {

    const stores = route.params?.stores
    const name = route.params?.name
    const navigation = useNavigation()
    var searchResult = []
    var searchLoading = false
    const searchValue = name.name.toLowerCase();



    if (stores !== undefined) {
        searchLoading = true
        var result

        stores?.forEach((store) => {
            var result

            store?.ShopItems?.forEach((item) => {
                result = item?.tags?.search(searchValue)
                if (result !== -1 && result !== undefined) {

                    searchResult.push(item)
                }

            })


        })


        searchLoading = false
    }

    // console.log(searchResult)
    return (
        <>
            <IosStatusBar />
            <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

            </View>

            <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff", }}>


                <Text style={{ fontSize: 24, fontWeight: '300', paddingHorizontal: 10, marginTop: 20, backgroundColor: '#fff' }}>Store Category<Text style={{ color: "#f5220f", fontWeight: "500", backgroundColor: '#fff' }}> Result({searchResult.length})</Text></Text>

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
                            <View style={{ marginTop: 10, width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                <ActivityIndicator size={24} color="#f5220f" />
                            </View>
                            :

                            <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: "wrap", width: "100%", paddingBottom: Platform.OS === 'android' ? 100 : 120, backgroundColor: "#fff" }}>
                                {
                                    searchResult?.map((item, index) => (
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
                }

            </ScrollView>
            <TabNavigation />
        </>

    )
}

export default StoreCategoryClicked