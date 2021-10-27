import React, { useState } from "react";

import { View } from "react-native";
import { TabBar } from "../../components";

import Categories from "./Categories";
//Products
import ListProducts from "./Products/ListProducts";
import FormProducts from "./Products/FormProducts";
import EditProducts from "./Products/EditProducts";
import Users from "./Users";

const DashBoard: React.FC = () => {
    const [screen, setScreen] = useState("products");
    const [productId, setProductId] = useState(0);

    return (
        <View>
            <TabBar screen={screen} setScreen={setScreen} />
            {screen === 'products' && (
                <ListProducts setScreen={setScreen} setProductId={setProductId} />
            )}
            {screen === 'newProduct' && (
                <FormProducts setScreen={setScreen} />
            )}
            {screen === 'editProduct' && (
                <EditProducts setScreen={setScreen} productId={productId} />
            )}
            {screen === 'categories' && <Categories />}
            {screen === 'users' && <Users />}
        </View>
    )
}

export default DashBoard;