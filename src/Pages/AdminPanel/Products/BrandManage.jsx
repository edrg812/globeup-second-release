import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

const BrandManage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBrand, setEditBrand] = useState(null);
  const [formData, setFormData] = useState({ name: "", slug: "", brand_img: null });

  // Fetch brands
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiURL}/brands/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setBrands(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch brands:", err);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Delete brand
  const deleteBrand = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      await axios.delete(`${apiURL}/brands/${id}/delete/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setBrands(brands.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete brand:", err);
      alert("Error deleting brand.");
    }
  };

  // Open modal for create or edit
  const openModal = (brand = null) => {
    if (brand) {
      setEditBrand(brand);
      setFormData({ name: brand.name, slug: brand.slug, brand_img: null });
    } else {
      setEditBrand(null);
      setFormData({ name: "", slug: "", brand_img: null });
    }
    setModalOpen(true);
  };

  // Handle form input
  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "brand_img") setFormData({ ...formData, brand_img: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  // Submit form (create/update)
  const submitForm = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    if (formData.brand_img) data.append("brand_img", formData.brand_img);

    try {
      if (editBrand) {
        await axios.put(`${apiURL}/brands/${editBrand.id}/update/`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(`${apiURL}/brands/create/`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setModalOpen(false);
      fetchBrands();
    } catch (err) {
      console.error("Failed to save brand:", err);
      alert("Error saving brand.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Brand Manage</h2>
        <button
          onClick={() => openModal()}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Create
        </button>
      </div>

      {/* Brands Table */}
      {loading ? (
        <p>Loading brands...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">SL</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Slug</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr key={brand.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{brand.name}</td>
                  <td className="border p-2">{brand.slug}</td>
                  <td className="border p-2">
                    {brand.brand_img ? (
                      <img
                        src={`${apiURL}${brand.brand_img}`}
                        alt={brand.name}
                        className="w-12 h-12 mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="border p-2 flex justify-center space-x-2">
                    <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
                      <FaEye size={16} />
                    </button>
                    <button
                      className="bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
                      onClick={() => openModal(brand)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="bg-red-500 text-white p-3 rounded hover:bg-red-600"
                      onClick={() => deleteBrand(brand.id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{editBrand ? "Edit" : "Create"} Brand</h3>
            <form onSubmit={submitForm} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInput}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input type="file" name="brand_img" onChange={handleInput} />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  {editBrand ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandManage;
