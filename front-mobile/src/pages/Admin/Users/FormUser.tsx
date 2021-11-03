import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View, Image, TextInput, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import { theme, text } from '../../../styles';

import arrow from '../../../assets/leftarrow.png';
import eyesOpened from '../../../assets/eyes-opened.png';
import eyesClosed from '../../../assets/eyes-closed.png';
import Toast from 'react-native-tiny-toast';
import { createUser } from '../../../services';

interface FormUserProps {
    setScreen: Function;
}

const FormUser: React.FC<FormUserProps> = (props) => {
    const { setScreen } = props;
    const [loading, setLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roles: [
            {
                id: 1,
            },
            {
                id: 2,
            }
        ]
    });

    function handleSave() {
        newUsers();
    }

    async function newUsers() {
        setLoading(true)
        const data = {
            ...user,
        };
        try {
            await createUser(data);
            setScreen('users');
            Toast.showSuccess('Usuário criado com sucesso!!');
        } catch (error) {
            Toast.show('Erro ao salvar!');
        }
        setLoading(false);
    }
    return (
        <View style={theme.formContainer}>
            {
                loading ? (<ActivityIndicator size="large" />) :
                    (
                        <View style={theme.formCard}>
                            <ScrollView>
                                <TouchableOpacity onPress={() => setScreen('users')} style={theme.goBackContainer}>
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
                                    value={user.lastName}
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
                                                    onPress: () => setScreen('products'),
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
                            </ScrollView>
                        </View>
                    )}
        </View>
    )
}

export default FormUser;