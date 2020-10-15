import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

const Products = () => {
    return (
        <div>
            <Link to="/admin/products" className="mr-5">
                Listar produtos
            </Link>
            <Link to="/admin/products/create" className="mr-5">
                Criar produto
            </Link>
            <Link to="/admin/products/10" className="mr-5">
                Editar produtos
            </Link>
            <Switch>
                <Route path="/admin/products" exact>
                    <h1> Exibir a Listagem de Produtos</h1>
                </Route>
                <Route path="/admin/products/create">
                    <h1> Criar novo Produto</h1>
                </Route>
                <Route path="/admin/products/:productId">
                    <h1> Editar um Produto</h1>
                </Route>
            </Switch>
        </div>
    );
}

export default Products