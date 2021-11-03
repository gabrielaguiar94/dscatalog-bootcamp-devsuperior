import React, { useState } from "react";
import { Text, View } from "react-native";
import { ListItem } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";
import { text, theme } from "../styles";

interface UsersProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: [{
        id: number,
        authority: string,
    }];
    handleEdit: Function;
    handleDelete: Function;
}

const UsersCard: React.FC<UsersProps> = ({ id, firstName, lastName, email, roles, handleDelete, handleEdit }) => {
    const role = 'admin';
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={[theme.usersCard, expanded ? { height: 300 } : {}]}>
            <Text style={text.userName}> {firstName} {lastName}</Text>
            <Text style={text.userEmail}>{email}</Text>
            <ListItem.Accordion
                content={
                    <>
                        <ListItem.Content>
                            <ListItem.Title>
                                Roles
                            </ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
                style={{ marginRight: 225 }}
            >
                {
                    roles.map((role) => (
                        <ListItem key={role.id}>
                            <ListItem.Content>
                                <ListItem.Title>{role.authority.toLowerCase()}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
            </ListItem.Accordion>
            {
                role === 'admin' && (
                    <View style={theme.usersContainer}>
                        <TouchableOpacity
                            style={theme.deleteUserBtn}
                            activeOpacity={0.8}
                            onPress={() => handleDelete(id)}
                        >
                            <Text style={text.deleteText} > Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={theme.editUserBtn}
                            activeOpacity={0.8}
                            onPress={() => handleEdit(id)}
                        >
                            <Text style={text.editText}> Editar</Text>
                        </TouchableOpacity>
                    </View>
                )
            }


        </View >
    )
};

export default UsersCard;
