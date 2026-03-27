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
  const { products, loading, error } = useSelector((state) => state.adminProducts);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock),
        sizes: formData.sizes.split(",").map((size) => size.trim()).filter(Boolean),
        colors: formData.colors.split(",").map((color) => color.trim()).filter(Boolean),
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
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');
        .pm-root { font-family: 'Inter', sans-serif; }

        .pm-label {
          display: block;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 6px;
        }

        .pm-input {
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
        .pm-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .pm-select {
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
        .pm-select:focus { border-color: #6366f1; }

        .pm-submit-btn {
          padding: 10px 24px;
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
        .pm-submit-btn:hover { background: #333; }

        .pm-table { width: 100%; border-collapse: collapse; }
        .pm-table thead tr { border-bottom: 1px solid #e8e8ed; }
        .pm-table th {
          text-align: left;
          padding: 10px 16px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #aaa;
        }
        .pm-table td {
          padding: 12px 16px;
          font-size: 12px;
          color: #444;
          border-bottom: 1px solid #f0f0f3;
        }
        .pm-table tbody tr { transition: background 0.15s ease; cursor: pointer; }
        .pm-table tbody tr:hover { background: #f9f9fb; }

        .pm-edit-btn {
          display: inline-block;
          padding: 4px 12px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 4px;
          color: #6366f1;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          margin-right: 8px;
          transition: all 0.2s ease;
        }
        .pm-edit-btn:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
        }

        .pm-delete-btn {
          padding: 4px 12px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 4px;
          color: #ef4444;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pm-delete-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
        }

        .pm-stock-badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
      `}</style>

      <div className="pm-root" style={{ background: "#f5f5f7", minHeight: "100vh", padding: "40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>Admin</p>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
              Product Management
            </h1>
          </div>

          {loading && <p style={{ fontSize: 11, color: "#999", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Loading...</p>}
          {error && <p style={{ fontSize: 11, color: "#ef4444", marginBottom: 16 }}>Error: {error}</p>}

          {/* Add Product Form */}
          <div style={{ background: "#ffffff", border: "1px solid #e8e8ed", borderRadius: 10, padding: 28, marginBottom: 24 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>New Entry</p>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 20 }}>
              Add New Product
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
                <div>
                  <label className="pm-label">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="pm-input" placeholder="Product name" />
                </div>
                <div>
                  <label className="pm-label">Price (Rs)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required className="pm-input" placeholder="Price" />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="pm-label">Description</label>
                  <input type="text" name="description" value={formData.description} onChange={handleChange} required className="pm-input" placeholder="Product description" />
                </div>
                <div>
                  <label className="pm-label">SKU</label>
                  <input type="text" name="sku" value={formData.sku} onChange={handleChange} required className="pm-input" placeholder="SKU code" />
                </div>
                <div>
                  <label className="pm-label">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="pm-select">
                    <option value="">Select category</option>
                    <option value="Top Wear">Top Wear</option>
                    <option value="Bottom Wear">Bottom Wear</option>
                  </select>
                </div>
                <div>
                  <label className="pm-label">Collection</label>
                  <input type="text" name="collections" value={formData.collections} onChange={handleChange} required className="pm-input" placeholder="Collection name" />
                </div>
                <div>
                  <label className="pm-label">Stock</label>
                  <input type="number" name="countInStock" value={formData.countInStock} onChange={handleChange} required className="pm-input" placeholder="Stock quantity" />
                </div>
                <div>
                  <label className="pm-label">Sizes</label>
                  <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} required className="pm-input" placeholder="S, M, L" />
                </div>
                <div>
                  <label className="pm-label">Colors</label>
                  <input type="text" name="colors" value={formData.colors} onChange={handleChange} required className="pm-input" placeholder="Black, White" />
                </div>
              </div>
              <button type="submit" className="pm-submit-btn">Add Product</button>
            </form>
          </div>

          {/* Products Table */}
          <div style={{ background: "#ffffff", border: "1px solid #e8e8ed", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f3" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 4 }}>Inventory</p>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>All Products</h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="pm-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product._id}>
                        <td style={{ color: "#1a1a1a", fontWeight: 500 }}>{product.name}</td>
                        <td style={{ color: "#1a1a1a", fontWeight: 500 }}>Rs {product.price}</td>
                        <td style={{ color: "#888", fontFamily: "monospace", fontSize: 11 }}>{product.sku}</td>
                        <td>
                          <span style={{
                            display: "inline-block",
                            padding: "2px 10px",
                            borderRadius: "999px",
                            fontSize: 10,
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            background: "rgba(99,102,241,0.08)",
                            color: "#6366f1",
                            border: "1px solid rgba(99,102,241,0.15)",
                          }}>
                            {product.category}
                          </span>
                        </td>
                        <td>
                          <span style={{
                            display: "inline-block",
                            padding: "2px 10px",
                            borderRadius: "999px",
                            fontSize: 10,
                            fontWeight: 600,
                            background: product.countInStock > 0 ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
                            color: product.countInStock > 0 ? "#16a34a" : "#ef4444",
                            border: `1px solid ${product.countInStock > 0 ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
                          }}>
                            {product.countInStock > 0 ? `${product.countInStock} in stock` : "Out of stock"}
                          </span>
                        </td>
                        <td>
                          <Link to={`/admin/products/${product._id}/edit`} className="pm-edit-btn">Edit</Link>
                          <button onClick={() => handleDelete(product._id)} className="pm-delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center", color: "#bbb", padding: 32, fontSize: 12, letterSpacing: "0.1em" }}>
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
    </>
  );
};

export default ProductManagement;
