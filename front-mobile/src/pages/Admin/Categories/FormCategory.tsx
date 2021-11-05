import React, { useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import Alert from 'react-native-awesome-alerts'
import Toast from 'react-native-toast-message';
import { createCategory } from "../../../services";
import { text, theme, textAlert } from "../../../styles";

interface FormCategoriesProps {
    setScreen: Function;
}

const FormProduct: React.FC<FormCategoriesProps> = (props) => {
    const { setScreen } = props;
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [category, setCategory] = useState({
        name: ""
    });

    function handleSave() {
        newCategory();
    }

    async function newCategory() {
        setLoading(true)
        const data = {
            ...category,
        };

        try {
            await createCategory(data);
            setScreen('categories');
            Toast.show({
                type: 'success',
                text1: 'Categoria criada com sucesso',
                text2: `Categoria ${category.name} criada! 😀`
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `Erro ao criar a categoria ${category.name}`,
                text2: 'Verifique os dados digitados e tente novamente 😔',
            })
        }
        setLoading(false);
    }
    return (
        <View style={theme.formContainer}>
            {
                loading ?
                    (<ActivityIndicator size="large" />) :
                    (
                        <View style={theme.formCategoryCard}>
                            <TextInput
                                placeholder="Nome da Categoria"
                                style={theme.formInput}
                                value={category.name}
                                onChangeText={(e) => setCategory({ ...category, name: e })}
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
                                        setScreen('categories')
                                    }}
                                    titleStyle={textAlert.title}
                                    messageStyle={textAlert.message}
                                    cancelButtonStyle={textAlert.btnCancel}
                                    confirmButtonStyle={textAlert.btnConfirm}
                                />
                                <TouchableOpacity
                                    style={theme.saveCardBtn}
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

export default FormProduct;