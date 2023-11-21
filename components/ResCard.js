import { Entypo } from '@expo/vector-icons';
import haversine from "haversine";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, SafeAreaView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import style from './CSS';

const ResCard = ({ img, name, shopid, address, rating, location, shopOpen, isopen }) => {
    const userLocation = useSelector((state) => state.userLocationReducer.location)
    const userAddress = useSelector((state) => state.userLocationReducer.address)
    const date = new Date
    const [imgLoading, setImgLoading] = useState(true)
    const [disfromusertores, setDisfromusertores] = useState(null)

    useEffect(() => {
        (async () => {

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

    }, [userLocation])



    return (

        <>

            {/* <Text style={{ position: 'absolute', top: "50%", zIndex: 2, fontSize: 20, color: "#fff", }}>Shop is currently closed</Text> */}
            <View style={{

                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                width: Dimensions.get('window').width - 25,
                height: 250,

                alignItems: 'center',
                justifyContent: 'center',
                overflow: "hidden",
                // borderWidth: 2,
                borderColor: "#f5220f",
                borderRadius: 10,
                elevation: 10,
                shadowOffset: { width: 5, height: 5 },
                shadowColor: 'black',
                shadowOpacity: .8,
                shadowRadius: 1,

            }} className="flex flex-col h-min flex-wrap" >
                <Text style={
                    imgLoading ?
                        {
                            display: 'none'
                        }
                        :
                        (shopOpen?.search(date?.getDay()?.toString()) === -1 || isopen === false) ?
                            { color: '#f5220f', position: 'absolute', top: "40%", opacity: 1, fontSize: 24, zIndex: 2, fontWeight: "500" }
                            :

                            {
                                display: 'none'
                            }
                }>Currently Closed</Text>

                <View style={
                    imgLoading ?
                        {
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }
                        :
                        {
                            display: "none"
                        }
                }>
                    <ActivityIndicator color="#f5220f" />
                </View>
                <Image source={{ uri: img }} style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    opacity: (shopOpen?.search(date?.getDay()?.toString()) === -1 || isopen === false) ? 0.3 : 1,
                }}
                    onLoadEnd={() => setImgLoading(false)}
                />

                <Text style={
                    imgLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
                            position: "absolute",
                            bottom: 40,
                            width: "100%",
                            paddingHorizontal: 10,
                            fontSize: 26,
                            fontWeight: "500",
                            color: "white"
                        }}>{name}</Text>

                <Text style={
                    imgLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
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
                <Text style={
                    imgLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
                            position: "absolute",
                            bottom: 10,
                            width: "100%",
                            paddingHorizontal: 10,
                            fontSize: 14,
                            fontWeight: "300",
                            color: "white"
                        }}>{address}</Text>
                <Text style={
                    imgLoading ?
                        {
                            display: "none"
                        }
                        :
                        {
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
        </>


    )
}

export default ResCard