import React, { useState, useEffect } from "react";
import "./AddProduct.css";

const AddProduct = ({ addProductHandler, currentProduct, resetProduct }) => {
  const [newProduct, setNewProduct] = useState(
    currentProduct || { name: "", price: "", description: "" }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setNewProduct(currentProduct || { name: "", price: "", description: "" });
  }, [currentProduct]);

  const validate = () => {
    const errors = {};
    if (!newProduct.name.match(/^[a-zA-Z\s]+$/)) {
      errors.name = "Name can only contain letters and spaces";
    }
    if (!newProduct.price.match(/^\d+(\.\d{1,2})?$/)) {
      errors.price =
        "Price should be a number and can contain up to two decimal places";
    }
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      errors.all = "All fields are required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = () => {
    if (validate()) {
      addProductHandler(newProduct);
      setNewProduct({ name: "", price: "", description: "" });
      alert("Product added successfully");
      resetProduct();
    }
  };

  return (
    <div className="add-product">
      <h1>Add Product</h1>

      <div className="addproduct-itemfield">
        <p>Product Name</p>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div className="addproduct-itemfield">
        <p>Product Price $</p>
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
      </div>

      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        {errors.all && <p style={{ color: "red" }}>{errors.all}</p>}
      </div>

      <button className="addproduct-btn" onClick={handleAddProduct}>
        {currentProduct ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
