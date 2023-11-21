import { AntDesign, Entypo } from '@expo/vector-icons';
import haversine from 'haversine';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const OrderCart = ({ order }) => {
    const [fullOrder, setFullOrder] = useState(false)
    const [fullOrderStatus, setFullOrderStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [disfromusertores, setDisfromusertores] = useState()
    const userLocation = useSelector((state) => state.userLocationReducer.location)
    useEffect(() => {
        (async () => {

            const startPoint = {
                latitude: userLocation?.latitude,
                longitude: userLocation?.longitude
            }

            const endPoint = {
                latitude: order?.deliveryBoyLat === null ? undefined : order?.deliveryBoyLat,
                longitude: order?.deliveryBoyLong === null ? undefined : order?.deliveryBoyLong
            }

            const distance = haversine(startPoint, endPoint, { unit: "meter" })


            setDisfromusertores((distance / 1000).toFixed(1))
        })
            ()

    }, [order])



    return (
        <View style={{ marginTop: 20, borderRadius: 10, backgroundColor: "#fff", paddingVertical: 5, borderWidth: 1, borderColor: "#f5220f", paddingHorizontal: 10, paddingBottom: 20 }}>
            <Text style={{ paddingHorizontal: 5, fontSize: 10, fontWeight: '300', marginTop: 5, width: "100%", textAlign: 'right' }}>{order?.orderid}</Text>
            <Text style={{ paddingHorizontal: 5, fontSize: 24, fontWeight: '300', marginTop: 5 }}>{order?.name}</Text>
            <Text style={{ paddingHorizontal: 5, fontSize: 12, fontWeight: '300', marginTop: 5 }}>+91{order?.number}</Text>
            <Text style={{ paddingHorizontal: 5, fontSize: 12, fontWeight: '300', width: "89%", marginTop: 5 }}>{order?.address}</Text>
            <Text style={{ paddingHorizontal: 5, fontSize: 12, fontWeight: '300', marginTop: 5 }}>Order Amount: wei {order?.orderAmount}</Text>
            <Text style={{ paddingHorizontal: 5, fontSize: 12, fontWeight: '300', marginTop: 5 }}>Order On: {order?.orderDate}</Text>
            <Text style={{ paddingHorizontal: 5, fontSize: 12, fontWeight: '300', marginTop: 5 }}>Payment Mode: {order?.paymentOption}</Text>
            <Text style={{ paddingHorizontal: 5, fontSize: 15, fontWeight: '300', position: 'absolute', bottom: 3, right: 5, color: "#f5220f" }}>Order OTP: <Text style={{ fontSize: 15, color: "#f5220f" }}>{order?.orderCode}</Text></Text>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    if (fullOrder === true) {
                        setFullOrder(false)
                    }
                    else {
                        setFullOrder(true)
                    }
                }} style={{ display: 'flex', flexDirection: "row", alignItems: 'center', paddingHorizontal: 5, marginTop: 5, width: "100%" }}>
                <Text style={{ fontSize: 12, fontWeight: '300', flex: 1 }}>Order Items: {order?.cart?.length} </Text>
                {
                    fullOrder ?
                        <Entypo name="chevron-small-up" size={24} color="#f5220f" style={{ opacity: 1 }} />
                        :
                        <Entypo name="chevron-small-down" size={24} color="#f5220f" style={{ opacity: 1 }} />
                }
            </TouchableOpacity>
            {
                fullOrder &&
                <View>
                    <Text style={{ fontSize: 22, fontWeight: "300", paddingHorizontal: 10 }}>Cart <Text style={{ color: "#f5220f", fontWeight: "500" }}>Items</Text></Text>
                    {
                        order?.cart?.map((item, index) => (
                            <View key={index} style={{
                                display: 'flex',
                                flexDirection: "row",
                                paddingHorizontal: 20,
                                borderBottomWidth: 0.5,
                                borderColor: "lightgrey",
                                paddingBottom: 10,
                                marginBottom: 20,
                                overflow: 'hidden',
                                alignItems: 'center',
                                marginTop: 10
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



                            </View>
                        ))
                    }
                </View>
            }
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    if (fullOrderStatus === true) {
                        setFullOrderStatus(false)
                    }
                    else {
                        setFullOrderStatus(true)
                    }
                }} style={{ display: 'flex', flexDirection: "row", alignItems: 'center', paddingHorizontal: 5, marginTop: 5, width: "100%", marginBottom: fullOrderStatus ? 5 : 5 }}>
                <Text style={{ fontSize: 12, fontWeight: '300', flex: 1 }}>Order Status: {order?.activeOrderDetail} </Text>
                {
                    fullOrderStatus ?
                        <Entypo name="chevron-small-up" size={24} color="#f5220f" style={{ opacity: 1 }} />
                        :
                        <Entypo name="chevron-small-down" size={24} color="#f5220f" style={{ opacity: 1 }} />
                }
            </TouchableOpacity>
            {
                fullOrderStatus &&
                <View style={{ borderBottomWidth: 0.7, borderColor: "lightgray", paddingVertical: 5, marginBottom: 5 }}>
                    <Text style={{ fontSize: 22, fontWeight: "300", paddingHorizontal: 10 }}>Order <Text style={{ color: "#f5220f", fontWeight: "500" }}>Details</Text></Text>
                    <View style={
                        { display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }
                    }>
                        <Text
                            style={{
                                color: (order?.orderProcessing === false && order?.activeOrderDetail !== "Processing") ? "lightgray" : "black",
                                fontSize: 14,
                                fontWeight: "500",
                                flex: 1
                            }}
                        >Order Processing</Text>
                        {
                            (order?.activeOrderDetail === "Processing") &&
                            <ActivityIndicator size={14} color="#f5220f" />
                        }
                        {
                            (order?.orderProcessing) &&
                            <AntDesign name="checkcircle" size={14} color="#f5220f" />
                        }

                    </View>

                    <View style={
                        { display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }
                    }>
                        <Text
                            style={{
                                color: (order?.orderPreparing === false && order?.activeOrderDetail !== "Preparing") ? "lightgray" : "black",
                                fontSize: 14,
                                fontWeight: "500",
                                flex: 1
                            }}
                        >Order Preparing</Text>
                        {
                            (order?.activeOrderDetail === "Preparing") &&
                            <ActivityIndicator size={14} color="#f5220f" />
                        }
                        {
                            (order?.orderPreparing) &&
                            <AntDesign name="checkcircle" size={14} color="#f5220f" />
                        }

                    </View>

                    <View style={
                        { display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }
                    }>
                        <Text
                            style={{
                                color: (order?.orderPickup === false && order?.activeOrderDetail !== "Out For Delivery") ? "lightgray" : "black",
                                fontSize: 14,
                                fontWeight: "500",
                                flex: 1
                            }}
                        >Out For Delivery</Text>
                        {
                            (order?.activeOrderDetail === "Out For Delivery") &&
                            <ActivityIndicator size={14} color="#f5220f" />
                        }
                        {
                            (order?.orderPickup) &&
                            <AntDesign name="checkcircle" size={14} color="#f5220f" />
                        }

                    </View>

                    <View style={
                        { display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }
                    }>
                        <Text
                            style={{
                                color: (order?.orderDelivered === false && order?.activeOrderDetail !== "Delivered") ? "lightgray" : "black",
                                fontSize: 14,
                                fontWeight: "500",
                                flex: 1
                            }}
                        >Order Delivered</Text>
                        {
                            (order?.activeOrderDetail === "Delivered") &&
                            <ActivityIndicator size={14} color="#f5220f" />
                        }
                        {
                            (order?.orderDelivered) &&
                            <AntDesign name="checkcircle" size={14} color="#f5220f" />
                        }

                    </View>

                </View>
            }

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    if (Platform.OS !== 'android') {
                        Linking.openURL(`telprompt:${order?.deliveryBoyNumber}`);
                    }
                    else {
                        Linking.openURL(`tel:${order?.deliveryBoyNumber}`);
                    }
                }}
                style={
                    order?.deliveryBoyNumber && order?.deliveryBoyNumber !== null ?
                        { paddingHorizontal: 5, fontSize: 12, fontWeight: '300', marginTop: 5 }
                        :
                        {
                            display: "none"
                        }
                }><Text style={{ fontSize: 12, fontWeight: '300', marginTop: 0, color: "#f5220f", marginBottom: 20 }}>Delivery Boy Number: {order?.deliveryBoyNumber}</Text></TouchableOpacity>
            <Text style={
                disfromusertores !== undefined && disfromusertores !== String(NaN) && !order?.orderDelivered ?
                    { fontSize: 12, fontWeight: '300', marginTop: 5, position: 'absolute', bottom: 5, left: 10, color: "#f5220f" }
                    :
                    {
                        display: 'none'
                    }
            }>{disfromusertores >= 5 ? `${disfromusertores} km 20 min` : disfromusertores < 5 && disfromusertores > 2 ? `${disfromusertores} km 10 min` : disfromusertores <= 2 && disfromusertores > 1 ? `${disfromusertores} km 5 min` : `${disfromusertores} km 2 min`}</Text>
        </View>
    )
}

export default OrderCart