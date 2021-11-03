import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import { theme, text, textAlert } from '../../../styles';

import Alert from 'react-native-awesome-alerts'
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
    const [showAlert, setShowAlert] = useState(false);
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
                                        onPress={() => setShowAlert(true)}
                                    >
                                        <Text style={text.deleteText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <Alert
                                        show={showAlert}
                                        showProgress={false}
                                        title={`Deseja cancelar ?`}
                                        message={"Os dados digitados serão perdidos"}
                                        closeOnTouchOutside={true}
                                        closeOnHardwareBackPress={false}
                                        showCancelButton={true}
                                        showConfirmButton={true}
                                        cancelText="Não, continuar editando"
                                        confirmText="Sim, cancelar"
                                        onCancelPressed={() => setShowAlert(!showAlert)}
                                        onConfirmPressed={() => {
                                            setScreen('products')
                                        }}
                                        titleStyle={textAlert.title}
                                        messageStyle={textAlert.message}
                                        cancelButtonStyle={textAlert.btnCancel}
                                        confirmButtonStyle={textAlert.btnConfirm}

                                    />
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