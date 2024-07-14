import React, { useState, useEffect } from "react";
import "./EditProduct.css";

const EditProduct = ({ products, updateProductHandler }) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const product = products.find((p) => p.name === selectedProduct);
    if (product) {
      setProductDetails(product);
    } else {
      setProductDetails({ name: "", price: "", description: "" });
    }
  }, [selectedProduct, products]);

  const validate = () => {
    const errors = {};
    if (!productDetails.name.match(/^[a-zA-Z\s]+$/)) {
      errors.name = "Name can only contain letters and spaces";
    }
    if (!productDetails.price.match(/^\d+(\.\d{1,2})?$/)) {
      errors.price =
        "Price should be a number and can contain up to two decimal places";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProduct = () => {
    if (validate()) {
      updateProductHandler(selectedProduct, productDetails);
      setProductDetails({ name: "", price: "", description: "" });
      alert("Product updated successfully");
      setSelectedProduct("");
    }
  };

  return (
    <div className="edit-product">
      <h1>Edit Product</h1>

      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="">Select a product</option>
        {products.map((product, index) => (
          <option key={index} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>

      {selectedProduct && (
        <>
          <div className="editproduct-itemfield">
            <p>Product Name</p>
            <input
              type="text"
              placeholder="Name"
              value={productDetails.name}
              onChange={(e) =>
                setProductDetails({ ...productDetails, name: e.target.value })
              }
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div className="editproduct-itemfield">
            <p>Product Price</p>
            <input
              type="text"
              placeholder="Price"
              value={productDetails.price}
              onChange={(e) =>
                setProductDetails({ ...productDetails, price: e.target.value })
              }
            />
            {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
          </div>

          <div className="editproduct-itemfield">
            <p>Product Description</p>
            <input
              type="text"
              placeholder="Description"
              value={productDetails.description}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  description: e.target.value,
                })
              }
            />
          </div>

          <button className="editproduct-btn" onClick={handleUpdateProduct}>
            Update Product
          </button>
        </>
      )}
    </div>
  );
};

export default EditProduct;
