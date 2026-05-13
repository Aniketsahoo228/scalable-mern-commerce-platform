import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addUser(formData));

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleRoleChange = (userId, newRole) => {
    const selectedUser = users.find(
      (item) => item._id === userId
    );

    if (!selectedUser) return;

    dispatch(
      updateUser({
        id: userId,
        name: selectedUser.name,
        email: selectedUser.email,
        role: newRole,
      })
    );
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
            User Management
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

        {/* Add User Form */}
        <div className="mb-6 rounded-[10px] border border-[#e8e8ed] bg-white p-7">
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            New Entry
          </p>

          <h2 className="mb-5 font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
            Add New User
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

              {/* Name */}
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
                  placeholder="Full name"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email address"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-md border border-[#e8e8ed] bg-[#f9f9fb] px-3 py-2.5 text-sm text-[#1a1a1a] outline-none transition-all duration-200 focus:border-indigo-500"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="rounded-md bg-[#1a1a1a] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:bg-[#333]"
            >
              Add User
            </button>
          </form>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-[10px] border border-[#e8e8ed] bg-white">

          {/* Table Header */}
          <div className="border-b border-[#f0f0f3] px-6 py-5">
            <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
              Directory
            </p>

            <h2 className="font-['Space_Grotesk'] text-lg font-semibold text-[#1a1a1a]">
              All Users
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
                    Email
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Role
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-[#f0f0f3] transition-all duration-150 hover:bg-[#f9f9fb]"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-[#1a1a1a]">
                        {item.name}
                      </td>

                      <td className="px-4 py-3 text-[11px] text-gray-500">
                        {item.email}
                      </td>

                      <td className="px-4 py-3">
                        <select
                          value={item.role}
                          onChange={(e) =>
                            handleRoleChange(
                              item._id,
                              e.target.value
                            )
                          }
                          className="cursor-pointer rounded border border-[#e8e8ed] bg-[#f5f5f7] px-2 py-1 text-[11px] text-gray-700 outline-none focus:border-indigo-500"
                        >
                          <option value="customer">
                            Customer
                          </option>

                          <option value="admin">
                            Admin
                          </option>
                        </select>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          onClick={() =>
                            handleDelete(item._id)
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
                      colSpan={4}
                      className="px-4 py-8 text-center text-sm tracking-[0.1em] text-gray-400"
                    >
                      No users found
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

export default UserManagement;