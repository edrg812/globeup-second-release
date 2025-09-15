import { useState } from "react";
import { FaUpload } from "react-icons/fa";

const BannerEditForm = ({ bannerData }) => {
  const [link, setLink] = useState(bannerData.link);
  const [categoryId, setCategoryId] = useState(bannerData.categoryId);
  const [status, setStatus] = useState(bannerData.status === "Active");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(bannerData.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // send data to the server
    console.log({
      link,
      categoryId,
      status,
      image,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Link Input */}
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700"
          >
            Link *
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Select */}
        <div>
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-gray-700"
          >
            Banner Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select...</option>
            <option value="1">Slider (1060x395)</option>
            <option value="5">Slider Bottom Ads (425X212px)</option>
            <option value="6">Footer Top Ads</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image *
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-flex items-center gap-2 text-blue-600">
              <FaUpload />
              Upload Image
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
          </div>
        </div>

        {/* Status Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="status"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`relative w-10 h-5 transition bg-gray-300 rounded-full ${
                status ? "bg-green-500" : ""
              }`}
            >
              <div
                className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow transform transition ${
                  status ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm text-gray-700">
              {status ? "Active" : "Inactive"}
            </span>
          </label>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerEditForm;
