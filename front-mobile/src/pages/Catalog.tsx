import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { ProductCard, SearchInput } from '../components';

import { theme } from "../styles";
import { api } from "../services";

const Catalog: React.FC = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    async function fillProducts() {
        try {
            setLoading(true);
            const res = await api.get(`/products?page=0&linesPerPage=12&direction=ASC&orderBy=name`);
            setProducts(res.data.content);
            setLoading(false);
        } catch (error) {
            console.warn(error)
        }
    }

    useEffect(() => {
        fillProducts();
    }, []);

    const data = search.length > 0 ?

        products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) : products;

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput
                placeholder="Digite o nome da Produto"
                search={search}
                setSearch={setSearch} />
            {loading ? (<ActivityIndicator size="large" />) :
                data.map((product) => (
                    <ProductCard {...product} key={product.id} />
                ))}

        </ScrollView>
    )
};

export default Catalog;