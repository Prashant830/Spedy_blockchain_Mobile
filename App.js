
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, LogBox } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import Cart from './components/Cart';
import CategoryClicked from './components/CategoryClicked';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Order from './components/Order';
import OrderHistory from './components/OrderHistory';
import PaymentPage from './components/PaymentPage';
import ProfilePage from './components/ProfilePage';
import RestaurantDetail from './components/RestaurantDetail';
import Restaurants from './components/Restaurants';
import SearchPage from './components/SearchPage';
import SetLocationPage from './components/SetLocationPage';
import SplashScreen from './components/SplashScreen';
import Store from './components/Store';
import StoreCategoryClicked from './components/StoreCategoryClicked';
import StoreSearchPage from './components/StoreSearchPage';
import firebaseApp from './config';
import configurestore from "./redux/store";




const store = configurestore();
const Stack = createNativeStackNavigator();

// const auth = await getAuth(firebaseApp);



const App = () => {

  const [getPermission, setGetPermission] = useState(false)
  const [userLocation, setUserLocation] = useState()
  const [userAdd, setUserAdd] = useState({})
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  var auth = getAuth(firebaseApp).currentUser

  LogBox.ignoreAllLogs();
  // console.log(auth)


  //Finding User Location
  useEffect(() => {
    //Setting the current User.



    (async () => {


      //inialize

      let coardinates
      let address



      //Request for location permission
      const { status } = await Location.requestForegroundPermissionsAsync().catch((err) => {
        console.log(err.message)
      })




      //Handle Error
      if (status === 'granted') {

        setGetPermission(true);


        setTimeout(() => {
          setShowSplashScreen(false)
        },
          3000
        )


        if (Location) {
          coardinates = await Location.getCurrentPositionAsync({}).catch((err) => {
            console.log("this is the err in coardinates --> " + err.message)
          })

        }
        if (coardinates.coords === undefined) {
          address = {}
        }
        else {

          address = await Location.reverseGeocodeAsync(coardinates.coords).catch((err) => {

            alert(err.message)

          })

        }

        if (coardinates.coords === undefined) {
          setUserLocation({})

        }
        else {
          setUserLocation(coardinates.coords)

        }
        if (address) {
          setUserAdd(address)

        }
        else {
          setUserAdd({})
        }

      }
      else {
        setGetPermission(false)
        setTimeout(() => {
          setShowSplashScreen(false)
        },
          3000
        )
        setUserAdd({})
        setUserLocation({})

      }



    })
      //calling function
      ();

  }, [])



  return (

    <ReduxProvider store={store}>

      <NavigationContainer>

        <Stack.Navigator screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          statusBarColor: "#f5220f",
          contentStyle: {
            backgroundColor: "#fff",
          }
        }}>
          {showSplashScreen ?
            <Stack.Screen name='Splash' options={{ headerShown: false, }}  >
              {() => (<SplashScreen getPermission={getPermission === undefined ? fasle : getPermission} />

              )}
            </Stack.Screen>
            :
            (auth === null) ?
              <Stack.Screen name='LoginPage' options={{ headerShown: false, animation: "fade" }}>
                {() => (<LoginPage getPermission={getPermission === undefined ? fasle : getPermission} userLocation={userLocation === undefined ? {} : userLocation} userAdd={userAdd[0] === undefined ? {} : userAdd[0]} />

                )}
              </Stack.Screen>
              :
              <Stack.Screen name='HomePage' options={{ headerShown: false, animation: 'fade', animationDuration: 500 }}  >
                {() => (<HomePage getPermission={getPermission === undefined ? fasle : getPermission} userLocation={userLocation === undefined ? {} : userLocation} userAdd={userAdd[0] === undefined ? {} : userAdd[0]} />

                )}
              </Stack.Screen>
          }

          <Stack.Screen name='Store' component={Store} options={{ headerShown: false, animation: "fade", animationDuration: 100 }} />
          <Stack.Screen name='Restaurants' component={Restaurants} options={{ headerShown: false, animation: "fade", animationDuration: 100 }} />
          <Stack.Screen name='Cart' component={Cart} options={{ headerShown: false, animation: "fade", animationDuration: 100 }} />
          <Stack.Screen name='Order' component={Order} options={{ headerShown: false, animation: "fade", animationDuration: 100 }} />
          <Stack.Screen name='SplashToHomePage' options={{ headerShown: false, animation: 'fade', animationDuration: 100 }}  >
            {() => (<HomePage />

            )}
          </Stack.Screen>
          <Stack.Screen name='ProfilePage' component={ProfilePage} options={{ headerShown: false, animation: "fade", animationDuration: 100 }} />
          <Stack.Screen name='LocationPage' component={SetLocationPage} options={{ headerShown: false, animation: "slide_from_right", animationDuration: 100 }} />
          <Stack.Screen name='RestaurantDetail' component={RestaurantDetail} options={{ headerShown: false, animation: "fade", animationDuration: 100 }} />
          <Stack.Screen name='PaymentPage' component={PaymentPage} options={{ headerShown: false, animation: "fade", animationDuration: 100 }} />
          <Stack.Screen name='SearchPage' component={SearchPage} options={{ headerShown: false, animation: "fade", animationDuration: 100 }} />
          <Stack.Screen name='StoreSearchPage' component={StoreSearchPage} options={{ headerShown: false, animation: "fade", animationDuration: 100, contentStyle: { backgroundColor: "#fff" } }} />
          <Stack.Screen name='CategoryClicked' component={CategoryClicked} options={{ headerShown: false, animation: "fade", animationDuration: 100, contentStyle: { backgroundColor: "#fff" } }} />
          <Stack.Screen name='StoreCategoryClicked' component={StoreCategoryClicked} options={{ headerShown: false, animation: "fade", animationDuration: 100, contentStyle: { backgroundColor: "#fff" } }} />
          <Stack.Screen name='OrderHistory' component={OrderHistory} options={{ headerShown: false, animation: "fade", animationDuration: 100, contentStyle: { backgroundColor: "#fff" } }} />

        </Stack.Navigator>


      </NavigationContainer>
    </ReduxProvider>







  );


}
export default App

