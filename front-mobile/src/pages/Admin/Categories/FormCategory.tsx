import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-tiny-toast";
import { createCategory } from "../../../services";
import { text, theme } from "../../../styles";

interface FormCategoriesProps {
    setScreen: Function;
}

const FormProduct: React.FC<FormCategoriesProps> = (props) => {
    const { setScreen } = props;
    const [loading, setLoading] = useState(false);
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
            Toast.showSuccess('Categoria criada com sucesso!!');
        } catch (error) {
            Toast.show('Erro ao salvar!');
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
}

export default FormProduct;