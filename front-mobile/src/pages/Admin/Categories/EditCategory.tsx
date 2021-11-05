import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, ActivityIndicator, TextInput } from "react-native";
import Alert from 'react-native-awesome-alerts'
import { text, theme, textAlert } from "../../../styles";
import arrow from '../../../assets/leftarrow.png';
import { getCategory, updateCategory } from "../../../services";
import Toast from 'react-native-toast-message';

interface EditCategoryProps {
    setScreen: Function;
    categoryId: number;
}

const EditCategory: React.FC<EditCategoryProps> = (props) => {
    const { setScreen, categoryId } = props;
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [category, setCategory] = useState({
        name: ""
    });

    async function handleSave() {
        setLoading(true);
        const data = {
            ...category,
        }
        try {
            await updateCategory(data);
            setScreen('categories')
            Toast.show({
                type: 'success',
                text1: 'Categoria salva com sucesso',
                text2: `Categoria ${category.name} modificada! 😀`
            })
        } catch (error) {
            console.warn(error)
            Toast.show({
                type: 'error',
                text1: `Erro ao salvar categoria ${category.name}`,
                text2: 'Verifique os dados digitados e tente novamente 😔',
            })
        }
        setLoading(false);
    };

    async function loadCategory() {
        setLoading(true);
        const res = await getCategory(categoryId);
        setCategory(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadCategory();
    }, []);

    return (
        <View style={theme.formContainer}>
            {
                loading ? (
                    <ActivityIndicator size="large" />
                ) :
                    (
                        <View style={theme.formCategoryCard}>
                            <TouchableOpacity
                                onPress={() => setScreen('categories')}
                                style={theme.goBackContainer}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <View style={{ paddingBottom: 50 }}>
                                <TextInput
                                    placeholder="Nome da Categoria"
                                    style={theme.formInput}
                                    value={category.name}
                                    onChangeText={(e) => setCategory({ ...category, name: e })}
                                />
                            </View>
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
                                    title={`Cancelar edição da categoria ${category.name} ?`}
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
};

export default EditCategory;