import React, { useState } from "react";

import { View } from "react-native";
import { TabBar } from "../../components";

import Categories from "./Categories";
//Products
import ListProducts from "./Products/ListProducts";
import FormProducts from "./Products/FormProducts";
import Users from "./Users";

const DashBoard: React.FC = () => {
    const [screen, setScreen] = useState("products");
    return (
        <View>
            <TabBar screen={screen} setScreen={setScreen} />
            {screen === 'products' && <ListProducts setScreen={setScreen} />}
            {screen === 'newProduct' && <FormProducts setScreen={setScreen} />}
            {screen === 'categories' && <Categories />}
            {screen === 'users' && <Users />}
        </View>
    )
}

export default DashBoard;