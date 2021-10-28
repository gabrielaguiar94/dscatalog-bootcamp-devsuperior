import React, { useState, useEffect } from "react";
import {
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import { SearchInput, ProductCard } from "../../../components";
import { deleteProduct, getProducts } from '../../../services';

import { text, admin } from '../../../styles';

interface ProductProps {
    setScreen: Function;
    setProductId: Function;
}

const Products: React.FC<ProductProps> = (props) => {

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { setScreen, setProductId } = props;

    function handleEdit(id: number) {
        setProductId(id);
        setScreen("editProduct");
    }

    async function handleDelete(id: number) {
        setLoading(true);
        const res = await deleteProduct(id);
        fillProducts();
    }

    async function fillProducts() {
        setLoading(true);
        const res = await getProducts();
        setProducts(res.data.content);
        setLoading(false);
    }

    useEffect(() => {
        fillProducts();
    }, []);
    const data = search.length > 0 ?

        products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) : products;

    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity
                style={admin.addButton}
                activeOpacity={0.8}
                onPress={() => setScreen('newProduct')}
            >
                <Text style={text.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
            <SearchInput search={search} setSearch={setSearch} placeholder="Nome do Produto" />
            {loading ? (<ActivityIndicator size="large" />) :
                data.map((product) => {
                    const { id } = product;
                    return (
                        <ProductCard
                            {...product}
                            key={id}
                            role="admin"
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )
                })}

        </ScrollView>
    )
};

export default Products;