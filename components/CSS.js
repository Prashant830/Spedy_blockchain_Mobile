
import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';




var style = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 100,


    },
    SplaceScreenContainer: {
        backgroundColor: "#f5220f",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",


    },
    p: {
        position: "absolute",
        bottom: 70,
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold"


    },
    HomePage_Header: {
        backgroundColor: "#f5220f",
        color: "#fff",
        overflow: 'hidden',
        height: Platform.OS === 'android' ? "10%" : "3%",
        zIndex: 1,

    },
    HomePage_Header_first: {
        display: "flex",
        flexDirection: "row",
        color: "#fff",
        // height: Platform.OS === 'android' ? "20%" : "15%",


    },
    HomePage_Header_first_left: {
        color: "white",
        flex: 2,
        marginLeft: 10
    },
    HomePage_Header_first_right: {
        flexDirection: "row",
        width: 250,
        marginRight: 10,
        overflow: "hidden",
        justifyContent: "flex-end",




    },
    FullAddress: {
        color: "#fff"
    },

    boxContainer: {
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


    },




    ResText: {
        fontSize: 18, display: 'flex', textAlign: 'left', marginLeft: 20
    },
    ResText2: {
        fontSize: 14, display: 'flex', textAlign: 'left', marginLeft: 20, position: "absolute",
        bottom: 50,
    },

    loginBAck1: {
        height: "40%",
        backgroundColor: "#fff"
    },
    loginBAck: {

        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "gray",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOffset: { width: 0, height: -9 },
        shadowColor: 'gray',
        shadowOpacity: 0.2,
        shadowRadius: 3,


    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        marginTop: 60,
        borderRadius: 5,
        paddingHorizontal: 5,
        fontSize: 18,

        width: Dimensions.get('window').width - 100,
        height: 50,
        marginBottom: 20,
        textAlign: 'center',
        color: "#f5220f",
        borderWidth: 0.5

    },
    sendVerification: {
        padding: 20,
        width: "50%",
        backgroundColor: '#f5220f',
        borderRadius: 10,
    },
    sendCode: {
        padding: 20,
        width: "50%",
        backgroundColor: '#f5220f',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
    },
    input: {

        fontSize: 18,
        fontWeight: "300",
        color: "black"
    },
    description: {
        fontSize: 16
    },
})

export default style
