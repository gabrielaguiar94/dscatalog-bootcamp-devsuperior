import React, { useState } from "react";
import Alert from 'react-native-awesome-alerts'
import { Text, View } from "react-native";
import { ListItem } from 'react-native-elements'
import { TouchableOpacity } from "react-native-gesture-handler";
import { text, theme, textAlert } from "../styles";

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
    const [showAlert, setShowAlert] = useState(false);

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
                            onPress={() => setShowAlert(true)}
                        >
                            <Text style={text.deleteText} > Excluir</Text>
                        </TouchableOpacity>
                        <Alert
                            show={showAlert}
                            showProgress={false}
                            title={`Deseja realmente excluir o usuário ${firstName} ${lastName} ?`}
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
