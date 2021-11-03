import React, { useState } from "react";
import Alert from 'react-native-awesome-alerts'
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { text, theme, textAlert } from "../styles";
interface CategoriesProps {
    id: number;
    name: string;
    role?: string;
    handleEdit: Function;
    handleDelete: Function;
}

const CategoriesCard: React.FC<CategoriesProps> = ({ id, name, role, handleEdit, handleDelete }) => {
    const [showAlert, setShowAlert] = useState(false);
    return (
        <TouchableOpacity
            style={theme.categoriesCard}
            activeOpacity={0.7}
        >
            <Text style={text.categoryName}>{name}</Text>
            {role === 'admin' && (
                <View style={theme.categoriesContainer}>
                    <TouchableOpacity
                        style={theme.deleteCardBtn}
                        activeOpacity={0.8}
                        onPress={() => setShowAlert(true)}
                    >
                        <Text style={text.deleteText} > Excluir</Text>
                    </TouchableOpacity>
                    <Alert
                        show={showAlert}
                        showProgress={false}
                        title={`Deseja excluir a categoria ${name} ?`}
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
                        style={theme.editCardBtn}
                        activeOpacity={0.8}
                        onPress={() => handleEdit(id)}
                    >
                        <Text style={text.editText}> Editar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default CategoriesCard;