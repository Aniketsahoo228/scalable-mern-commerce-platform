import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import { updateProduct as updateAdminProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "", description: "", price: 0, countInStock: 0, sku: "",
    category: "", brand: "", sizes: [], colors: [],
    collections: "", material: "", gender: "", images: [],
  });

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
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
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleArrayToggle = (field, value) => {
    const current = productData[field] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setProductData({ ...productData, [field]: updated });
  };

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

  const handleRemoveImage = (indexToRemove) => {
    setProductData({
      ...productData,
      images: productData.images.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateAdminProduct({ id, productData }));
    navigate("/admin/products");
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const colors = ["Red", "Black", "White", "Blue", "Green", "Yellow", "Gray"];
  const genders = ["Men", "Women", "Unisex"];
  const categories = ["Top Wear", "Bottom Wear"];
  const materials = ["Cotton", "Silk", "Wool", "Linen", "Denim", "Leather", "Polyester"];

  if (loading) return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#999", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase" }}>Loading...</p>
    </div>
  );

  if (error) return (
    <div style={{ background: "#f5f5f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#ef4444", fontFamily: "Inter", fontSize: 11 }}>Error: {error}</p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');
        .ep-root { font-family: 'Inter', sans-serif; }

        .ep-label {
          display: block;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 6px;
        }

        .ep-input {
          width: 100%;
          padding: 9px 12px;
          background: #f9f9fb;
          border: 1px solid #e8e8ed;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #1a1a1a;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .ep-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .ep-select {
          width: 100%;
          padding: 9px 12px;
          background: #f9f9fb;
          border: 1px solid #e8e8ed;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #1a1a1a;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }
        .ep-select:focus { border-color: #6366f1; }

        .ep-textarea {
          width: 100%;
          padding: 9px 12px;
          background: #f9f9fb;
          border: 1px solid #e8e8ed;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #1a1a1a;
          outline: none;
          resize: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
        }
        .ep-textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .ep-card {
          background: #ffffff;
          border: 1px solid #e8e8ed;
          border-radius: 10px;
          padding: 28px;
          margin-bottom: 20px;
        }

        .ep-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 20px;
        }

        .ep-card-label {
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 6px;
          display: block;
        }

        .ep-size-btn {
          padding: 7px 14px;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #e8e8ed;
          background: #f9f9fb;
          color: #666;
        }
        .ep-size-btn:hover { border-color: #6366f1; color: #6366f1; }
        .ep-size-btn.active {
          background: #6366f1;
          border-color: #6366f1;
          color: #fff;
        }

        .ep-color-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid #e8e8ed;
          background: #f9f9fb;
          color: #666;
        }
        .ep-color-btn:hover { border-color: #6366f1; }
        .ep-color-btn.active {
          border-color: #6366f1;
          background: rgba(99,102,241,0.06);
          color: #6366f1;
        }

        .ep-submit-btn {
          padding: 11px 28px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .ep-submit-btn:hover { background: #333; }

        .ep-cancel-btn {
          padding: 11px 28px;
          background: transparent;
          color: #888;
          border: 1px solid #e8e8ed;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ep-cancel-btn:hover { border-color: #1a1a1a; color: #1a1a1a; }

        .ep-file-input {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #888;
        }
        .ep-file-input::file-selector-button {
          padding: 6px 14px;
          background: #f9f9fb;
          border: 1px solid #e8e8ed;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #555;
          cursor: pointer;
          margin-right: 12px;
          transition: border-color 0.2s ease;
        }
        .ep-file-input::file-selector-button:hover { border-color: #6366f1; color: #6366f1; }
      `}</style>

      <div className="ep-root" style={{ background: "#f5f5f7", minHeight: "100vh", padding: "40px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>Admin / Products</p>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
              Edit Product
            </h1>
            <p style={{ fontSize: 11, color: "#aaa", marginTop: 6, fontFamily: "monospace" }}>#{id}</p>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Basic Info */}
            <div className="ep-card">
              <span className="ep-card-label">Section</span>
              <p className="ep-card-title">Basic Information</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div>
                  <label className="ep-label">Product Name</label>
                  <input type="text" name="name" value={productData.name} onChange={handleChange} required className="ep-input" />
                </div>
                <div>
                  <label className="ep-label">Brand</label>
                  <input type="text" name="brand" value={productData.brand} onChange={handleChange} className="ep-input" />
                </div>
                <div>
                  <label className="ep-label">Price (Rs)</label>
                  <input type="number" name="price" value={productData.price} onChange={handleChange} required className="ep-input" />
                </div>
                <div>
                  <label className="ep-label">Count In Stock</label>
                  <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} required className="ep-input" />
                </div>
                <div>
                  <label className="ep-label">SKU</label>
                  <input type="text" name="sku" value={productData.sku} onChange={handleChange} className="ep-input" />
                </div>
                <div>
                  <label className="ep-label">Collection</label>
                  <input type="text" name="collections" value={productData.collections} onChange={handleChange} className="ep-input" />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="ep-label">Description</label>
                  <textarea name="description" value={productData.description} onChange={handleChange} rows={3} className="ep-textarea" />
                </div>
              </div>
            </div>

            {/* Category Info */}
            <div className="ep-card">
              <span className="ep-card-label">Section</span>
              <p className="ep-card-title">Category Info</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
                <div>
                  <label className="ep-label">Category</label>
                  <select name="category" value={productData.category} onChange={handleChange} className="ep-select">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="ep-label">Material</label>
                  <select name="material" value={productData.material} onChange={handleChange} className="ep-select">
                    <option value="">Select material</option>
                    {materials.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="ep-label">Gender</label>
                  <select name="gender" value={productData.gender} onChange={handleChange} className="ep-select">
                    <option value="">Select gender</option>
                    {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="ep-card">
              <span className="ep-card-label">Section</span>
              <p className="ep-card-title">Sizes</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleArrayToggle("sizes", size)}
                    className={`ep-size-btn ${productData.sizes.includes(size) ? "active" : ""}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="ep-card">
              <span className="ep-card-label">Section</span>
              <p className="ep-card-title">Colors</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleArrayToggle("colors", color)}
                    className={`ep-color-btn ${productData.colors.includes(color) ? "active" : ""}`}
                  >
                    <span style={{
                      width: 12, height: 12, borderRadius: "50%",
                      background: color.toLowerCase(),
                      border: "1px solid rgba(0,0,0,0.1)",
                      flexShrink: 0,
                    }} />
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="ep-card">
              <span className="ep-card-label">Section</span>
              <p className="ep-card-title">Product Images</p>
              <input type="file" onChange={handleImageUpload} className="ep-file-input" style={{ marginBottom: 16 }} />
              {productData.images.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
                  {productData.images.map((image, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <img
                        src={image.url}
                        alt={image.altText || "Product"}
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6, border: "1px solid #e8e8ed" }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        style={{
                          fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                          color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
              <button type="submit" className="ep-submit-btn">Update Changes</button>
              <button type="button" onClick={() => navigate("/admin/products")} className="ep-cancel-btn">Cancel</button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;
