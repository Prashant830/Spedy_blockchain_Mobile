import { AntDesign, Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';


const DishCard = ({ category, description, id, name, tags, img, isVeg, quantity, rating, ShopName, ShopAddress, ShopNumber, Shopid, ShopLocation, isShopOpen, isAvailable }) => {

    const dispatch = useDispatch()

    const Price = quantity ? quantity[0]?.SPrice : "";

    const [isLoading, setIsLoading] = useState(true)
    const [AddItem, setAddItem] = useState(false)
    const [qtyValue, setQtyValue] = useState(1)
    const [itemIndex, setItemIndex] = useState(0)
    const [itemSize, setitemSize] = useState(quantity?.[0]?.Qty)
    const [itemPrice, setitemPrice] = useState(quantity?.[0]?.SPrice)
    const [pop, setPop] = useState(false)
    const [itemRPrice, setItemRPrice] = useState(quantity?.[0]?.RPrice)
    // const [totalPrice, setTotalPrice] = useState()
    var RPrice = itemRPrice * qtyValue
    var totalPrice = itemPrice * qtyValue

    // console.log(itemSize, itemPrice, qtyValue)







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
                size: itemSize || null,
                rating: rating || null,
                ShopName: ShopName || null,
                ShopNumber: ShopNumber || null,
                ShopAddress: ShopAddress || null,
                ShopLocation: ShopLocation || null,
                ShopId: Shopid || null,
                qty: qtyValue || null,
                price: totalPrice || null,
                Quantity: quantity || null,
                RPrice: RPrice || null
            }



        })

        setPop(true)

        setTimeout(() => {
            setPop(false)
        }, 1000)


    }




    return (

        <>
            <View style={

                {
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderColor: "lightgrey",
                    paddingBottom: 10,
                    marginBottom: 20,
                    overflow: 'hidden',

                }
            }>
                <View
                    style={
                        isAvailable === false ?
                            {
                                display: 'flex',
                                position: 'absolute',
                                top: "35%",
                                left: 15,
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
                <TouchableOpacity
                    disabled={isAvailable === false ? true : false}
                    activeOpacity={0.9}
                    onPress={() => {
                        if (AddItem) {
                            setAddItem(false)
                        }
                        else {
                            setAddItem(true)
                        }
                    }}
                    style={{
                        opacity: isAvailable === false ? 0.3 : 1,
                        width: "100%",
                        overflow: "hidden",
                        flexDirection: 'row',
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
                            source={{ uri: img }}
                            onLoadEnd={() => setIsLoading(false)}
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "cover",

                            }} />

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
                                    paddingLeft: 10
                                }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 5, width: 200, overflow: "hidden" }}>{name}</Text>
                        <Text style={{ marginTop: 5, width: "100%" }}>
                            {Array(rating).fill().map((_, i) => (
                                <Entypo name='star' size={16} color="gold" key={i} />
                            ))}

                        </Text>
                        <Text style={{ marginTop: 5 }}>wei {Price}</Text>
                        <Text style={{ marginTop: 5, fontSize: 12, width: 200, overflow: 'hidden' }}>{description}</Text>

                    </View>
                    <View style={{ position: "absolute", top: 10, right: 10 }}>
                        {
                            AddItem ?
                                <AntDesign name="up" size={15} color="#f5220f" />
                                :
                                <AntDesign name="down" size={15} color="#f5220f" />
                        }

                    </View>
                </TouchableOpacity>

                <View style={
                    AddItem ?
                        {
                            width: "100%",



                        }
                        :
                        {
                            display: "none"
                        }
                }>


                    <View style={{
                        backgroundColor: "#fff",

                    }}>

                        <View style={{ display: 'flex', flexDirection: 'column', padding: 10, marginBottom: 10, marginTop: 10 }}>

                            <Text style={{ fontSize: 15, fontWeight: "500" }}>Qty</Text>
                            <View style={{ display: "flex", flexDirection: 'row', borderWidth: 1, borderColor: "#f5220f", paddingVertical: 10, alignItems: 'center', borderRadius: 10, width: 100, marginTop: 20, marginLeft: 10, justifyContent: 'center', paddingHorizontal: 20 }}>
                                <TouchableOpacity onPress={() => { if (qtyValue > 1) { setQtyValue(qtyValue - 1) } }}>
                                    <Feather name="minus-circle" size={20} color="#f5220f" />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: "#f5220f", marginHorizontal: 10 }}>{qtyValue}</Text>
                                <TouchableOpacity onPress={() => setQtyValue(qtyValue + 1)}>
                                    <Feather name="plus-circle" size={20} color="#f5220f" />
                                </TouchableOpacity>

                            </View>


                        </View>

                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: "500" }}>Size</Text>
                            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                                {
                                    quantity?.map((item, index) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setItemIndex(index)
                                                setitemSize(item?.Qty)
                                                setitemPrice(item?.SPrice)
                                                setItemRPrice(item?.RPrice)

                                            }}
                                            activeOpacity={0.6}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: itemIndex === index ? "#f5220f" : "lightgrey",
                                                borderRadius: 10,
                                                display: 'flex',
                                                flexDirection: "row",
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: 50,
                                                paddingHorizontal: 20,
                                                marginTop: 10
                                            }}
                                            key={index}
                                        >
                                            <Text style={{ fontSize: 16, flex: 1 }}>{item?.Qty}</Text>
                                            <Text>wei {item?.SPrice}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                            <TouchableOpacity activeOpacity={0.8} style={{ width: 200, height: 50, backgroundColor: "#f5220f", borderRadius: 10, display: "flex", alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => AddToCart()}
                            >
                                <Text style={{ color: "#fff", fontSize: 16 }}>{pop ? "Added to Cart" : `ADD  wei ${totalPrice}`}</Text>
                            </TouchableOpacity>
                        </View>



                    </View>

                </View>

            </View>



        </>

    )
}

export default DishCard