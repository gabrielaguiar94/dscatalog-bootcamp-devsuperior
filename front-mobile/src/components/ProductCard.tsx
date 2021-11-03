import React, { useState } from "react";
import Alert from 'react-native-awesome-alerts'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from "react-native-masked-text";
import { text, textAlert, theme } from "../styles";

interface ProductProps {
    id: number;
    imgUrl: string;
    name: String;
    price: string;
    role?: string;
    handleDelete: Function;
    handleEdit: Function;
}

const ProductCard: React.FC<ProductProps> = (
    {
        id,
        imgUrl,
        name,
        price,
        role,
        handleDelete,
        handleEdit,
    }
) => {
    const navigation = useNavigation();
    const [showAlert, setShowAlert] = useState(false);

    return (
        <TouchableOpacity
            style={theme.productCard}
            onPress={() =>
                role ? "" : navigation.navigate('ProductDetails', { id })
            }
        >
            <Image source={{ uri: imgUrl }} style={theme.productImage} />
            <View style={theme.productDescription}>
                <Text style={text.productName}>{name}</Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <TextInputMask
                        type="money"
                        options={{
                            precision: 2,
                            separator: ",",
                            delimiter: ".",
                            unit: " ",
                            suffixUnit: "",
                        }}
                        value={price}
                        editable={false}
                        style={text.productPrice}
                    />
                </View>

                {
                    role === 'admin' && (
                        <View style={theme.buttonContainer}>
                            <TouchableOpacity
                                style={theme.deleteBtn}
                                onPress={() => setShowAlert(true)}
                            >
                                <Text style={text.deleteText}>Excluir</Text>
                            </TouchableOpacity>
                            <Alert
                                show={showAlert}
                                showProgress={false}
                                title={`Deseja realmente excluir o produto ${name} ?`}
                                message={"Esta ação não poderá ser desfeita"}
                                closeOnTouchOutside={true}
                                closeOnHardwareBackPress={false}
                                showCancelButton={true}
                                showConfirmButton={true}
                                cancelText="Não"
                                confirmText="Sim"
                                onCancelPressed={() => setShowAlert(!showAlert)}
                                onConfirmPressed={() => {
                                    handleDelete(id)
                                }}
                                titleStyle={textAlert.title}
                                messageStyle={textAlert.message}
                                cancelButtonStyle={textAlert.btnCancel}
                                confirmButtonStyle={textAlert.btnConfirmDelete}
                            />
                            <TouchableOpacity
                                style={theme.editBtn}
                                onPress={() => handleEdit(id)}
                            >
                                <Text style={text.editText}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard;