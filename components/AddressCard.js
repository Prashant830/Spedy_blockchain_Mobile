import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from "react-redux";
import firebaseApp from "../config";

const AddressCard = () => {
    const db = firebaseApp.firestore()
    const userAddress = useSelector((state) => state.userLocationReducer.address)


    const [addAddress, setAddAddress] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState()
    const [number, setNumber] = useState()
    const [houseNo, sethouseNo] = useState()
    const [area, setArea] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [pincode, setPincode] = useState()
    const [errInNumber, setErrInNumber] = useState(false)
    const [errInName, setErrInName] = useState(false)
    const [errInHouse, setErrInHouse] = useState(false)
    const [errInArea, setErrInArea] = useState(false)
    const [errInCity, setErrInCity] = useState(false)
    const [errInState, setErrInState] = useState(false)
    const [errInPincode, setErrInPincode] = useState(false)
    const [Address, setAddress] = useState()
    const [Addressname, setAddressname] = useState()
    const [Addressnumber, setAddressnumber] = useState()
    const [Addresshouseno, setAddresshouseno] = useState()
    const [Addressarea, setAddressarea] = useState()
    const [Addresscity, setAddresscity] = useState()
    const [Addressstate, setAddressstate] = useState()
    const [Addresspincode, setAddresspincode] = useState()

    const fetchAddress = async () => {
        await db.collection("users").doc(firebaseApp.auth().currentUser.phoneNumber).get().then((obj) => {
            setAddress(obj.data()?.Address)



            setAddressname(obj.data().Address?.name)
            const number = obj.data().Address?.number.replace("+91", "")
            setAddressnumber(number)
            setAddresshouseno(obj.data().Address?.houseNo)
            setAddressarea(obj.data().Address?.area)
            setAddresscity(obj.data().Address?.city)
            setAddressstate(obj.data().Address?.state)
            setAddresspincode(obj.data().Address?.pincode)

            setNumber(number)
            setName(obj.data().Address?.name)
            sethouseNo(obj.data().Address?.houseNo)
            setArea(obj.data().Address?.area)
            setCity(userAddress?.city)
            setState(userAddress?.region)
            setPincode(userAddress?.postalCode)


        }).catch((err) => console.log(err))

        if (Address?.name === undefined) {
            setAddAddress(true)
        }
    }

    useEffect(() => {

        fetchAddress()

    }, [])


    const saveDetail = async () => {


        setBtnLoading(true)



        if (number?.length === 10) {

            if (name != '' && name != "  ") {


                if (houseNo != '') {

                    if (area != '') {

                        if (city != '') {

                            if (state != '') {

                                if (pincode != '') {
                                    await db.collection("users").doc(firebaseApp.auth().currentUser.phoneNumber).update({

                                        Address:
                                        {
                                            name: name,
                                            number: "+91" + number,
                                            houseNo: houseNo,
                                            area: area,
                                            city: city,
                                            state: state,
                                            pincode: pincode
                                        }



                                    })
                                    fetchAddress()
                                    setEdit(false)
                                    setErrInNumber(false)
                                    setErrInArea(false)
                                    setErrInCity(false)
                                    setErrInHouse(false)
                                    setErrInName(false)
                                    setErrInPincode(false)
                                    setErrInState(false)
                                }
                                else {
                                    setErrInPincode(true)
                                }

                            }
                            else {
                                setErrInState(true)
                            }

                        }
                        else {
                            setErrInCity(true)
                        }

                    }
                    else {
                        setErrInArea(true)
                    }

                }
                else {
                    setErrInHouse(true)
                }

            }
            else {
                setErrInName(true)
            }



        }
        else {
            setErrInNumber(true)
        }




        setBtnLoading(false)


    }

    return (
        Address?.name === undefined ?
            <>
                <View style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20

                }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setEdit(true)

                        }
                        }
                        style={{
                            width: "90%",

                            height: 200,
                            // shadowOffset: { width: 0, height: 10 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#f5220f",
                            borderRadius: 10,
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: '300' }}>Click to add a Address</Text>
                    </TouchableOpacity>
                </View>

                <View style={
                    edit ?
                        {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: 20
                        }
                        :
                        {
                            display: "none"
                        }
                }>

                    <TextInput
                        defaultValue={name}
                        textContentType='name'
                        placeholder="Enter Your Name"
                        onChangeText={(value) => setName(value)}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#fff",
                            paddingHorizontal: 20,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,


                        }}
                    />
                    <Text style={
                        errInName ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        // value={Addressnumber}
                        defaultValue={number}
                        keyboardType='number-pad'
                        placeholder="Mobile no"
                        textContentType='telephoneNumber'
                        onChangeText={(value) => setNumber(value)}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#fff",
                            paddingHorizontal: 20,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />

                    <Text style={
                        errInNumber ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *Check your phone number
                    </Text>

                    <TextInput
                        defaultValue={houseNo}
                        placeholder="House no"
                        onChangeText={(value) => sethouseNo(value)}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#fff",
                            paddingHorizontal: 20,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInHouse ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        defaultValue={area}
                        placeholder="Area or Village"
                        onChangeText={(value) => setArea(value)}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#fff",
                            paddingHorizontal: 20,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInArea ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        defaultValue={userAddress?.city}
                        placeholder="City"
                        // onChangeText={(value) => setCity(value)}
                        editable={false}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "lightgray",
                            paddingHorizontal: 20,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInCity ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        defaultValue={userAddress?.region}
                        placeholder="State"
                        // onChangeText={(value) => setState(value)}
                        editable={false}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "lightgray",
                            paddingHorizontal: 20,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInState ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        defaultValue={userAddress?.postalCode}
                        placeholder="Pincode"
                        // onChangeText={(value) => setPincode(value)}
                        editable={false}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "lightgray",
                            paddingHorizontal: 20,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInPincode ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>

                    <TouchableOpacity
                        onPress={() => saveDetail()}
                        style={

                            {
                                marginTop: 20,
                                padding: 10,
                                borderRadius: 10,
                                width: 100,
                                height: 50,
                                backgroundColor: "#f5220f",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: 'center'

                            }}

                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "#fff"
                        }}>{btnLoading ? "Saving.." : "Save"}</Text>
                    </TouchableOpacity>

                </View>
            </>
            :
            <>

                <View style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20

                }}>
                    <View style={{
                        width: "90%",

                        height: 200,
                        // shadowOffset: { width: 0, height: 10 },
                        // shadowColor: "black",
                        // shadowOpacity: 0.2,
                        // shadowRadius: 3,
                        backgroundColor: "#f5220f",
                        borderRadius: 10
                    }}>
                        <View style={{ marginTop: 20, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: "#fff", fontSize: 24, marginLeft: 5, fontWeight: "300" }}>{Address?.name}</Text>
                        </View>
                        <View style={{ marginTop: 50, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>

                            <Text style={{ color: "#fff", fontSize: 16, marginLeft: 5, width: "100%", fontWeight: "200" }}>{Address?.number}</Text>
                        </View>

                        <View style={{ marginTop: 20, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>

                            <Text style={{ color: "#fff", fontSize: 14, marginLeft: 5, marginRight: 5, fontWeight: "200" }}>{Address?.houseNo + " " + Address?.area + " " + Address?.city + " " + Address?.state + ", " + Address?.pincode}</Text>

                        </View>
                        <TouchableOpacity style={{ position: "absolute", top: 5, right: 5 }} onPress={() => setEdit(true)}>
                            <Feather name="edit" size={24} color="#fff" />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={
                    edit ?
                        {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: 20
                        }
                        :
                        {
                            display: "none"
                        }
                }>

                    <TextInput
                        defaultValue={Addressname}
                        textContentType='name'
                        placeholder="Enter Your Name"
                        onChangeText={(value) => setName(value)}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#fff",
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,


                        }}
                    />
                    <Text style={
                        errInName ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        keyboardType='number-pad'
                        defaultValue={Addressnumber}
                        placeholder="Mobile no"

                        textContentType='telephoneNumber'
                        onChangeText={(value) => setNumber(value)}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#fff",
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />

                    <Text style={
                        errInNumber ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *Check your phone number
                    </Text>

                    <TextInput
                        defaultValue={Addresshouseno}
                        placeholder="House no"
                        onChangeText={(value) => sethouseNo(value)}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#fff",
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInHouse ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        defaultValue={Addressarea}
                        placeholder="Area or Village"
                        onChangeText={(value) => setArea(value)}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "#fff",
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInArea ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        defaultValue={userAddress?.city}
                        placeholder="City"
                        editable={false}
                        style={{
                            height: 50,
                            backgroundColor: "lightgrey",
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInCity ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput
                        defaultValue={userAddress?.region}
                        placeholder="State"
                        // onChangeText={(value) => setState(value)}
                        editable={false}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "lightgray",
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInState ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>
                    <TextInput

                        defaultValue={userAddress?.postalCode}
                        placeholder="Pincode"
                        // onChangeText={(value) => setPincode(value)}
                        editable={false}
                        style={{
                            height: 50,
                            // shadowOffset: { width: 0, height: 5 },
                            // shadowColor: "black",
                            // shadowOpacity: 0.2,
                            // shadowRadius: 3,
                            backgroundColor: "lightgray",
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: "#f5220f",
                            width: "90%",
                            fontSize: 16,
                            borderRadius: 10,
                            marginTop: 20

                        }} />
                    <Text style={
                        errInPincode ?
                            {
                                display: "flex",
                                color: "#f5220f",
                                textAlign: "left",
                                width: "100%",
                                paddingHorizontal: 25,
                                marginTop: 5

                            }
                            :
                            {
                                display: "none"
                            }
                    }>
                        *field not empty
                    </Text>

                    <TouchableOpacity
                        onPress={() => saveDetail()}
                        style={

                            {
                                marginTop: 20,
                                padding: 10,
                                borderRadius: 10,
                                width: 100,
                                height: 50,
                                backgroundColor: "#f5220f",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: 'center'

                            }}

                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "#fff"
                        }}>{btnLoading ? "Saving.." : "Save"}</Text>
                    </TouchableOpacity>

                </View>
            </>

    )
}

export default AddressCard