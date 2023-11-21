import { Entypo, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, ActivityIndicatorBase, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

const StoreItemCard = ({ name, img, RPrice, SPrice, category, description, id, isVeg, rating, size, tags, ShopAddress, ShopId, ShopLocation, ShopName, ShopNumber, ShopRating, ShopTags, isAval }) => {
    const [qtyValue, setQtyValue] = useState(1)
    const [isImageLoading, setIsImageLoading] = useState(true)
    var RPricee = qtyValue * RPrice
    var totalPrice = qtyValue * SPrice
    const dispatch = useDispatch()
    const [pop, setPop] = useState(false)


    const AddToCart = async () => {



        dispatch({
            type: "ADD_TO_CART",
            payload: {
                category: category || null,
                description: description || null,
                id: id || null,
                name: name || null,
                tags: tags || null,
                img: img || null,
                isVeg: isVeg || null,
                size: size || null,
                rating: rating || null,
                ShopName: ShopName || null,
                ShopNumber: ShopNumber || null,
                ShopAddress: ShopAddress || null,
                ShopLocation: ShopLocation || null,
                qty: qtyValue || null,
                price: totalPrice || null,
                RPrice: RPricee || null,

            }
        })
        setPop(true)
        setTimeout(() => {
            setPop(false)
        }, 1000)


    }



    return (
        <View>
            <View
                style={
                    isAval === false ?
                        {
                            display: 'flex',
                            position: 'absolute',
                            top: "20%",
                            left: "25%",
                            opacity: 1,
                            zIndex: 2,
                            color: "#f5220f",
                            flexDirection: 'column',
                            alignItems: "center"

                        }
                        :
                        {
                            display: 'none'
                        }
                }
            >
                <Text style={{ fontSize: 12 }}>
                    Currently
                </Text>

                <Text style={{ fontSize: 12 }}>
                    Unavailable
                </Text>

            </View>
            <View style={{ width: 150, marginTop: 20, display: "flex", alignItems: 'center', paddingHorizontal: 5, opacity: isAval === false ? 0.3 : 1 }}>

                <View style={
                    isImageLoading ?
                        { width: 125, height: 106, display: "flex", alignItems: "center", justifyContent: "center" }
                        : { display: 'none' }
                }>
                    <ActivityIndicator size={20} color="#f5220f" />
                </View>
                <Image style={
                    isImageLoading ?
                        {
                            height: 1,
                            width: 1
                        }
                        :
                        { width: 125, height: 125 }
                } resizeMode='cover' source={{ uri: img }} onLoadEnd={() => setIsImageLoading(false)} />
                <Text style={{ fontWeight: '500', marginTop: 10, fontSize: 13, width: "100%", overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}>{name}</Text>
                <Text style={{ marginTop: 5, width: "100%" }}>
                    {Array(rating).fill().map((_, i) => (
                        <Entypo name='star' size={15} color="gold" key={i} />
                    ))}

                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: "100%" }}>
                    <Text style={{ fontWeight: '500', marginTop: 5 }}>wei {SPrice} </Text>
                    <Text style={{ fontWeight: '300', fontSize: 12, marginTop: 5 }}>({size})</Text>
                </View>

                <View style={{ width: "100%" }}>
                    <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', width: 50, marginTop: 5, marginLeft: 5, paddingHorizontal: 5, alignItems: 'center' }}>
                        <TouchableOpacity disabled={isAval === false ? true : false} onPress={() => { if (qtyValue > 1) { setQtyValue(qtyValue - 1) } }}>
                            <Feather name="minus-circle" size={20} color="#f5220f" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, color: "#f5220f", marginLeft: 5, marginRight: 5 }}>{qtyValue}</Text>
                        <TouchableOpacity disabled={isAval === false ? true : false} onPress={() => setQtyValue(qtyValue + 1)}>
                            <Feather name="plus-circle" size={20} color="#f5220f" />
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <TouchableOpacity disabled={isAval === false ? true : false} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: "#f5220f", padding: 10, borderRadius: 10 }}
                        onPress={() => AddToCart()}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: "#fff" }}>{pop ? "Added to Cart" : `ADD  wei ${totalPrice}`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default StoreItemCard