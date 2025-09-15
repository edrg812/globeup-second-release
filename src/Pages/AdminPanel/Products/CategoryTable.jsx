import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../../components/shared/Table/Table";
import TableRow from "../../../components/shared/Table/TableRow";
import { Link } from "react-router-dom";
import { FaEdit, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", slug: "", image: null });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiURL}/categories/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setCategories(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`${apiURL}/categories/${id}/delete/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Failed to delete category:", err);
      alert("Error deleting category.");
    }
  };

  const openModal = (category = null) => {
    if (category) {
      setEditCategory(category);
      setFormData({ name: category.name, slug: category.slug, image: null });
    } else {
      setEditCategory(null);
      setFormData({ name: "", slug: "", image: null });
    }
    setModalOpen(true);
  };

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setFormData({ ...formData, image: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editCategory) {
        await axios.put(`${apiURL}/categories/${editCategory.id}/update/`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(`${apiURL}/categories/create/`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Failed to save category:", err);
      alert("Error saving category.");
    }
  };

  const renderRow = (item, index) => (
    <TableRow
      key={item.id}
      cells={[
        index + 1,
        item.name,
        item.slug,
        item.image ? (
          <img
            src={`${apiURL}${item.image}`}
            alt={item.name}
            className="w-10 h-10 mx-auto rounded"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        ),
        <div className="flex justify-center gap-3">
          {item.status === "Inactive" ? (
            <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
              <FaThumbsUp />
            </button>
          ) : (
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded">
              <FaThumbsDown />
            </button>
          )}
          <button
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-transform transform hover:scale-105"
            onClick={() => openModal(item)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-transform transform hover:scale-105"
            onClick={() => deleteCategory(item.id)}
          >
            Delete
          </button>
        </div>,
      ]}
    />
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 font-semibold"
          onClick={() => openModal()}
        >
          Create Category
        </button>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <Table
          columns={["SL", "Name", "Slug", "Image", "Action"]}
          data={categories}
          renderRow={renderRow}
        />
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">{editCategory ? "Edit" : "Create"} Category</h3>
            <form onSubmit={submitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  className="w-full border px-3 py-2 rounded-lg"
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
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input type="file" name="image" onChange={handleInput} />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  {editCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
