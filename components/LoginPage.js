import { FontAwesome } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Image, Keyboard, Platform, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import firebaseApp, { firebaseConfig } from '../config';
import style from './CSS';
import IosStatusBar from './IosStatusBar';




//google sign in dep..
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// WebBrowser.maybeCompleteAuthSession();
// import GoogleButton from 'react-google-button'


const LoginPage = ({ getPermission, userLocation, userAdd }) => {


  const navigation = useNavigation()
  const [isInternet, setIsInternet] = useState(true)
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [code, setCode] = React.useState("");
  const [verificationId, setVerificationId] = React.useState(null);
  const recaptchaVerifier = React.useRef(null);
  const [isfull, setIsfull] = useState(false)
  const [isverify, setIsverify] = useState(false)
  const [iserr, setIserr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOTPSent, setIsOTPSent] = useState(false)
  const [isOTPLoading, setIsOTPLoading] = useState(false)

  if (iserr === "Firebase: Error (auth/invalid-phone-number).") {
    setIserr("Invalid Phone Number.")
  }
  else if (iserr === "Firebase: TOO_SHORT (auth/invalid-phone-number).") {
    setIserr("Invalid Phone Number.")
  }
  else if (iserr === "Firebase: Error (auth/invalid-verification-code).") {
    setIserr("OTP is not valid.")
  }
  else if (iserr === "Firebase: Error (auth/too-many-requests).") {
    setIserr("Too many attempts, please try after some time.")
  }

  useEffect(() => {
    const internet = NetInfo.fetch().then(state => {
      setIsInternet(state?.isConnected)


    }).catch((err) => {
      alert(err)
    })



  }, [])


  // google sign in code..................................................................................................//
  // const [accessToken, setAccessToken] = useState(null);
  // const [user, setUser] = useState(null);
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: "563687650387-qve91252mlr3gkhtlqjnjbvjnvmbi0a4.apps.googleusercontent.com",
  //   iosClientId: "563687650387-acl6mkq81u7g9cl1esjl1jfbne6f029g.apps.googleusercontent.com"
  // });


  // useEffect(() => {
  //   if(response?.type === "success") {
  //     setAccessToken(response.authentication.accessToken);
  //     accessToken && fetchUserInfo();
  //   }
  // }, [response, accessToken])


  // async function fetchUserInfo() {
  //   let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: { Authorization: `Bearer ${accessToken}` }
  //   });

  //   response.json().then( (data) => {
  //     setUser(data);
  //     console.log(data)
  //     navigation.replace("SplashToHomePage")
  //   }).catch((err) => {
  //       console.log(err);
  //   });
  // }

  // const ShowUserInfo = () => {
  //   if(user) {
  //     return(
  //       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //         <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
  //         <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />
  //         <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
  //       </View>
  //     )
  //   }
  // }  


  //............................................................................................................................//

  const dispatch = useDispatch();

  useEffect(() => {
    if (userAdd != undefined) {
      console.log("dispatch is running.. " + userAdd.city)
      dispatch({
        type: 'ADD_ADDRESS',
        payload: userAdd,
      })
      dispatch({
        type: 'ADD_LOCATION',
        payload: userLocation,
      })
      dispatch({
        type: 'ADD_PERMISSION',
        payload: getPermission
      })
    }
  }, [userAdd.city])




  const sendVerification = () => {


    setIsLoading(true)

    var userNumber = `+91${phoneNumber}`
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(userNumber, recaptchaVerifier.current)
      .then(setVerificationId).catch((err) => {
        setIsverify(false)
        setPhoneNumber('')
        setIserr(err.message)
        setIsOTPSent(false)
      });
    setIsOTPSent(true)
    setIsLoading(false)
    setIsverify(true)
  };

  const confirmCode = async () => {
    setIsOTPLoading(true)
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {




        if (result.additionalUserInfo.isNewUser) {
          firebaseApp.firestore().collection("users").doc(firebaseApp.auth()?.currentUser.phoneNumber).set({
            phone_nmber: firebaseApp.auth()?.currentUser.phoneNumber
          })
          navigation.replace("SplashToHomePage")
        }
        else {
          navigation.replace("SplashToHomePage")
        }



        setIsOTPSent(false)
        setIsverify(false)
        setPhoneNumber('')
        setCode('');
      })
      .catch((err) => {
        setIsverify(false)
        setPhoneNumber('')
        setIserr(err.message)
        setIsOTPSent(false)
        setIsOTPLoading(false)
        setIsLoading(false)
        setCode('')
        setPhoneNumber('')
      });
  };


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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ backgroundColor: "#fff" }}>

        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <StatusBar backgroundColor="#f5220f" />
          <View style={
            isfull ?
              {
                display: "none",

              }
              :
              {
                display: "flex",
                height: "40%",
                backgroundColor: "#fff"
              }

          }>
            <Image
              source={require('./../assets/images/Marketplace-pana.jpg')}
              style={{
                marginTop: 60,
                height: 250,
                justifyContent: 'center',
                alignItems: 'center',
                resizeMode: "contain",
                width: Dimensions.get('window').width
              }}
            />

          </View>


          <View style={

            isfull ? {
              display: "flex",
              height: Dimensions.get('window').height,
              backgroundColor: '#fff',
              alignItems: 'center',

            }
              :
              {
                backgroundColor: '#fff',
                alignItems: 'center',
                borderColor: "gray",
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderTopWidth: 1,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                shadowOffset: { width: 0, height: -9 },
                shadowColor: 'gray',
                shadowOpacity: 0.2,
                shadowRadius: 3,
                height: 100,

              }
          }>


            <View style={
              isfull ?
                { width: "100%", height: "15%" }
                :
                {
                  display: "none"
                }
            }>
              <View style={
                isfull ?
                  {
                    height: Platform.OS === "android" ? 0 : 40,
                    backgroundColor: "#f5220f",
                    width: Dimensions.get('screen').width
                  }
                  :
                  {
                    display: "none"
                  }

              }


              ></View>
              <TouchableOpacity
                onPress={() => {
                  setIsfull(false)
                  setIsverify(false)
                  setPhoneNumber('')
                  Keyboard.dismiss()
                  setIsOTPSent(false)
                  setIserr('')
                  setIsLoading(false)
                  setIsOTPLoading(false)
                  setCode('')
                  setPhoneNumber('')
                }

                }
                style={

                  isfull ? {
                    display: "flex",
                    width: "15%",

                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 5
                  }
                    :
                    {

                      display: "none",

                    }}

              >
                <FontAwesome name="chevron-down" size={30} color="#F5220f" />

              </TouchableOpacity>
            </View>
            <View style={
              isfull ? {
                display: "flex"
              }
                :
                {
                  display: "none"
                }
            }>
              <View style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: "#f5220f", display: 'flex', alignItems: "center", justifyContent: "center" }}>
                <Image source={require('../assets/images/Spedy_Logo.png')} style={{ height: 70, width: 70 }} />
              </View>
            </View>

            <View style={{
              width: "100%",
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              padding: 5
            }}>
              <Text style={{ fontSize: 27, fontWeight: "200", color: "black" }}>Welcome To</Text><Text style={{ fontSize: 30, marginLeft: 10, fontWeight: "bold", color: "#f5220f" }}>Spedy</Text>
            </View>

            <View style={
              isverify ?
                { display: "none" }
                :
                {
                  display: "flex",
                  flexDirection: "row",
                  // borderWidth: 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  height: 50,
                  width: Dimensions.get('window').width - 80,
                  marginTop: 30,
                  marginBottom: 20,
                }

            }>
              <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/images/flag.png')} style={{ width: 25, height: 20 }} />
                <Text style={{ fontSize: 20, color: "#f5220f", fontWeight: "bold" }}> +91</Text>
              </View>
              <TextInput

                placeholder="Phone Number"
                placeholderTextColor="lightgray"

                onChangeText={setPhoneNumber}
                value={phoneNumber}
                keyboardType="phone-pad"
                autoCompleteType="tel"
                maxLength={10}
                style={
                  isverify ? {
                    display: 'none'
                  }
                    :
                    {

                      borderRadius: 5,
                      fontSize: 20,
                      fontWeight: "bold",
                      marginLeft: Platform.OS === 'android' ? 5 : 5,
                      borderBottomWidth: 1,
                      borderBottomColor: "lightgray",
                      width: 150,
                      // padding: 5,
                      // width: Dimensions.get('window').width - 100,


                      textAlign: 'center',
                      color: "#f5220f",

                    }}
                onFocus={() => setIsfull(true)}
              />
            </View>

            <View style={
              isverify ? {
                display: 'none',
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 5
              }
                :
                {
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 5

                }}>

              <TouchableOpacity
                style={style.sendVerification}
                onPress={sendVerification}
                disabled={isLoading ? true : isOTPSent ? true : false}
              >
                <Text style={style.buttonText}>{isLoading ? "Loading..." : isOTPSent ? "OTP Sent" : "Send OTP"}</Text>
              </TouchableOpacity>


            </View>

            <View style={
              isverify ? {
                display: "flex",
                width: "100%",
                alignItems: "center"
              }
                :
                { display: "none" }}>
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor="lightgray"
                onChangeText={setCode}
                keyboardType="number-pad"
                style={{
                  marginTop: 30,
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgray",
                  borderRadius: 5,
                  // paddingHorizontal: 5,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#f0522f",
                  marginBottom: 20,
                  textAlign: "center",
                  width: 100

                }}
                maxLength={6}

              />
              <View style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 5,

              }}>
                <TouchableOpacity style={style.sendCode}
                  onPress={confirmCode}
                  disabled={isOTPLoading ? true : false}
                >
                  <Text style={style.buttonText}>{isOTPLoading ? "Loading..." : "Verify"}</Text>
                </TouchableOpacity>
              </View>


            </View>


          </View>


          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
        </View>

      </TouchableWithoutFeedback >


  )

}

export default LoginPage
