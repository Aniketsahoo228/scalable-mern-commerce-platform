import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser, fetchUsers, updateUser } from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }
    dispatch(fetchUsers());
  }, [dispatch, user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({ name: "", email: "", password: "", role: "customer" });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleRoleChange = (userId, newRole) => {
    const selectedUser = users.find((item) => item._id === userId);
    if (!selectedUser) return;
    dispatch(updateUser({ id: userId, name: selectedUser.name, email: selectedUser.email, role: newRole }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap');
        .um-root { font-family: 'Inter', sans-serif; }

        .um-label {
          display: block;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 6px;
        }

        .um-input {
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
        .um-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .um-select {
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
        .um-select:focus { border-color: #6366f1; }

        .um-submit-btn {
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
        .um-submit-btn:hover { background: #333; }

        .um-table { width: 100%; border-collapse: collapse; }
        .um-table thead tr { border-bottom: 1px solid #e8e8ed; }
        .um-table th {
          text-align: left;
          padding: 10px 16px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #aaa;
        }
        .um-table td {
          padding: 12px 16px;
          font-size: 12px;
          color: #444;
          border-bottom: 1px solid #f0f0f3;
        }
        .um-table tbody tr { transition: background 0.15s ease; }
        .um-table tbody tr:hover { background: #f9f9fb; }

        .um-role-select {
          padding: 4px 8px;
          background: #f5f5f7;
          border: 1px solid #e8e8ed;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #444;
          outline: none;
          cursor: pointer;
        }
        .um-role-select:focus { border-color: #6366f1; }

        .um-delete-btn {
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
        .um-delete-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
        }
      `}</style>

      <div className="um-root" style={{ background: "#f5f5f7", minHeight: "100vh", padding: "40px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>Admin</p>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 28, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
              User Management
            </h1>
          </div>

          {loading && <p style={{ fontSize: 11, color: "#999", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Loading...</p>}
          {error && <p style={{ fontSize: 11, color: "#ef4444", marginBottom: 16 }}>Error: {error}</p>}

          {/* Add User Form */}
          <div style={{ background: "#ffffff", border: "1px solid #e8e8ed", borderRadius: 10, padding: 28, marginBottom: 24 }}>
            <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 6 }}>New Entry</p>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 20 }}>
              Add New User
            </h2>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
                <div>
                  <label className="um-label">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="um-input" placeholder="Full name" />
                </div>
                <div>
                  <label className="um-label">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="um-input" placeholder="Email address" />
                </div>
                <div>
                  <label className="um-label">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required className="um-input" placeholder="Password" />
                </div>
                <div>
                  <label className="um-label">Role</label>
                  <select name="role" value={formData.role} onChange={handleChange} className="um-select">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="um-submit-btn">Add User</button>
            </form>
          </div>

          {/* Users Table */}
          <div style={{ background: "#ffffff", border: "1px solid #e8e8ed", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f3" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#aaa", marginBottom: 4 }}>Directory</p>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>All Users</h2>
            </div>
            <table className="um-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((item) => (
                    <tr key={item._id}>
                      <td style={{ color: "#1a1a1a", fontWeight: 500 }}>{item.name}</td>
                      <td style={{ color: "#888", fontSize: 11 }}>{item.email}</td>
                      <td>
                        <select
                          value={item.role}
                          onChange={(e) => handleRoleChange(item._id, e.target.value)}
                          className="um-role-select"
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(item._id)} className="um-delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "#bbb", padding: 32, fontSize: 12, letterSpacing: "0.1em" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default UserManagement;
