import { useState } from "react";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    { _id: "1001", name: "Shirt",        price: 110,  sku: "SKU-001", category: "Top Wear",    stock: 25 },
    { _id: "1002", name: "Jeans",        price: 299,  sku: "SKU-002", category: "Bottom Wear", stock: 15 },
    { _id: "1003", name: "Jacket",       price: 499,  sku: "SKU-003", category: "Top Wear",    stock: 10 },
    { _id: "1004", name: "Shorts",       price: 149,  sku: "SKU-004", category: "Bottom Wear", stock: 30 },
    { _id: "1005", name: "Formal Shirt", price: 199,  sku: "SKU-005", category: "Top Wear",    stock: 20 },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    sku: "",
    category: "Top Wear",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      _id: Date.now().toString(),
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };
    setProducts([...products, newProduct]);
    setFormData({ name: "", price: "", sku: "", category: "Top Wear", stock: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product with id:", id);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      {/* Add New Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-bold mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
                placeholder="Product name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
                placeholder="Price"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">SKU</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
                placeholder="SKU code"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Top Wear">Top Wear</option>
                <option value="Bottom Wear">Bottom Wear</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
                placeholder="Stock quantity"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">₹{product.price}</td>
                  <td className="py-3 px-4">{product.sku}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ProductManagement;