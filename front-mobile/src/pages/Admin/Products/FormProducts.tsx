import React, { useState, useEffect } from "react";

import Toast from 'react-native-toast-message';

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    ActivityIndicator
} from "react-native";
import Alert from 'react-native-awesome-alerts'
import * as ImagePicker from 'expo-image-picker';
import { TextInputMask } from "react-native-masked-text";
import arrow from '../../../assets/leftarrow.png';
import { createProduct, getCategories, uploadImage } from "../../../services";
import { theme, text, textAlert } from "../../../styles";

interface FormProductProps {
    setScreen: Function;
}

const FormProducts: React.FC<FormProductProps> = (props) => {
    const { setScreen } = props;
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        imgUrl: " ",
        price: "",
        categories: []
    });
    const [image, setImage] = useState('');

    useEffect(() => {
        async () => {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status != 'granted') {
                <Alert
                    show={showAlert}
                    showProgress={false}
                    title={"Erro ao acessar biblioteca de imagens"}
                    message={"Precisamos acessar suas imagens para carregá-las"}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                />
            }
        }

    }, [])

    async function selectImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        !result.cancelled && setImage(result.uri);

    }

    async function handleUpload() {
        uploadImage(image).then((res) => {
            const { uri } = res?.data;
            setProduct({ ...product, imgUrl: uri })
        });
    }

    useEffect(() => {
        image ? handleUpload() : null;
    }, [image]);

    function handleSave() {
        newProduct();
    }

    async function newProduct() {
        setLoading(true)
        const cat = replaceCategory();
        const data = {
            ...product,
            price: getRaw(),
            categories: [
                {
                    id: cat
                },
            ],
        };
        try {
            await createProduct(data);
            setScreen('products');
            Toast.show({
                type: 'success',
                text1: 'Produto salvo com sucesso',
                text2: `Produto ${product.name} criado! 😀`
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `Erro ao salvar o produto ${product.name}`,
                text2: 'Verifique os dados digitados e tente novamente 😔',
            })
        }
        setLoading(false);
    }

    function replaceCategory() {
        const cat = categories.find(category => category.name === product.categories);

        return cat.id;
    }

    async function loadCategories() {
        setLoading(true);
        const res = await getCategories();
        setCategories(res.data.content);
        setLoading(false);
    }

    function getRaw() {
        const str = product.price;
        const res = str.slice(2).replace(/\./g, "").replace(/,/g, ".");
        return res;
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <View style={theme.formContainer}>
            {
                loading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <View style={theme.formCard}>
                        <ScrollView>
                            <Modal
                                visible={showCategories}
                                animationType="fade"
                                transparent={true}
                                presentationStyle="overFullScreen"
                            >
                                <View style={theme.modalContainer}>
                                    <ScrollView contentContainerStyle={theme.modalContent}>
                                        {categories.map(cat => (
                                            <TouchableOpacity
                                                key={cat.id}
                                                style={theme.modalItem}
                                                onPress={() => {
                                                    setProduct({ ...product, categories: cat.name });
                                                    setShowCategories(!showCategories);
                                                }}>
                                                <Text>{cat.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            </Modal>
                            <TouchableOpacity onPress={() => setScreen('products')} style={theme.goBackContainer}>
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Nome do Produto"
                                style={theme.formInput}
                                value={product.name}
                                onChangeText={(e) => setProduct({ ...product, name: e })}
                            />
                            <TouchableOpacity
                                onPress={() => setShowCategories(!showCategories)}
                                style={theme.selectInput}
                            >
                                <Text style={product.categories.length === 0 && { color: '#CECECE' }}>
                                    {product.categories.length === 0
                                        ? "Escolha uma categoria"
                                        : product.categories}
                                </Text>
                            </TouchableOpacity>
                            <TextInputMask
                                type={"money"}
                                placeholder="Preço"
                                style={theme.formInput}
                                value={product.price}
                                onChangeText={(e) => setProduct({ ...product, price: (e) })}
                            />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={theme.uploadBtn}
                                onPress={() => selectImage()}
                            >
                                <Text style={text.uploadText}>Carregar Imagem</Text>
                            </TouchableOpacity>
                            <Text style={text.fileSize}> As imagens devem estar no formato JPG ou PNG e não devem ultrapassar 5 mb.</Text>
                            {
                                image !== "" && (
                                    <TouchableOpacity onPress={selectImage} activeOpacity={0.9} style={{
                                        width: '100%',
                                        height: 150,
                                        borderRadius: 10,
                                        marginVertical: 10
                                    }}>
                                        <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                                    </TouchableOpacity>
                                )
                            }
                            <TextInput
                                multiline placeholder="Descrição"
                                style={theme.textArea}
                                value={product.description}
                                onChangeText={(e) => setProduct({ ...product, description: e })}
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
};

export default FormProducts;