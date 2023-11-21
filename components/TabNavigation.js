import { Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import React, { memo } from 'react';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const TabNavigation = ({ isHomePage, isStore, isRestaurants, isCart, isOrder }) => {
    const cart = useSelector((state) => state.CartReducer.cart)
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: 'white', width: Dimensions.get('window').width, height: Platform.OS === 'android' ? 60 : 80, position: 'absolute', bottom: 0, borderTopWidth: 1, borderTopColor: 'lightgray', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', }} >
            <View style={{ display: 'flex', flexDirection: 'row', width: Dimensions.get('window').width - 50, justifyContent: 'space-between' }}>

                <TouchableOpacity onPress={() => navigation.replace('SplashToHomePage')}>
                    <Octicons name="home" size={30} style={{ color: isHomePage ? "#f5220f" : "black" }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace('Store')}>
                    <MaterialCommunityIcons name="store-outline" size={30} style={{ color: isStore ? "#f5220f" : "black" }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace('Restaurants')}>
                    <Ionicons name="restaurant-outline" size={29} style={{ color: isRestaurants ? "#f5220f" : "black" }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace('Cart')} style={{ display: "flex", alignItems: 'center' }}>
                    <Text style={{ position: 'absolute', bottom: 25, fontSize: 15, color: "#f5220f" }}>{cart?.length === 0 ? "" : cart?.length}</Text>
                    <Ionicons name="cart-outline" size={30} style={{ color: isCart ? "#f5220f" : "black" }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.replace('Order')}>
                    <MaterialIcons name="delivery-dining" size={30} style={{ color: isOrder ? "#f5220f" : "black" }} />
                </TouchableOpacity>




            </View>
        </View >
    )
}

export default TabNavigation