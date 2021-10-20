import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Home: React.FC = ({ navigation }) => {
    return (
        <View>
            <Text>Bem vindo</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Catalog')}>
                <Text>Cliquei aqui</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Home;