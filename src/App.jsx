import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import DisplayProducts from "./Pages/DisplayProducts/DisplayProducts";
import EditProduct from "./Pages/EditProduct/EditProduct";
import Sidebar from "./Components/Sidebar/Sidebar";
import AddProduct from "./Pages/AddProduct/AddProduct";

const App = () => {
  const [products, setProducts] = useState([]);

  const addProductHandler = (product) => {
    setProducts([...products, product]);
  };

  const updateProductHandler = (oldProductName, updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.name === oldProductName ? updatedProduct : product
    );
    setProducts(updatedProducts);
  };

  const deleteProductHandler = (product) => {
    setProducts(products.filter((p) => p !== product));
  };

  return (
    <Router>
      <div className="admin">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route
              path="/add-product"
              element={<AddProduct addProductHandler={addProductHandler} />}
            />

            <Route
              path="/display-products"
              element={
                <DisplayProducts
                  products={products}
                  deleteProductHandler={deleteProductHandler}
                />
              }
            />

            <Route
              path="/edit-product"
              element={
                <EditProduct
                  products={products}
                  updateProductHandler={updateProductHandler}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
