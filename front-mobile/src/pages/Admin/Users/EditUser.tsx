import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, Image, TextInput, Alert } from "react-native";
import Toast from "react-native-tiny-toast";
import { getUser, updateUser } from "../../../services";
import { theme, text } from "../../../styles";
import { ScrollView } from "react-native-gesture-handler";

import arrow from '../../../assets/leftarrow.png';
import eyesOpened from '../../../assets/eyes-opened.png';
import eyesClosed from '../../../assets/eyes-closed.png';

interface EditUserProps {
    setScreen: Function;
    userId: number;
}

const EdiUser: React.FC<EditUserProps> = (props) => {
    const { setScreen, userId } = props;
    const [loading, setLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: []
    });

    async function handleSave() {
        setLoading(true);
        const data = {
            ...user,
        }
        try {
            await updateUser(data);
            setScreen('users')
            Toast.showSuccess('Usuário(a) atualizado com sucesso!!')
        } catch (error) {
            console.warn(error)
            Toast.show('Erro ao atualizar usuário(a)');
        }
        setLoading(false);
    };

    async function loadUser() {
        setLoading(true);
        const res = await getUser(userId);
        setUser(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <View style={theme.formContainer}>
            {
                loading ? (<ActivityIndicator size="large" />) :
                    (
                        <View style={theme.formCard}>
                            <ScrollView>
                                <TouchableOpacity
                                    onPress={() => setScreen('users')}
                                    style={theme.goBackContainer}>
                                    <Image source={arrow} />
                                    <Text style={text.goBackText}>Voltar</Text>
                                </TouchableOpacity>
                                <TextInput
                                    placeholder="Nome"
                                    style={theme.formInput}
                                    value={user.firstName}
                                    onChangeText={(e) => setUser({ ...user, firstName: e })}
                                />
                                <TextInput
                                    placeholder="Sobrenome"
                                    style={theme.formInput}
                                    value={user.firstName}
                                    onChangeText={(e) => setUser({ ...user, lastName: e })}
                                />
                                <View style={theme.passwordEditUser}>
                                    <TextInput
                                        placeholder="Senha"
                                        autoCapitalize="none"
                                        style={theme.formInput}
                                        secureTextEntry={hidePassword}
                                        value={user.password}
                                        onChangeText={(e) => setUser({ ...user, password: e })}
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
                                <TextInput
                                    placeholder="Email"
                                    style={theme.formInput}
                                    value={user.email}
                                    onChangeText={(e) => setUser({ ...user, email: e })}
                                />
                            </ScrollView>
                            <View style={theme.buttonContainer}>
                                <TouchableOpacity
                                    style={theme.deleteBtn}
                                    onPress={() => Alert.alert(
                                        "Deseja cancelar?",
                                        "Os dados inseridos não serão salvos",
                                        [
                                            {
                                                text: "Voltar",
                                                style: "cancel",
                                            },
                                            {
                                                text: "Confirmar",
                                                onPress: () => setScreen('users'),
                                                style: 'default'
                                            }
                                        ])}
                                >
                                    <Text style={text.deleteText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={theme.saveBtn}
                                    onPress={() => handleSave()}
                                >
                                    <Text style={text.saveText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
        </View>
    )
}

export default EdiUser;