import { Entypo, Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ActivityIndicatorBase, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import firebaseApp from '../config';
import IosStatusBar from './IosStatusBar';
import OrderCart from './OrderCart';
import TabNavigation from './TabNavigation';

const Order = () => {
    const db = firebaseApp.firestore()
    const [fetchorders, setFetchorders] = useState([])
    const orders = []
    const navigation = useNavigation()
    const [isInternet, setIsInternet] = useState(true)

    useEffect(() => {
        const internet = NetInfo.fetch().then(state => {
            setIsInternet(state?.isConnected)


        }).catch((err) => {
            alert(err)
        })



    }, [])

    useEffect(() => {
        (async () => {

            db.collection("Orders").orderBy("orderTimestamp", "desc").onSnapshot((res) => {
                setFetchorders(
                    res.docs.map((restaurant) => {

                        if (restaurant.data()?.currentUserNumber === firebaseApp.auth().currentUser.phoneNumber.replace("+91", "") && restaurant.data()?.orderDelivered != true) {

                            return restaurant.data()
                        }

                    }

                    )
                )
            })

        })

            ()

    }, [])




    if (fetchorders !== undefined) {
        fetchorders.forEach((res) => {
            if (res !== undefined) {
                orders.push(res)
            }
        })
    }






    // console.log(fetchorders)
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
            orders === undefined ?
                <>
                    {/* <View style={

                        { width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                        <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>

                    </View> */}
                    <View style={{ width: "100%", height: "80%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                        <ActivityIndicator size={24} color="#f5220f" />
                    </View>
                </>
                :
                orders?.length === 0 ?
                    <>
                        <IosStatusBar />
                        {/* <View style={

                            { width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                            <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={30} color="#fff" />
                            </TouchableOpacity>

                        </View> */}
                        <View style={{ width: "100%", height: "80%", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../assets/images/OrderPage.jpg')} resizeMode='cover' style={{
                                    height: 200,
                                    width: 200
                                }} />
                                <Text style={{ fontWeight: "500" }}>Looks Nothing Ordred</Text>
                            </View>
                        </View>
                        <TabNavigation isOrder={true} />
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
                        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                            <Text style={{ fontSize: 22, fontWeight: '300', paddingHorizontal: 10, marginTop: 20, marginBottom: 10 }}>Your <Text style={{ fontWeight: "500", color: "#f5220f" }}>Orders</Text></Text>

                            <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
                                {
                                    orders?.map((order, index) => (
                                        <OrderCart key={index} order={order} />
                                    ))
                                }
                            </View>


                        </ScrollView>
                        <TabNavigation isOrder={true} />
                    </>
    )
}

export default Order