import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { text, theme } from "../styles";

interface CategoriesProps {
    id: number;
    name: string;
    role?: string;
    handleEdit: Function;
    handleDelete: Function;
}

const CategoriesCard: React.FC<CategoriesProps> = ({ id, name, role, handleEdit, handleDelete }) => {
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
                        onPress={() => handleDelete(id)}
                    >
                        <Text style={text.deleteText} > Excluir</Text>
                    </TouchableOpacity>
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