import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { text, theme } from "../styles";
import Toast from 'react-native-toast-message'

import eyesOpened from '../assets/eyes-opened.png';
import eyesClosed from '../assets/eyes-closed.png';
import arrow from '../assets/arrow.png';
import { isAuthenticated, login } from "../services/auth";

const Login: React.FC = () => {
    const navigation = useNavigation();
    const [hidePassword, setHidePassword] = useState(true);
    const [useFetchData, setUserFetchData] = useState({});
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });

    async function handleLogin() {
        try {
            const data = await login(userInfo);
            setUserFetchData(data);
            navigation.navigate('Dashboard');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao logar',
                text2: 'Verifique o usuário ou senha e tente novamente 😔'
            })
        };
    };

    return (
        <View style={theme.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={theme.loginCard}>
                    <Text style={text.loginTitle}>Login</Text>
                    <View style={theme.form}>
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={userInfo.username}
                            style={theme.textInput}
                            onChangeText={
                                (e) => {
                                    const newUserInfo = { ...userInfo };
                                    newUserInfo.username = e;
                                    setUserInfo(newUserInfo);
                                }}
                        />
                        <View style={theme.passwordGroup}>
                            <TextInput
                                placeholder="Senha"
                                autoCapitalize="none"
                                value={userInfo.password}
                                style={theme.textInput}
                                secureTextEntry={hidePassword}
                                onChangeText={
                                    (e) => {
                                        const newUserInfo = { ...userInfo };
                                        newUserInfo.password = e;
                                        setUserInfo(newUserInfo);
                                    }}
                            />
                            <TouchableOpacity
                                style={theme.toggle}
                                onPress={() => setHidePassword(!hidePassword)}
                            >
                                <Image
                                    style={theme.eyes}
                                    source={
                                        hidePassword ? eyesClosed : eyesOpened
                                    } />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={theme.primaryButton}
                        activeOpacity={0.8}
                        onPress={() => handleLogin()}
                    >
                        <View style={theme.buttonTextContainer}>
                            <Text style={text.primaryText}>Entrar</Text>
                        </View>
                        <View style={theme.arrowContainer}>
                            <Image source={arrow} />
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Login;