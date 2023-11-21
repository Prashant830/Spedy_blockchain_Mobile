import { AntDesign, Feather, FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { onBlur } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";
import { collection, doc, setDoc } from 'firebase/compat/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import KeyboardListener from 'react-native-keyboard-listener';
import firebaseApp from '../config';
import AddressCard from "./AddressCard";
import AddressCard2 from "./AddressCard2";
import IosStatusBar from "./IosStatusBar";

import OrderHistory from "./OrderHistory";
import TabNavigation from './TabNavigation';



const db = firebaseApp.firestore();


const ProfilePage = () => {

  const navigation = useNavigation()
  const Height = Dimensions.get('window').height
  const [edit, setEdit] = useState(false)
  const [errInEmail, setErrInEmail] = useState(false)
  const [errInNumber, setErrInNumber] = useState(false)
  const [errInName, setErrInName] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [Margin, setMargin] = useState(0)
  const [isLoading, setisLoading] = useState(true)






  // fetching data,

  const [emaill, setemaill] = useState()
  const [namee, setnamee] = useState()
  const [usernumber, setUsernumber] = useState()
  const [orderHistory, setOH] = useState()

  //user Detail 
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [number, setNumber] = useState()


  const fetchData = async () => {

    await db.collection("users").doc(firebaseApp.auth().currentUser.phoneNumber).get().then((documentSnapshot) => {

      // console.log("User data: ", documentSnapshot.data().First_addres, documentSnapshot.Second_addres); 

      setnamee(documentSnapshot.data().name),
        setemaill(documentSnapshot.data().email),
        setOH(documentSnapshot.data().order_history)
      const number = documentSnapshot.data().phone_nmber.replace("+91", "")
      setUsernumber(documentSnapshot.data().phone_nmber)

      setName(documentSnapshot.data().name)
      setEmail(documentSnapshot.data().email)
      setNumber(number)
      setisLoading(false)


    }).catch((err) => {
      console.log(err)
      setisLoading(false)
    })

  }

  useEffect(() => {
    fetchData()
  }, [])




  const saveDetail = async () => {

    setBtnLoading(true)

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {

      if (number?.length === 10) {

        if (name != '' && name != "  ") {
          await db.collection("users").doc(firebaseApp.auth().currentUser.phoneNumber)
            .update({
              name: name,
              email: email,
              phone_nmber: number === undefined ? firebaseApp.auth().currentUser?.phoneNumber : "+91" + number,
            })

          fetchData();

          setEdit(false)
          setErrInNumber(false)
          setErrInEmail(false)
        }
        else {
          setErrInName(true)
        }



      }
      else {
        setErrInNumber(true)
      }



    }
    else {
      setErrInEmail(true)
    }


    setBtnLoading(false)

  }

  const setMarginBottom = (value) => {
    setMargin(value)
  }



  return (

    isLoading ?
      <>
        <IosStatusBar />
        <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
          <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: 'center', width: "100%", paddingHorizontal: 30, backgroundColor: "#f5220f", height: 60, paddingBottom: 20 }} >
          <FontAwesome5 name="user-circle" size={35} color="white" />
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", marginTop: 10 }} >{(namee === undefined || namee === '') ? firebaseApp.auth().currentUser?.phoneNumber : namee}</Text>
        </View>

        <View style={{
          display: "flex",
          alignItems: "center",
          justifyContent: 'center',
          width: "100%",
          height: '70%'

        }}>
          <ActivityIndicator color="#f5220f" size={24} />
        </View>

      </>
      :
      namee === undefined ?
        <>
          <KeyboardListener
            onWillShow={() => { setMarginBottom(300) }}
            onWillHide={() => { setMarginBottom(0) }}
          />
          <IosStatusBar />
          <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
            <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: 'center', width: "100%", paddingHorizontal: 30, backgroundColor: "#f5220f", height: 60, paddingBottom: 20 }} >
            <FontAwesome5 name="user-circle" size={35} color="white" />
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", marginTop: 10 }} >{(namee === undefined || namee === '') ? firebaseApp.auth().currentUser?.phoneNumber : namee}</Text>
          </View>


          <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: Margin }}>

            <View style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20

            }}>
              <TouchableOpacity
                onPress={() => setEdit(true)}
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

                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "300" }}>Click to Set Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={
              edit ?
                {

                }
                :
                {
                  display: 'none'
                }
            }>
              <Text style={{ fontSize: 28, fontWeight: "300", color: "black", marginTop: 40, paddingHorizontal: 10 }}>Edit <Text style={{ fontWeight: "500", color: "#f5220f", }}>Profile</Text></Text>

              <View style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
                paddingBottom: 50
              }}>

                <TextInput

                  defaultValue={name}
                  onChangeText={(value) => setName(value)}
                  textContentType='name'
                  placeholder="Enter Your Name"
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
                    borderRadius: 10

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

                  autoComplete='email'
                  keyboardType="email-address"
                  defaultValue={email}
                  onChangeText={(value) => setEmail(value)}
                  textContentType='emailAddress'
                  placeholder="Email"
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
                    marginTop: 20,


                  }}
                />
                <Text style={
                  errInEmail ?
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
                  *please check your email.
                </Text>

                <TextInput
                  value={number}
                  keyboardType='number-pad'
                  defaultValue={number}
                  onChangeText={(value) => setNumber(value)}
                  placeholder="10 digits Mobile No"
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

                  }}
                />


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

                <TouchableOpacity style={

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
                  onPress={() => saveDetail()}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "#fff"
                  }}>{btnLoading ? "Saving.." : "Save"}</Text>
                </TouchableOpacity>

              </View>

            </View>


          </ScrollView>





        </>
        :
        <>
          <KeyboardListener
            onWillShow={() => { setMarginBottom(300) }}
            onWillHide={() => { setMarginBottom(-Height + Height + 60) }}
          />
          <IosStatusBar />
          <View style={{ width: "100%", backgroundColor: "#f5220f", paddingBottom: 5, paddingLeft: 10 }}>
            <TouchableOpacity style={{ width: 25 }} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: 'center', width: "100%", paddingHorizontal: 30, backgroundColor: "#f5220f", height: 60, paddingBottom: 20 }} >
            <FontAwesome5 name="user-circle" size={35} color="white" />
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: "bold", marginTop: 10 }} >{(namee === undefined || namee === '') ? firebaseApp.auth().currentUser?.phoneNumber : namee}</Text>
          </View>

          <ScrollView bounces={true} showsVerticalScrollIndicator={false} style={{
            marginBottom: Margin,
          }}>

            <Text style={{ fontSize: 28, fontWeight: "300", color: "black", marginTop: 40, paddingHorizontal: 10 }}>Your <Text style={{ fontWeight: "500", color: "#f5220f", }}>Profile</Text></Text>

            <View style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20

            }}>
              <View style={{
                width: "90%",

                height: 200,
                backgroundColor: "#f5220f",
                borderRadius: 10
              }}>
                <View style={{ marginTop: 20, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                  <Text style={{ color: "#fff", fontSize: 24, marginLeft: 5, fontWeight: '300' }}>{namee}</Text>
                </View>
                <View style={{ marginTop: 30, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>

                  <Text style={{ color: "#fff", fontSize: 16, marginLeft: 5, width: "100%", fontWeight: '200' }}>{usernumber ? usernumber : firebaseApp.auth().currentUser.phoneNumber}</Text>
                </View>
                <View style={{ marginTop: 10, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>

                  <Text style={{ color: "#fff", fontSize: 16, marginLeft: 5, width: "100%", fontWeight: '200' }}>{emaill}</Text>
                </View>
                <TouchableOpacity style={{ marginTop: 20, paddingHorizontal: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', width: "50%" }}
                  onPress={() => navigation.navigate('OrderHistory')}
                >
                  <Text style={{ color: "#fff", fontSize: 16, marginLeft: 5, marginRight: 5, fontWeight: '200', }}>Order History</Text>
                  <AntDesign name="arrowright" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={{ position: "absolute", top: 5, right: 5 }} onPress={() => setEdit(true)}>
                  <Feather name="edit" size={24} color="#fff" />
                </TouchableOpacity>

              </View>
            </View>

            <View style={
              edit ?
                {

                }
                :
                {
                  display: 'none'
                }
            }>
              <Text style={{ fontSize: 28, fontWeight: "300", color: "black", marginTop: 40, paddingHorizontal: 10 }}>Edit <Text style={{ fontWeight: "500", color: "#f5220f", }}>Profile</Text></Text>

              <View style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
                paddingBottom: 100
              }}>

                <TextInput
                  defaultValue={name}
                  onChangeText={(value) => setName(value)}
                  textContentType='name'
                  placeholder="Enter Your Name"
                  style={{
                    height: 50,
                    backgroundColor: "#fff",
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    borderColor: "#f5220f",
                    width: "90%",
                    fontSize: 16,
                    borderRadius: 10

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

                  autoComplete='email'
                  keyboardType='email-address'
                  defaultValue={email}
                  onChangeText={(value) => setEmail(value)}
                  textContentType='emailAddress'
                  placeholder="Email"
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

                  }}
                />
                <Text style={
                  errInEmail ?
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
                  *please check your email.
                </Text>
                <TextInput

                  keyboardType='number-pad'
                  defaultValue={number}
                  onChangeText={(value) => setNumber(value)}
                  placeholder="10 digits Mobile No"
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

                  }}
                />
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
                  *Check your phone number or number should be start from +91.
                </Text>

                <TouchableOpacity style={

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
                  onPress={() => saveDetail()}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "#fff"
                  }}>{btnLoading ? "Saving.." : "Save"}</Text>
                </TouchableOpacity>

              </View>

            </View>

            {/* <View style={{
              paddingBottom: Platform.OS === 'android' ? 100 : 100,
            }}>
              <Text style={{ fontSize: 28, fontWeight: "300", color: "black", marginTop: 40, paddingHorizontal: 10 }}>Address <Text style={{ fontWeight: "500", color: "#f5220f", }}>Books</Text></Text>

              <AddressCard />
              <AddressCard2 />
            </View> */}







          </ScrollView>
        </>


  )
}


export default ProfilePage
