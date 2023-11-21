import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import Constants from "expo-constants";
import firebaseApp from '../config';
import AddressCard from './AddressCard';
import IosStatusBar from './IosStatusBar';
import TabNavigation from './TabNavigation';

const PaymentPage = ({ route }) => {
    const version = Constants.manifest.version
    const userCoordinates = useSelector((state) => state.userLocationReducer.location)
    const userAddress = useSelector((state) => state.userLocationReducer.address)
    const db = firebaseApp.firestore()
    const navigation = useNavigation()
    var currentdate = new Date();
    let cart = route.params?.cart
    let PriceTotal = route.params?.PriceTotal
    let DeliveryFee = route.params?.DeliveryFee
    let grandTotal = route.params?.grandTotal

    const [userDetails, setUserDetails] = useState()

    const [Address, setAddress] = useState()
    const [appStatusText, setAppStatusText] = useState("Spedy is Close Today")
    const [Address2, setAddress2] = useState()
    const [selectAddress, setSelectAddress] = useState()
    const [selectAddress1, setSelectAddress1] = useState(false)
    const [selectAddress2, setSelectAddress2] = useState(false)
    const [selectCOD, setselectCOD] = useState(false)
    const [selectPOADS, setselectPOADS] = useState(false)
    const [selectPayment, setSelectPayment] = useState()
    const [errorMsg, setErrorMsg] = useState("")
    const [name, setName] = useState()
    const [number, setNumber] = useState()
    const [houseNo, sethouseNo] = useState()
    const [appOpen, setAppOpen] = useState(true)
    const [area, setArea] = useState()
    const [city, setCity] = useState(userAddress?.city)
    const [state, setState] = useState(userAddress?.region)
    const [pincode, setPincode] = useState(userAddress?.postalCode)
    const [btnLoading, setBtnLoading] = useState(false)
    const [popup, setPopup] = useState(false)
    const [isInternet, setIsInternet] = useState(true)
    const [appUpdate, setAppUpdate] = useState(version)


    var orderCode = Math.floor(1000 + Math.random() * 9000);
    // console.log();

    useEffect(() => {

        firebaseApp.firestore().collection("AppStatus").doc("SpedyAppStatus").onSnapshot((res) => {
            // setAppUpdate(res?.data()?.AppUpdate)
            // setAppOpen(res?.data()?.AppOpen)
           
            // setAppStatusText(res?.data()?.AppCloseText)
            
        })

        const internet = NetInfo.fetch().then(state => {
            setIsInternet(state?.isConnected)


        }).catch((err) => {
            alert(err)
        })



    }, [])

    // console.log(city)




    // console.log(userAddress)

    const fetchAddress = async () => {

        await db.collection("users").doc(firebaseApp.auth().currentUser.phoneNumber).get().then((obj) => {

            setUserDetails(obj?.data())
            setName(obj?.data()?.name)
            setNumber(obj?.data()?.phone_nmber.replace("+91", ""))



        }).catch((err) => console.log(err))



    }

    useEffect(() => {

        fetchAddress()


    }, [])
    // console.log(name, number, houseNo, area, city, state, pincode)
    // console.log(userDetails)

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const orderid = makeid(30)


    const sendOrderDetails = async () => {
        setBtnLoading(true)
        
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
            appOpen === false ?
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
                    <Text style={{ fontSize: 12 }}>{appStatusText}</Text>


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
            popup ?
                <>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%" }}>
                        <View style={{ backgroundColor: "#f5220f", height: 200, width: 200, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
                            <AntDesign name="checkcircle" size={60} color="#fff" />
                            <Text style={{ color: "#fff", fontSize: 24, marginTop: 20, fontWeight: '500' }}>Order Placed</Text>
                        </View>
                    </View>
                </>
                :
                <>
                    <IosStatusBar />
                    <View style={

                        { width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
                        <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} color="#fff" />
                        </TouchableOpacity>

                    </View>

                    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Cart')} style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                            <View style={{
                                backgroundColor: "#fff",
                                width: "90%",
                                borderRadius: 10,
                                padding: 10,
                                borderWidth: 0.5,
                                borderColor: "#f5220f"
                            }}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', width: "100%", alignItems: 'center', paddingHorizontal: 30 }}>
                                    <Text style={{ flex: 1, fontWeight: "300" }}>Cart Items</Text>
                                    <Text style={{ fontWeight: "500" }}>{cart?.length}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', width: "100%", alignItems: 'center', paddingHorizontal: 30, marginTop: 10 }}>
                                    <Text style={{ flex: 1, fontWeight: "300" }}>Total Price</Text>
                                    <Text style={{ fontWeight: "500" }}>wei {PriceTotal}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', width: "100%", alignItems: 'center', paddingHorizontal: 30, marginTop: 10 }}>
                                    <Text style={{ flex: 1, fontWeight: "300" }}>Delivery Fee</Text>
                                    <Text style={{ fontWeight: "500" }}>wei {DeliveryFee}</Text>
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', width: "100%", alignItems: 'center', paddingHorizontal: 30, marginTop: 10 }}>
                                    <Text style={{ flex: 1, fontWeight: "300" }}>Pay</Text>
                                    <Text style={{ fontWeight: "500" }}>wei {grandTotal}</Text>
                                </View>
                                <Entypo name="chevron-small-right" size={24} color="#f5220f" style={{ position: 'absolute', top: '50%', right: 1, opacity: 0.4 }} />

                            </View>
                        </TouchableOpacity>

                        <Text style={{ fontSize: 24, fontWeight: "300", marginTop: 20, paddingHorizontal: 5 }}>Select <Text style={{ fontWeight: '500', color: "#f5220f" }}>Address</Text></Text>
                        {
                            // Address?.name === undefined ?
                            //     <View style={{ width: "100%", height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                            //         {/* <ActivityIndicator color="#f5220f" size={20} /> */}
                            //         <TouchableOpacity style={{ borderWidth: 0.7, borderColor: "lightgray", width: "90%", display: "flex", alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} activeOpacity={0.8} onPress={() => navigation.replace("ProfilePage")}>
                            //             <Text style={{ padding: 20 }}>Click To Set Addres Book</Text>
                            //         </TouchableOpacity>

                            //     </View>
                            //     :
                            //     <View>

                            //         <TouchableOpacity
                            //             activeOpacity={0.8}
                            //             onPress={() => {
                            //                 setSelectAddress1(true)
                            //                 setSelectAddress2(false)
                            //                 setSelectAddress({
                            //                     name: Address?.name,
                            //                     number: Address?.number,
                            //                     fullAddress: Address?.houseNo + " " + Address?.area + " " + Address?.city + " " + Address?.state + ", " + Address?.pincode
                            //                 })
                            //                 if (userAddress?.postalCode === Address?.pincode) {
                            //                     setErrorMsg("")
                            //                 }
                            //                 else {
                            //                     setErrorMsg("Your Current PinCode and Address Pincode not match ")
                            //                 }


                            //             }}
                            //             style={{
                            //                 display: "flex",
                            //                 alignItems: "center",
                            //                 justifyContent: "center",
                            //                 marginTop: 20


                            //             }}>
                            //             <View style={{
                            //                 width: "90%",
                            //                 height: 200,
                            //                 borderWidth: 1,
                            //                 borderColor: selectAddress1 ? "#f5220f" : "lightgrey",
                            //                 borderRadius: 10,
                            //                 backgroundColor: "#fff",


                            //             }}>
                            //                 <View style={{ marginTop: 20, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            //                     <Text style={{ color: selectAddress1 ? "#f5220f" : "black", fontSize: 24, marginLeft: 5, fontWeight: "300" }}>{Address?.name}</Text>
                            //                 </View>
                            //                 <View style={{ marginTop: 50, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>

                            //                     <Text style={{ color: selectAddress1 ? "#f5220f" : "black", fontSize: 16, marginLeft: 5, width: "100%", fontWeight: "200" }}>{Address?.number}</Text>
                            //                 </View>

                            //                 <View style={{ marginTop: 20, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>

                            //                     <Text style={{ color: selectAddress1 ? "#f5220f" : "black", fontSize: 14, marginLeft: 5, marginRight: 5, fontWeight: "200" }}>{Address?.houseNo + " " + Address?.area + " " + Address?.city + " " + Address?.state + ", " + Address?.pincode}</Text>

                            //                 </View>
                            //                 <TouchableOpacity style={{ position: "absolute", top: 5, right: 5 }} onPress={() => navigation.replace('ProfilePage')}>
                            //                     <Feather name="edit" size={24} />
                            //                 </TouchableOpacity>


                            //             </View>
                            //         </TouchableOpacity>

                            //         <TouchableOpacity

                            //             activeOpacity={0.8}
                            //             onPress={() => {
                            //                 setSelectAddress2(true)
                            //                 setSelectAddress1(false)
                            //                 setSelectAddress({
                            //                     name: Address2?.name,
                            //                     number: Address2?.number,
                            //                     fullAddress: Address2?.houseNo + " " + Address2?.area + " " + Address2?.city + " " + Address2?.state + ", " + Address2?.pincode
                            //                 })
                            //                 if (userAddress?.postalCode === Address2?.pincode) {
                            //                     setErrorMsg("")
                            //                 }
                            //                 else {
                            //                     setErrorMsg("Your Current Pincode and Address Pincode not match ")
                            //                 }
                            //             }}
                            //             style={{
                            //                 display: "flex",
                            //                 alignItems: "center",
                            //                 justifyContent: "center",
                            //                 marginTop: 20

                            //             }}>
                            //             <View style={{
                            //                 width: "90%",

                            //                 height: 200,
                            //                 // shadowOffset: { width: 0, height: 10 },
                            //                 // shadowColor: "black",
                            //                 // shadowOpacity: 0.2,
                            //                 // shadowRadius: 3,
                            //                 backgroundColor: "#fff",
                            //                 borderRadius: 10,
                            //                 borderWidth: 1,
                            //                 borderColor: selectAddress2 ? "#f5220f" : "lightgrey"

                            //             }}>
                            //                 <View style={{ marginTop: 20, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            //                     <Text style={{ color: selectAddress2 ? "#f5220f" : "black", fontSize: 24, marginLeft: 5, fontWeight: "300" }}>{Address2?.name}</Text>
                            //                 </View>
                            //                 <View style={{ marginTop: 50, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>

                            //                     <Text style={{ color: selectAddress2 ? "#f5220f" : "black", fontSize: 16, marginLeft: 5, width: "100%", fontWeight: "200" }}>{Address2?.number}</Text>
                            //                 </View>

                            //                 <View style={{ marginTop: 20, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>

                            //                     <Text style={{ color: selectAddress2 ? "#f5220f" : "black", fontSize: 14, marginLeft: 5, marginRight: 5, fontWeight: '200' }}>{Address2?.houseNo + " " + Address2?.area + " " + Address2?.city + " " + Address2?.state + ", " + Address2?.pincode}</Text>

                            //                 </View>
                            //                 <TouchableOpacity style={{ position: "absolute", top: 5, right: 5 }} onPress={() => navigation.replace('ProfilePage')}>
                            //                     <Feather name="edit" size={24} />
                            //                 </TouchableOpacity>

                            //             </View>
                            //         </TouchableOpacity>
                            //     </View>
                        }

                        {
                            userDetails?.name === undefined ?
                                <View style={{ width: "100%", height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
                                    {/* <ActivityIndicator color="#f5220f" size={20} /> */}
                                    <TouchableOpacity style={{ borderWidth: 0.7, borderColor: "lightgray", width: "90%", display: "flex", alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} activeOpacity={0.8} onPress={() => navigation.replace("ProfilePage")}>
                                        <Text style={{ padding: 20 }}>Click To Set Profile</Text>
                                    </TouchableOpacity>

                                </View>
                                :
                                <View style={{ width: "100%", display: 'flex', alignItems: "center", justifyContent: 'center', marginTop: 20 }}>

                                    <TextInput
                                        defaultValue={userDetails?.name}
                                        textContentType='name'
                                        placeholder="Name"
                                        onChangeText={(value) => {
                                            setErrorMsg("")
                                            setName(value)
                                        }}
                                        style={{
                                            height: 50,
                                            backgroundColor: "#fff",
                                            paddingHorizontal: 10,
                                            borderWidth: 1,
                                            borderColor: (name === undefined || name === "") ? "lightgray" : "#f5220f",
                                            width: "90%",
                                            fontSize: 16,
                                            borderRadius: 10,
                                        }}
                                    />
                                    <TextInput
                                        defaultValue={userDetails?.phone_nmber.replace("+91", "")}
                                        keyboardType='number-pad'
                                        placeholder="10 Digit Mobile no."
                                        textContentType='telephoneNumber'
                                        onChangeText={(value) => {
                                            setErrorMsg("")
                                            setNumber(value)
                                        }}
                                        style={{
                                            height: 50,
                                            backgroundColor: "#fff",
                                            paddingHorizontal: 10,
                                            borderWidth: 1,
                                            borderColor: (number === undefined || number === "") ? "lightgray" : "#f5220f",
                                            width: "90%",
                                            fontSize: 16,
                                            borderRadius: 10,
                                            marginTop: 20

                                        }} />

                                    <TextInput
                                        placeholder="House No."
                                        onChangeText={(value) => {
                                            setErrorMsg("")
                                            sethouseNo(value)
                                        }}
                                        style={{
                                            height: 50,
                                            backgroundColor: "#fff",
                                            paddingHorizontal: 10,
                                            borderWidth: 1,
                                            borderColor: (houseNo === undefined || houseNo === "") ? "lightgray" : "#f5220f",
                                            width: "90%",
                                            fontSize: 16,
                                            borderRadius: 10,
                                            marginTop: 20

                                        }} />

                                    <TextInput
                                        placeholder="Area or Village"
                                        onChangeText={(value) => {
                                            setErrorMsg("")
                                            setArea(value)
                                        }}
                                        style={{
                                            height: 50,
                                            backgroundColor: "#fff",
                                            paddingHorizontal: 10,
                                            borderWidth: 1,
                                            borderColor: (area === undefined || area === "") ? "lightgray" : "#f5220f",
                                            width: "90%",
                                            fontSize: 16,
                                            borderRadius: 10,
                                            marginTop: 20

                                        }} />
                                    <TextInput
                                        defaultValue={userAddress?.city}
                                        placeholder="City"
                                        editable={false}
                                        style={{
                                            height: 50,
                                            backgroundColor: "#EBEBEB",
                                            paddingHorizontal: 10,
                                            borderWidth: 1,
                                            borderColor: (city === undefined || city === "") ? "lightgray" : "#f5220f",
                                            width: "90%",
                                            fontSize: 16,
                                            borderRadius: 10,
                                            marginTop: 20

                                        }} />

                                    <TextInput

                                        defaultValue={userAddress?.region}
                                        placeholder="State"
                                        // onChangeText={(value) => setState(value)}
                                        editable={false}
                                        style={{
                                            height: 50,
                                            backgroundColor: "#EBEBEB",
                                            paddingHorizontal: 20,
                                            borderWidth: 1,
                                            borderColor: (state === undefined || state === "") ? "lightgray" : "#f5220f",
                                            width: "90%",
                                            fontSize: 16,
                                            borderRadius: 10,
                                            marginTop: 20

                                        }} />

                                    <TextInput
                                        defaultValue={userAddress?.postalCode}
                                        placeholder="Pincode"
                                        editable={false}
                                        style={{
                                            height: 50,
                                            backgroundColor: "#EBEBEB",
                                            paddingHorizontal: 20,
                                            borderWidth: 1,
                                            borderColor: (pincode === undefined || pincode === "") ? "lightgray" : "#f5220f",
                                            width: "90%",
                                            fontSize: 16,
                                            borderRadius: 10,
                                            marginTop: 20

                                        }} />
                                </View>
                        }



                        <Text style={{ fontSize: 24, fontWeight: "300", marginTop: 20, paddingHorizontal: 5 }}>Select <Text style={{ fontWeight: '500', color: "#f5220f" }}>Payment</Text></Text>
                        <View>
                           {/*  <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setselectCOD(true)
                                        setselectPOADS(false)
                                        setSelectPayment("Cash On Delivery")
                                        setErrorMsg("")
                                    }}
                                    activeOpacity={0.8}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: selectCOD ? "#f5220f" : "lightgrey",
                                        borderRadius: 10,
                                        display: 'flex',
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 50,
                                        paddingHorizontal: 20,
                                        marginTop: 10
                                    }}

                                >
                                    <Text style={{ fontSize: 16, color: selectCOD ? "#f5220f" : "black" }}>Cash On Delivery</Text>

                                </TouchableOpacity>
                            </View> */}
                            <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setselectCOD(false)
                                        setselectPOADS(true)
                                        setSelectPayment("Pay Online at Your Doorsteps")
                                        setErrorMsg("")
                                    }}
                                    activeOpacity={0.8}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: selectPOADS ? "#f5220f" : "lightgrey",
                                        borderRadius: 10,
                                        display: 'flex',
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: 50,
                                        paddingHorizontal: 20,
                                        marginTop: 10
                                    }}

                                >
                                    <Text style={{ fontSize: 16, color: selectPOADS ? "#f5220f" : "black" }}>Pay with Metamask Wallet</Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", justifyContent: 'center', width: "100%", alignItems: 'center', paddingHorizontal: 20, marginTop: 50, paddingBottom: 100 }}>
                            <Text style={{ color: "#f5220f", marginBottom: 5 }}>{errorMsg}</Text>
                            <TouchableOpacity
                                disabled={btnLoading ? true : false}
                                style={{ backgroundColor: "#f5220f", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, paddingVertical: 10 }}
                                onPress={() => {

                                    if (selectPayment === undefined) {
                                        setErrorMsg("Select Payment Option")
                                    }
                                    else if (name === undefined || name === "") {
                                        setErrorMsg("Name is Must")
                                    }
                                    else if (number === undefined || number === "" || number?.length !== 10) {
                                        setErrorMsg("Check Mobile Number")
                                    }
                                    else if (houseNo === undefined || houseNo === "") {
                                        setErrorMsg(" House No. is Must")
                                    }
                                    else if (area === undefined || area === "") {
                                        setErrorMsg("Area or Village is Must")
                                    }
                                    else if (city === undefined || city === "") {
                                        setErrorMsg("First You Need To Set Your Location")
                                    }
                                    else if (state === undefined || state === "") {
                                        setErrorMsg("First You Need To Set Your Location")
                                    }
                                    else if (pincode === undefined || pincode === "") {
                                        setErrorMsg("First You Need To Set Your Location")
                                    }
                                    else {
                                        sendOrderDetails()
                                    }
                                }}
                            >
                                <ActivityIndicator
                                    size={20}
                                    color="#fff"
                                    style={
                                        btnLoading ?
                                            {
                                                display: 'flex',
                                                marginVertical: 5,
                                                marginHorizontal: 50
                                            }
                                            :
                                            { display: 'none' }
                                    } />
                                <Text style={
                                    btnLoading ? {
                                        display: 'none'
                                    }
                                        :
                                        { color: "#fff", fontWeight: "500", fontSize: 18 }}>Place Order <Text style={{ fontSize: 17, fontWeight: '500' }}>wei {grandTotal}</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>


                    <TabNavigation />
                </>

    )
}

export default PaymentPage