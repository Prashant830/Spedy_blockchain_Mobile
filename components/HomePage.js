
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Location from 'expo-location';
import haversine from "haversine";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    InteractionManager,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput, TouchableOpacity,FlatList, View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import firebaseApp from "../config";
import CategoryCard from "./CategoryCard";
import { category, images, shop } from "./Db";
import Header from "./Header";
import IosStatusBar from "./IosStatusBar";
import NotAvailable from './NotAvailable';
import ResCard from "./ResCard";
import TabNavigation from "./TabNavigation";
import { FlashList } from "@shopify/flash-list";


const HomePage = ({ getPermission, userLocation, userAdd }) => {
    const version = Constants.manifest.version
    const dispatch = useDispatch()
    const Height = Dimensions.get('screen').height
    const [restaurants, setRestaurants] = useState()
    const [store, setStore] = useState()
    var restaurantsInRange = []
    const userCoordinates = useSelector((state) => state.userLocationReducer?.location)
    const addressType = useSelector((state) => state.userLocationReducer?.addressType)
    const userAddress = useSelector((state) => state.userLocationReducer?.address)
    const permission = useSelector((state) => state.userLocationReducer?.permission)
    const navigation = useNavigation()
    const FetchRestaurants = firebaseApp.firestore().collection("Restaurants")
    const FetchStore = firebaseApp.firestore().collection("Store")
    const [appStatusText, setAppStatusText] = useState("Spedy is Close Today")
    const [searchFieldValue, setSearchFieldValue] = useState()
    const [searchFieldActive, setSearchFieldActive] = useState(false)
    const [appOpen, setAppOpen] = useState(true)
    const [appUpdate, setAppUpdate] = useState(version)
    const [isInternet, setIsInternet] = useState(true)
    var clickResult = []
    const date = new Date
    const [fixedAppLocation, setFixedAppLocation] = useState()





    useEffect(() => {
        const internet = NetInfo.fetch().then(state => {
            setIsInternet(state?.isConnected)


        }).catch((err) => {
            alert(err)
        })



    }, [])





    useEffect(() => {

        if (userAdd != undefined && addressType === 'current') {
            dispatch({
                type: 'ADD_ADDRESS',
                payload: userAdd,
            })
            dispatch({
                type: 'ADD_LOCATION',
                payload: userLocation,
            })
            dispatch({
                type: 'ADD_PERMISSION',
                payload: getPermission
            })
            dispatch({
                type: 'ADD_ADDRESSTYPE',
                payload: "current"
            })
        }

    }, [userAdd, userAddress])

    // console.log(addressType)



    useEffect(() => {

        (async () => {

            firebaseApp.firestore().collection("AppStatus").doc("SpedyAppStatus").onSnapshot((res) => {
                setAppOpen(res?.data()?.AppOpen)
                setAppUpdate(res?.data()?.AppUpdate)
                setAppStatusText(res?.data()?.AppCloseText)
                setFixedAppLocation(res.data().MainAppLocationLimit)

            })


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


    console.log(fixedAppLocation)


    useEffect(() => {

        const user = firebaseApp.firestore().collection('users').get();
        user.then((data) => {
               data.forEach((res) => {
                       console.log(res.id)
                  })
              })

    }, [userAddress])

    

    restaurants?.forEach((restaurant) => {

        const startPoint = {
            latitude: userCoordinates?.latitude,
            longitude: userCoordinates?.longitude
        }

        const endPoint = {
            latitude: restaurant?.Coordinates?.Latitude,
            longitude: restaurant?.Coordinates?.Longitude
        }

        const distance = haversine(startPoint, endPoint, { unit: "meter" })


        if ((distance / 1000).toFixed(1) <= fixedAppLocation) {

            restaurantsInRange.push(restaurant)

        }
    })

    const OpenPlaystore=()=>{
          Linking.openURL("https://play.google.com/store/apps/details?id=com.spedy.stores&pli=1")
    }



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
                appUpdate !== version ?
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
                            <Text style={{ fontSize: 12 }}>Please Update Your Spedy App From PlayStore</Text>
                            <Text style={{ fontSize: 12 }}>Then Try Again</Text>
                            <TouchableOpacity onPress={()=>OpenPlaystore()} style={{
                                padding:15,
                                borderRadius:10,
                                marginTop:20,
                                width:200,
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                backgroundColor:"#f5220f"
                            }}><Text style={{color:"#fff",fontSize:20,fontWeight:"500"}}>Update</Text></TouchableOpacity>


                        </View>
                    </>
                    :
                    restaurants?.length === undefined || (permission === true && isInternet === true && userAddress?.postalCode === undefined) ?
                        <>
                            <IosStatusBar />
                            <Header delivery={false} />
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

                        // :
                        // restaurantsInRange.length === 0 && permission === true && isInternet === true && userAddress?.postalCode !== undefined ?
                        //     <>
                        //         <IosStatusBar />
                        //         <Header />
                        //         <View
                        //             style={{
                        //                 width: "100%",
                        //                 height: "80%",
                        //                 display: 'flex',
                        //                 alignItems: 'center',
                        //                 justifyContent: 'center'

                        //             }}
                        //         >
                        //             <Image source={require('../assets/images/notavalible.png')} resizeMode="cover" style={{ height: 200, width: 200 }} />
                        //             <Text style={{ fontSize: 12 }}>Spedy is not available in your location yet</Text>
                        //             <Text style={{ fontSize: 12 }}>We will be there soon</Text>
                        //         </View>
                        //     </>
                            :
                            <>
                                <IosStatusBar />
                                <Header />

                                {/* <SafeAreaView style={{ backgroundColor: '#fff', marginBottom: 50 }} className="h-max"> */}
                                <ScrollView showsVerticalScrollIndicator={false} bounces={false} className="h-max" style={{
                                    backgroundColor: "#fff",
                                    marginBottom: -Height + Height + 60,
                                    zIndex: 0,


                                }}>
                                    <View style={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                navigation.navigate("SearchPage")
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
                                                <Text style={{ color: "lightgray" }}>Search for restaurant, dish or item</Text>
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



                                    <View className="flex flex-col w-full">
                                        <Text style={{
                                            marginTop: 15,
                                            marginHorizontal: 5,
                                            fontSize: 24,
                                            fontWeight: "500",
                                            marginBottom: 15

                                        }}>
                                            Spedy <Text style={{
                                                color: "#f5220f",
                                                fontWeight: "700"

                                            }}>Categories</Text>
                                        </Text>
                                    
                            <View style={{ margin: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: "106%", flexWrap: 'wrap' }}>


                                                {category.map(({ name }, index) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        key={index}
                                                        onPress={() => {
                                                            navigation.navigate("CategoryClicked", {
                                                                restaurants: restaurantsInRange?.length > 0 ? restaurantsInRange : restaurants,
                                                                name: { name }

                                                            })
                                                        }}
                                                    >
                                                        <CategoryCard name={name} key={name} />
                                                    </TouchableOpacity>
                                                ))}

                                </View>
                             </View>
                                    </View>

                                    <View
                                        className="shadow-md mb-5 mt-5 flex items-center w-max"
                                        style={{ overflow: "hidden", background: '#ffff' }}
                                    >
                                        <ScrollView

                                            horizontal={true}

                                            showsHorizontalScrollIndicator={false}
                                            pagingEnabled={true}
                                            bounces={false}
                                            style={{
                                                width: Dimensions.get("window").width,
                                                overflow: "hidden",
                                                backgroundColor: '#ffff'
                                            }}
                                        >
                                            {images.map((item, index) => (
                                                <Image
                                                    source={item}
                                                    className="  ml-0 mr-0"
                                                    style={{ height: 230, backgroundColor: "#ffff", width: Dimensions.get("window").width }}
                                                    key={index}


                                                ></Image>
                                            ))}
                                        </ScrollView>
                                    </View>

                                    <Text

                                        style={{
                                            marginTop: 15,
                                            marginHorizontal: 5,
                                            fontSize: 24,
                                            fontWeight: "500",
                                            marginBottom: 15
                                        }}
                                    >
                                        {restaurantsInRange?.length > 0 ? 'Nearest' : 'Spedy'} <Text style={{
                                            color: "#f5220f",
                                            fontWeight: "700"
                                        }}>Restaurants</Text>
                                    </Text>

                                    <View style={
                                        (restaurantsInRange?.[0]?.Address || restaurants?.[0]?.Address) ?
                                            {
                                                display: "none"
                                            }
                                            :
                                            {
                                                width: "100%",
                                                height: "10%",
                                                paddingBottom: Platform.OS === 'android' ? 30 : 50,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: 'center'
                                            }
                                    }>
                                        <ActivityIndicator color="#f5220f" />
                                    </View>

                                    <View
                                        style={
                                            (restaurantsInRange?.[0]?.Address || restaurants?.[0]?.Address) ?
                                            {
                                                marginBottom: 0,
                                                marginTop: 0,
                                                marginStart:13,
                                                paddingBottom: Platform.OS === 'android' ? 30 : 50,
                                                display: "flex",
                                            }
                                            :
                                            {
                                                display: "none"
                                            }

                                    }
                                    className="shadow-md h-max"
                                    >
                                        {(userAddress?.country === undefined) &&  <FlashList
                                     
                                     data={restaurantsInRange}
                                     renderItem={({item, index}) =>
                                         (index <= 4) && 
                                         <TouchableOpacity activeOpacity={0.9} disabled={(item?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || item?.Isopen === false) ? true : false} key={item?.Id}
                                         onPress={() => {

                                             navigation.navigate('RestaurantDetail', {
                                                 ownerNumber: item?.OwnerNumber
                                             })
                                         }
                                         } style={{

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
                                         (index <= 4) && 
                                         <TouchableOpacity activeOpacity={0.9} disabled={(item?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || item?.Isopen === false) ? true : false} key={item?.Id}
                                         onPress={() => {

                                             navigation.navigate('RestaurantDetail', {
                                                 ownerNumber: item?.OwnerNumber
                                             })
                                         }
                                         } style={{

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
                                             shopOpen={item?.ShopOpen}
                                             isopen={item?.Isopen}
                                         />
                                     </TouchableOpacity>

                                    }
                                    >
                                    </FlashList>


                                    </View>
  

                        
                                    
                                    {/* <View
                                        style={
                                            (restaurantsInRange?.[0]?.Address || restaurants?.[0]?.Address) ?
                                            {
                                                marginBottom: 0,
                                                marginTop: 0,
                                                marginStart:13,
                                                paddingBottom: Platform.OS === 'android' ? 30 : 50,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                                
                                            }
                                            :
                                            {
                                                display: "none"
                                            }

                                    }
                                    className="shadow-md h-max"
                                    >
                                

                               
                                    <FlashList
                                     
                                     data={restaurantsInRange}
                                     renderItem={({item, index}) =>
                                         (index <= 4) && 
                                         <TouchableOpacity activeOpacity={0.9} disabled={(item?.ShopOpen?.search(date?.getDay()?.toString()) === -1 || item?.Isopen === false) ? true : false} key={item?.Id}
                                         onPress={() => {

                                             navigation.navigate('RestaurantDetail', {
                                                 ownerNumber: item?.OwnerNumber
                                             })
                                         }
                                         } style={{

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
                                             shopOpen={item?.ShopOpen}
                                             isopen={item?.Isopen}
                                         />
                                     </TouchableOpacity>

                                    }
                                    estimatedItemSize={20}

                                    >
                                    </FlashList>

                                    </View> */}

                                </ScrollView>


                                <TabNavigation isHomePage={true} />
                            </>



    );
};

export default HomePage;