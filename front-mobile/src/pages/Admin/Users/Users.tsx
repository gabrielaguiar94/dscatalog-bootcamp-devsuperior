import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SearchInput } from "../../../components";
import UsersCard from "../../../components/UsersCard";
import { deleteUser, getUsers } from "../../../services";
import { admin, text } from "../../../styles";

interface UsersProps {
    setScreen: Function;
    setUserId: Function;
}

const Users: React.FC<UsersProps> = (props) => {
    const [search, setSearch] = useState('');
    const { setScreen, setUserId } = props;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);


    function handleEdit(id: number) {
        setUserId(id);
        setScreen("editUser");
    }

    async function handleDelete(id: number) {
        setLoading(true);
        const res = await deleteUser(id);
        fillUsers();
    }

    async function fillUsers() {
        setLoading(true);
        const res = await getUsers();
        setUsers(res.data.content);
        setLoading(false);
    }

    useEffect(() => {
        fillUsers();
    }, []);

    const usersList = [
        {
            id: 1,
            firstName: "Alex",
            lastName: "Brown",
            email: "alex@gmail.com",
            roles: [
                {
                    id: 1,
                    authority: "ROLE_OPERATOR"
                }
            ]
        },
        {
            id: 2,
            firstName: "Maria",
            lastName: "Silva",
            email: "maria@gmail.com",
            roles: [
                {
                    id: 1,
                    authority: "ROLE_ADMIN"
                },
                {
                    id: 2,
                    authority: "ROLE_OPERATOR"
                }
            ]
        },
        {
            id: 3,
            firstName: "Gabriel",
            lastName: "Aguiar",
            email: "alex@gmail.com",
            roles: [
                {
                    id: 1,
                    authority: "ROLE_ADMIN"
                },
                {
                    id: 2,
                    authority: "ROLE_OPERATOR"
                }
            ]
        },
    ]

    const data = search.length > 0 ?

        users.filter(user => user.firstName.toLowerCase().includes(search.toLowerCase())) : users;
    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity
                style={admin.addButton}
                activeOpacity={0.8}
                onPress={() => setScreen('newUser')}
            >
                <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <SearchInput
                placeholder="Digite o nome do Usuário"
                search={search}
                setSearch={setSearch}
            />
            {
                loading ? (<ActivityIndicator size="large" />) :
                    data.map((user) => {
                        const { id } = user;
                        return (
                            <UsersCard
                                {...user}
                                key={id}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                        )
                    })}
        </ScrollView>
    )
};

export default Users;