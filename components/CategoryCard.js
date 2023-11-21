import React from 'react'
import { Image, Text, View } from 'react-native'

const CategoryCard = ({ name }) => {
    return (
        <View className="m-3 flex items-center" style={{
            backgroundColor: "#f5220f", paddingHorizontal: 10, borderRadius: 50, overflow: 'hidden', width: 80, elevation: 5, marginBottom: 10,
            shadowOffset: { height: 5, width: 9 },
            shadowColor: 'black',
            shadowOpacity: 0.9,
            shadowRadius: 1,
            zIndex: 2,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",


        }}>

            <Text style={{ fontSize: 12, color: "#fff", fontWeight: "700", textAlign: "center" }}>{name}</Text>

        </View>
    )
}

export default CategoryCard