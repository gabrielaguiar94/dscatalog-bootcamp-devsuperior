import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category, ProductsResponse } from "core/types/Product";
import Pagination from "core/components/Pagination";
import { makeRequest } from "core/utils/request";
import ProductCard from "./components/ProductCard";
import ProductCardLoader from "./components/Loaders/ProductCardLoader";
import ProductFilters from "core/components/ProductFilters";
import "./styles.scss";

const Catalog = () => {
  const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>();

  const getProducts = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 10,
      name,
      categoryId: category?.id,
    };
    setIsLoading(true);
    makeRequest({ url: "/products", params })
      .then((response) => setProductsResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, name, category]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleChangeName = (name: string) => {
    setActivePage(0);
    setName(name);
  };

  const handleChangeCategory = (category: Category) => {
    setActivePage(0);
    setCategory(category);
  };

  const clearFilters = () => {
    setActivePage(0);
    setCategory(undefined);
    setName("");
  };

  return (
    <div className="catalog-container">
      <div className="filter-container">
        <h1 className="catalog-title">Catálogo de Produtos</h1>
        <ProductFilters
          name={name}
          category={category}
          handleChangeCategory={handleChangeCategory}
          handleChangeName={handleChangeName}
          clearFilters={clearFilters}
        />
      </div>
      <div className="catalog-products">
        {isLoading ? (
          <ProductCardLoader />
        ) : (
          productsResponse?.content.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))
        )}
      </div>
      {productsResponse && (
        <Pagination
          totalPages={productsResponse.totalPages}          
          onChange={(page) => setActivePage(page)}
        />
      )}
    </div>
  );
};

export default Catalog;
