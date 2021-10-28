import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, ActivityIndicator, Alert } from "react-native";
import { text, theme } from "../../../styles";
import arrow from '../../../assets/leftarrow.png';
import { TextInput } from "react-native-gesture-handler";
import { getCategories, getCategory, updateCategory } from "../../../services";
import Toast from "react-native-tiny-toast";

interface EditCategoryProps {
    setScreen: Function;
    categoryId: number;
}

const EditCategory: React.FC<EditCategoryProps> = (props) => {
    const { setScreen, categoryId } = props;
    const [loading, setLoading] = useState(false);
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
            Toast.showSuccess('Categoria atualizada com sucesso!!')
        } catch (error) {
            console.warn(error)
            Toast.show('Erro ao atualizar categoria');
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
                                                onPress: () => setScreen('categories'),
                                                style: 'default'
                                            }
                                        ])}
                                >
                                    <Text style={text.deleteText}>Cancelar</Text>
                                </TouchableOpacity>
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