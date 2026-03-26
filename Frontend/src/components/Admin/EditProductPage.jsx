import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "Stylish Jacket",
    description: "A stylish jacket perfect for any occasion.",
    price: 1200,
    countInStock: 10,
    sku: "SKU-003",
    category: "Top Wear",
    brand: "FashionBrand",
    sizes: ["M", "L"],
    colors: ["Black", "Red"],
    collections: "Winter",
    material: "Leather",
    gender: "Men",
    images: [
       { url: "https://picsum.photos/150?random=1" },
       { url: "https://picsum.photos/150?random=2" },
    ], // ✅ added
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleArrayToggle = (field, value) => {
    const current = productData[field];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setProductData({ ...productData, [field]: updated });
  };

  // ✅ added
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductData({
        ...productData,
        images: [...productData.images, { url: imageUrl, altText: file.name }],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated product:", productData);
    navigate("/admin/products");
  };

  const sizes      = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors     = ["Red", "Black", "White", "Blue", "Green", "Yellow", "Gray"];
  const genders    = ["Men", "Women", "Unisex"];
  const categories = ["Top Wear", "Bottom Wear"];
  const materials  = ["Cotton", "Silk", "Wool", "Linen", "Denim", "Leather", "Polyester"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Product — #{id}</h2>

      <form onSubmit={handleSubmit}>

        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm text-gray-600 mb-1">Product Name</label>
              <input
                type="text" name="name"
                value={productData.name}
                onChange={handleChange} required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Brand</label>
              <input
                type="text" name="brand"
                value={productData.brand}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Price (₹)</label>
              <input
                type="number" name="price"
                value={productData.price}
                onChange={handleChange} required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Count In Stock</label>
              <input
                type="number" name="countInStock"
                value={productData.countInStock}
                onChange={handleChange} required
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">SKU</label>
              <input
                type="text" name="sku"
                value={productData.sku}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Collection</label>
              <input
                type="text" name="collections"
                value={productData.collections}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleChange}
                rows={3}
                className="w-full border p-2 rounded resize-none"
              />
            </div>

          </div>
        </div>

        {/* Category Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4">Category Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm text-gray-600 mb-1">Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Material</label>
              <select
                name="material"
                value={productData.material}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                {materials.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Gender</label>
              <select
                name="gender"
                value={productData.gender}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                {genders.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Sizes */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size} type="button"
                onClick={() => handleArrayToggle("sizes", size)}
                className={`px-4 py-2 rounded border text-sm font-medium transition ${
                  productData.sizes.includes(size)
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-300 hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-bold mb-4">Colors</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color} type="button"
                onClick={() => handleArrayToggle("colors", color)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border text-sm transition ${
                  productData.colors.includes(color)
                    ? "border-black bg-gray-100"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Image Upload */}
        <div className="bg-white p-6 rounded-lg  shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Upload Images</h3>
          <input type="file" onChange={handleImageUpload} className="mb-4" />
          <div className="flex gap-4 mt-2 flex-wrap">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-24 h-24 object-cover rounded-md shadow-md border"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition font-medium"
          >
            Update Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="border border-gray-300 text-gray-600 px-8 py-3 rounded hover:border-black hover:text-black transition font-medium"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditProductPage;
