import React from "react";

import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { text, theme } from "../styles";

interface ProductProps {
    id: Number,
    imgUrl: ImageSourcePropType,
    name: String,
    price: Number
}

const ProductCard: React.FC<ProductProps> = ({ id, imgUrl, name, price }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={theme.productCard}
            onPress={() => navigation.navigate('ProductDetails', { id })}>
            <Image source={{ uri: imgUrl }} style={theme.productImage} />
            <View style={theme.productDescription}>
                <Text style={text.productName}>{name}</Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <Text style={text.productPrice}>{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard;