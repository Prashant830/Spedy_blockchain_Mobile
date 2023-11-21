import { FontAwesome, Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebaseApp from '../config';
import CategoryCard from './CategoryCard';
import { StoreCategory } from './Db';
import IosStatusBar from './IosStatusBar';
import StoreItemCard from './StoreItemCard';
import TabNavigation from './TabNavigation';

const Store = () => {
    const FetchStore = firebaseApp.firestore().collection("Store")
    const navigation = useNavigation()
    const [store, setStore] = useState()


    const [isInternet, setIsInternet] = useState(true)
    const [isStoreOpen, setIsStoreOpen] = useState(true)



    useEffect(() => {
        const internet = NetInfo.fetch().then(state => {
            setIsInternet(state?.isConnected)


        }).catch((err) => {
            alert(err)
        })



    }, [])

    useEffect(() => {

        (async () => {

            FetchStore.onSnapshot(res => {
                setStore(
                    res.docs.map((restaurant) => (
                        restaurant.data()
                    ))
                )
            })


            firebaseApp.firestore().collection("AppStatus").doc("SpedyAppStatus").onSnapshot((res) => {
                setIsStoreOpen(res.data().storeStatus)
            })


        }
        )
            ()


    }, [])



console.log(isStoreOpen)


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
            isStoreOpen === false ?
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
                    <Text style={{ fontSize: 12 }}>Store is Close At this time.</Text>

                </View>
                <TabNavigation isStore={true} />
            </>
            :
            store?.[0]?.ShopItems?.length === undefined ?
                <>
                    <IosStatusBar />
                    <View style={{ width: "100%", height: "100%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                        <ActivityIndicator size={24} color="#f5220f" />
                    </View>
                </>
                :
                <>
                    <IosStatusBar />

                    <ScrollView>
                        <View style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    navigation.navigate("StoreSearchPage", {
                                        stores: store
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
                                    <Text style={{ color: "lightgray" }}>Search for namkeen, softdrink or more</Text>
                                </View>

                                <FontAwesome name="search" size={23} color="#f5220f" style={

                                    { height: 35, paddingTop: 3 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "90%", flexWrap: 'wrap' }}>

                                {StoreCategory.map(({ name }, index) => (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        key={index}
                                        onPress={() => {
                                            navigation.navigate("StoreCategoryClicked", {
                                                stores: store,
                                                name: { name }

                                            })
                                        }}
                                    >
                                        <CategoryCard name={name} key={name} />
                                    </TouchableOpacity>
                                ))}
                            </View>

                        </View>
                        <Text style={{
                            paddingHorizontal: 10,
                            fontSize: 26,
                            fontWeight: '500',
                            marginTop: 20
                        }}>Spedy <Text style={{ color: "#f5220f", fontWeight: "700" }}>Store</Text></Text>

                        <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: "wrap", width: "100%", paddingBottom: Platform.OS === 'android' ? 100 : 120, }}>
                            {
                                store?.[0]?.ShopItems?.map((item, index) => (
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
                                        isAval={item?.isAval}
                                        ShopAddress={store?.[0].ShopAddress}
                                        ShopId={store?.[0].ShopId}
                                        ShopLocation={store?.[0].ShopLocation}
                                        ShopName={store?.[0].ShopName}
                                        ShopNumber={store?.[0].ShopNumber}
                                        ShopRating={store?.[0].ShopRating}
                                        ShopTags={store?.[0].ShopTags}
                                    />
                                ))
                            }
                        </View>
                    </ScrollView>

                    <TabNavigation isStore={true} />
                </>

    )
}

export default Store