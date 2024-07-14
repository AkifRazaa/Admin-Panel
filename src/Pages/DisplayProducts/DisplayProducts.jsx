import React, { useState } from "react";
import "./DisplayProducts.css";

const DisplayProducts = ({ products, deleteProductHandler }) => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="display-product">
      <h1>All Products List</h1>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => deleteProductHandler(product)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayProducts;
