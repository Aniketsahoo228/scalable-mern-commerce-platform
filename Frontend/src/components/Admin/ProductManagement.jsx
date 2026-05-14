import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    sku: "",
    category: "",
    collections: "",
    sizes: "",
    colors: "",
    countInStock: "",
  });

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createProduct({
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        sizes: formData.sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean),

        colors: formData.colors
          .split(",")
          .map((color) => color.trim())
          .filter(Boolean),
      })
    );

    setFormData({
      name: "",
      description: "",
      price: "",
      sku: "",
      category: "",
      collections: "",
      sizes: "",
      colors: "",
      countInStock: "",
    });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product?"
      )
    ) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-4 py-10 font-['Inter'] sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            Admin
          </p>

          <h1 className="font-['Space_Grotesk'] text-3xl font-semibold text-[#1a1a1a]">
            Product Management
          </h1>
        </div>

        {/* Loading & Error */}
        {loading && (
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-gray-400">
            Loading...
          </p>
        )}

        {error && (
          <p className="mb-4 text-[11px] text-red-500">
            Error: {error}
          </p>
        )}

        {/* Add Product Form */}
        <div className="mb-6 rounded-[10px] border border-[#e8e8ed] bg-white p-7">

          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            New Entry
          </p>

          <h2 className="mb-5 font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

              {/* Product Name */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Product name"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Price (Rs)
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="Price"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2 xl:col-span-4">
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Description
                </label>

                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Product description"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* SKU */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  SKU
                </label>

                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  placeholder="SKU code"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full cursor-pointer rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500"
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="Top Wear">
                    Top Wear
                  </option>

                  <option value="Bottom Wear">
                    Bottom Wear
                  </option>
                </select>
              </div>

              {/* Collection */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Collection
                </label>

                <input
                  type="text"
                  name="collections"
                  value={formData.collections}
                  onChange={handleChange}
                  required
                  placeholder="Collection name"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Stock
                </label>

                <input
                  type="number"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleChange}
                  required
                  placeholder="Stock quantity"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Sizes */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Sizes
                </label>

                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  required
                  placeholder="S, M, L"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Colors
                </label>

                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  required
                  placeholder="Black, White"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-md bg-[#1a1a1a] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-[#333]"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Products Table */}
        <div className="overflow-hidden rounded-[10px] border border-[#e8e8ed] bg-white">

          {/* Table Header */}
          <div className="border-b border-[#f0f0f3] px-6 py-5">
            <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
              Inventory
            </p>

            <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
              All Products
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="border-b border-[#e8e8ed]">
                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Name
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Price
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    SKU
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Category
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Stock
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="cursor-pointer border-b border-[#f0f0f3] transition-all duration-150 hover:bg-[#f9f9fb]"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-[#1a1a1a]">
                        {product.name}
                      </td>

                      <td className="px-4 py-3 text-sm font-medium text-[#1a1a1a]">
                        Rs {product.price}
                      </td>

                      <td className="px-4 py-3 font-mono text-[11px] text-gray-500">
                        {product.sku}
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-semibold tracking-[0.05em] text-indigo-500">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold ${
                            product.countInStock > 0
                              ? "border border-green-200 bg-green-50 text-green-600"
                              : "border border-red-200 bg-red-50 text-red-500"
                          }`}
                        >
                          {product.countInStock > 0
                            ? `${product.countInStock} in stock`
                            : "Out of stock"}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="mr-2 inline-block rounded border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-indigo-500 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-100"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(product._id)
                          }
                          className="rounded border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-red-500 transition-all duration-200 hover:border-red-400 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-sm tracking-[0.1em] text-gray-400"
                    >
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;