import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import { updateProduct as updateAdminProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [isUpdating, setIsUpdating] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  // Prevent Redux pollution / stale product flashing
  useEffect(() => {
    if (selectedProduct && selectedProduct._id === id) {
      setProductData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || 0,
        countInStock: selectedProduct.countInStock || 0,
        sku: selectedProduct.sku || "",
        category: selectedProduct.category || "",
        brand: selectedProduct.brand || "",
        sizes: selectedProduct.sizes || [],
        colors: selectedProduct.colors || [],
        collections: selectedProduct.collections || "",
        material: selectedProduct.material || "",
        gender: selectedProduct.gender || "",
        images: selectedProduct.images || [],
      });
    }
  }, [selectedProduct, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayToggle = (field, value) => {
    const current = productData[field] || [];

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setProductData((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  // Safe image upload with validation + base64
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Only images
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be under 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProductData((prev) => ({
        ...prev,
        images: [
          ...(prev.images || []),
          {
            url: reader.result,
            altText: file.name || "Product Image",
          },
        ],
      }));

      // reset input
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (indexToRemove) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUpdating(true);

      await dispatch(
        updateAdminProduct({
          id,
          productData,
        })
      );

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const colors = [
    "Red",
    "Black",
    "White",
    "Blue",
    "Green",
    "Yellow",
    "Gray",
  ];

  const genders = ["Men", "Women", "Unisex"];

  const categories = ["Top Wear", "Bottom Wear"];

  const materials = [
    "Cotton",
    "Silk",
    "Wool",
    "Linen",
    "Denim",
    "Leather",
    "Polyester",
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7]">
        <p className="font-['Inter'] text-[11px] uppercase tracking-[0.3em] text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7]">
        <p className="font-['Inter'] text-[11px] text-red-500">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-4 py-10 font-['Inter'] sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            Admin / Products
          </p>

          <h1 className="font-['Space_Grotesk'] text-3xl font-semibold text-[#1a1a1a]">
            Edit Product
          </h1>

          <p className="mt-1 font-mono text-[11px] text-gray-400">
            #{id}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Basic Information */}
          <div className="mb-5 rounded-[10px] border border-[#e8e8ed] bg-white p-7">

            <span className="mb-1 block text-[9px] uppercase tracking-[0.3em] text-gray-400">
              Section
            </span>

            <h2 className="mb-5 font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Product Name */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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
                  value={productData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Count In Stock
                </label>

                <input
                  type="number"
                  name="countInStock"
                  value={productData.countInStock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
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
                  value={productData.sku}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Collection */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Collection
                </label>

                <input
                  type="text"
                  name="collections"
                  value={productData.collections}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Description
                </label>

                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

            </div>
          </div>

          {/* Category Info */}
          <div className="mb-5 rounded-[10px] border border-[#e8e8ed] bg-white p-7">

            <span className="mb-1 block text-[9px] uppercase tracking-[0.3em] text-gray-400">
              Section
            </span>

            <h2 className="mb-5 font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
              Category Info
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Category
                </label>

                <select
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500"
                >
                  <option value="">Select category</option>

                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Material */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Material
                </label>

                <select
                  name="material"
                  value={productData.material}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500"
                >
                  <option value="">Select material</option>

                  {materials.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Gender
                </label>

                <select
                  name="gender"
                  value={productData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-indigo-500"
                >
                  <option value="">Select gender</option>

                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Sizes */}
          <div className="mb-5 rounded-[10px] border border-[#e8e8ed] bg-white p-7">

            <span className="mb-1 block text-[9px] uppercase tracking-[0.3em] text-gray-400">
              Section
            </span>

            <h2 className="mb-5 font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
              Sizes
            </h2>

            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleArrayToggle("sizes", size)}
                  className={`rounded-md border px-4 py-2 text-[11px] font-semibold tracking-[0.05em] transition-all duration-200 ${
                    productData.sizes?.includes(size)
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-[#e8e8ed] bg-[#f9f9fb] text-gray-500 hover:border-indigo-500 hover:text-indigo-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-5 rounded-[10px] border border-[#e8e8ed] bg-white p-7">

            <span className="mb-1 block text-[9px] uppercase tracking-[0.3em] text-gray-400">
              Section
            </span>

            <h2 className="mb-5 font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
              Colors
            </h2>

            <div className="flex flex-wrap gap-2">

              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleArrayToggle("colors", color)}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-[11px] transition-all duration-200 ${
                    productData.colors?.includes(color)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-500"
                      : "border-[#e8e8ed] bg-[#f9f9fb] text-gray-500 hover:border-indigo-500"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/10"
                    style={{
                      background: color.toLowerCase(),
                    }}
                  />

                  {color}
                </button>
              ))}

            </div>
          </div>

          {/* Images */}
          <div className="mb-6 rounded-[10px] border border-[#e8e8ed] bg-white p-7">

            <span className="mb-1 block text-[9px] uppercase tracking-[0.3em] text-gray-400">
              Section
            </span>

            <h2 className="mb-5 font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
              Product Images
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4 block text-[11px] text-gray-500 file:mr-4 file:rounded-md file:border file:border-[#e8e8ed] file:bg-[#f9f9fb] file:px-4 file:py-2 file:text-[10px] file:font-semibold file:uppercase file:tracking-[0.1em] file:text-gray-600 hover:file:border-indigo-500 hover:file:text-indigo-500"
            />

            {productData.images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-4">

                {productData.images.map((image, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2"
                  >
                    <img
                      src={
                        image?.url ||
                        "https://placehold.co/100x100?text=No+Image"
                      }
                      alt={image?.altText || "Product"}
                      className="h-20 w-20 rounded-md border border-[#e8e8ed] object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-[9px] uppercase tracking-[0.1em] text-red-500 transition-all duration-200 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">

            <button
              type="submit"
              disabled={isUpdating}
              className="rounded-md bg-[#1a1a1a] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "Updating..." : "Update Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="rounded-md border border-[#e8e8ed] bg-white px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 transition-all duration-200 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProductPage;