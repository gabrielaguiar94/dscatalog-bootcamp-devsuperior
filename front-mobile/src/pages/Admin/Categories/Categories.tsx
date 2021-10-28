import React, { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { CategoriesCard, SearchInput } from "../../../components";
import { api, deleteCategory, getCategories } from "../../../services";
import { admin, text, theme } from "../../../styles";

interface CategoryProps {
    setScreen: Function;
    setCategoryId: Function;
}

const Categories: React.FC<CategoryProps> = (props) => {
    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const { setScreen, setCategoryId } = props;

    function handleEdit(id: number) {
        setCategoryId(id);
        setScreen("editCategory");
    }

    async function handleDelete(id: number) {
        setLoading(true);
        const res = await deleteCategory(id);
        fillCategories();
    }

    async function fillCategories() {
        setLoading(true);
        const res = await api.get('categories?page=0&linesPerPage=12&direction=ASC&orderBy=name')
        setCategories(res.data.content);
        setLoading(false);
    }

    useEffect(() => {
        fillCategories();
    }, []);

    const data = search.length > 0 ?

        categories.filter(category => category.name.toLowerCase().includes(search.toLowerCase())) : categories;

    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity
                style={admin.addButton}
                activeOpacity={0.8}
                onPress={() => setScreen('newCategory')}
            >
                <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <SearchInput
                placeholder="Digite o nome da Categoria"
                search={search}
                setSearch={setSearch} />
            {loading ? (<ActivityIndicator size="large" />) :
                data.map((cat) => {
                    const { id } = cat;
                    return (
                        <CategoriesCard
                            {...cat}
                            key={id}
                            role="admin"
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )
                })
            }
        </ScrollView>
    )
};

export default Categories;