
import React, { useEffect, useLayoutEffect } from 'react';

import { Image, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';


import style from './CSS';


const SplashScreen = ({ getPermission }) => {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'ADD_PERMISSION',
            payload: getPermission
        })
    }, [])


    return (
        <View style={style.SplaceScreenContainer}>

            <Image source={require('../assets/images/Spedy_Logo.png')} style={{
                height: 150,
                width: 300,



            }} />
            <Text style={style.text}>Spedy</Text>

            <View style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                position: "absolute",
                bottom: 70
            }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#fff",
                    marginRight: 5
                }}>Made in India</Text>
                <Image source={require('../assets/images/flag.png')} style={{ width: 25, height: 20 }} />
            </View>



        </View>
    )


}



export default SplashScreen