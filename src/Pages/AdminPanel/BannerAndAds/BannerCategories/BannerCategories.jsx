import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../../../components/shared/Table/Table";
import BasicModal from "../../../../components/shared/BasicModal";
import renderBannerCategoryRow from "../../../../components/AdminPanel/BannersAndAds/BannerCategories/renderBannerCategoriesRow";

const BannerCategories = () => {
  const [bannerCategories, setBannerCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [formState, setFormState] = useState({
    label: "",
    url: "",
    image: null,
    preview: "",
    is_active: true,
  });

  const columns = ["SL", "Image", "Name", "URL", "Status", "Action"];
  const api_host = import.meta.env.VITE_REACT_APP_API_URL;

  // Fetch data on mount
  useEffect(() => {
    fetchBannerCategories();
  }, []);

  const fetchBannerCategories = () => {
    axios
      .get(`${api_host}/banner/get_all_banners/`)
      .then((res) => {
        setBannerCategories(res.data);
      })
      .catch((err) => console.error(err));
  };

  // === TOGGLE STATUS HANDLER ===
  const handleToggleStatus = async (item) => {
    try {
      await axios.patch(
        `${api_host}/banner/update_banner_publish_status/${item.id}/`,
        {
          is_active: !item.is_active, // Toggle the current status
        }
      );
      // Refresh the data after successful toggle
      fetchBannerCategories();
    } catch (error) {
      console.error("Error toggling banner status:", error);
      alert("Failed to toggle banner status");
    }
  };

  // === MODAL HANDLERS ===
  const openAddModal = () => {
    setCurrentItem(null);
    setFormState({
      label: "",
      url: "",
      image: null,
      preview: "",
      is_active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (itemId) => {
    const bannerCategoryItem = bannerCategories.find(
      (item) => item.id === itemId
    );
    if (!bannerCategoryItem) return;

    setCurrentItem(bannerCategoryItem);
    setFormState({
      label: bannerCategoryItem.label,
      url: bannerCategoryItem.url || "",
      image: null,
      preview: bannerCategoryItem.image || "",
      is_active: bannerCategoryItem.is_active,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setFormState({
      label: "",
      url: "",
      image: null,
      preview: "",
      is_active: true,
    });
  };

  // === FORM HANDLERS ===
  const handleInputChange = (e) => {
    setFormState({ ...formState, label: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormState({
        ...formState,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleStatusToggleHandler = () => {
    setFormState({ ...formState, is_active: !formState.is_active });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("label", formState.label);
    formData.append("url", formState.url);
    formData.append("is_active", formState.is_active);
    if (formState.image) {
      formData.append("image", formState.image);
    }

    try {
      if (currentItem) {
        // EDIT
        await axios.put(
          `${api_host}/banner/update_banner/${currentItem.id}/`,
          formData
        );
      } else {
        // CREATE
        await axios.post(`${api_host}/banner/add_banner/`, formData);
      }

      fetchBannerCategories();
      closeModal();
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Something went wrong while saving the banner.");
    }
  };

  return (
    <div className="space-y-4 mx-2 md:mx-3 lg:mx-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Manage Banner Categories
        </h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          + Add Banner
        </button>
      </div>

      <div className="bg-white rounded-md shadow p-4">
        <Table
          columns={columns}
          data={bannerCategories}
          renderRow={renderBannerCategoryRow}
          additionalProps={{
            onToggleStatus: handleToggleStatus, // Added toggle status handler
            onEdit: openEditModal,
          }}
        />
      </div>

      {/* Add/Edit Modal */}
      <BasicModal isModalOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <h3 className="text-lg font-semibold">
            {currentItem ? "Edit Banner" : "Add New Banner"}
          </h3>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formState.label}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              value={formState.url}
              onChange={(e) =>
                setFormState({ ...formState, url: e.target.value })
              }
              placeholder="/products/1"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded px-3 py-2"
            />
            {formState.preview && (
              <img
                src={formState.preview}
                alt="Preview"
                className="mt-2 h-40 w-full object-cover rounded"
              />
            )}
          </div>

          {/* Status Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formState.is_active}
              onChange={handleStatusToggleHandler}
              id="statusToggle"
            />
            <label htmlFor="statusToggle" className="text-sm text-gray-600">
              Active
            </label>
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
            >
              {currentItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </BasicModal>
    </div>
  );
};

export default BannerCategories;
