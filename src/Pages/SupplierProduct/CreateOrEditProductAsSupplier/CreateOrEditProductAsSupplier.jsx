import { useState, useRef, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListUl,
  FaListOl,
  FaLink,
  FaImage,
  FaCode,
  FaQuestionCircle,
  FaCog,
  FaRedo,
  FaUndo,
  FaStrikethrough,
  FaIndent,
  FaOutdent,
  FaTimes,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../../services/api/axiosConfig";

// Reusable Input Component
const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  ...props
}) => (
  <div>
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={id}
    >
      {label}
      {required && " *"}
    </label>
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  </div>
);

// Reusable Select Component
const SelectField = ({
  label,
  id,
  options,
  value,
  onChange,
  required = false,
  ...props
}) => (
  <div>
    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={id}
    >
      {label}
      {required && " *"}
    </label>
    <select
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
      id={id}
      value={value}
      onChange={onChange}
      {...props}
    >
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Toggle Switch Component
const ToggleSwitch = ({ id, label, checked = false, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <label
        htmlFor={id}
        className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
          checked ? "bg-teal-500" : "bg-gray-300"
        }`}
      ></label>
    </div>
  </div>
);

// File Upload Component
const FileUploadField = ({
  fileName,
  onDelete,
  onFileChange,
  index,
  showDelete = true,
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(index, e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center mt-2">
      <label
        className="w-full flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50"
        onClick={triggerFileInput}
      >
        <span className="mr-2">Choose File</span>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
        <span className="text-gray-500 truncate">{fileName}</span>
      </label>
      {showDelete && (
        <button
          type="button"
          className="ml-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => onDelete(index)}
          aria-label="Delete file"
        >
          <FaTrash className="text-sm" />
        </button>
      )}
    </div>
  );
};

// Rich Text Editor Toolbar
const RichTextToolbar = ({ editorRef }) => {
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontSize, setFontSize] = useState("3");

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
    execCommand("fontName", e.target.value);
  };

  const handleSizeChange = (e) => {
    setFontSize(e.target.value);
    execCommand("fontSize", e.target.value);
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:", "https://");
    if (url) execCommand("insertImage", url);
  };

  const createLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) execCommand("createLink", url);
  };

  const toolbarButtons = [
    { icon: <FaUndo />, label: "Undo", action: () => execCommand("undo") },
    { icon: <FaRedo />, label: "Redo", action: () => execCommand("redo") },
    { icon: <FaBold />, label: "Bold", action: () => execCommand("bold") },
    {
      icon: <FaItalic />,
      label: "Italic",
      action: () => execCommand("italic"),
    },
    {
      icon: <FaUnderline />,
      label: "Underline",
      action: () => execCommand("underline"),
    },
    {
      icon: <FaStrikethrough />,
      label: "Strikethrough",
      action: () => execCommand("strikeThrough"),
    },
    {
      element: (
        <select
          value={fontFamily}
          onChange={handleFontChange}
          className="border rounded px-1 py-1 text-sm"
        >
          <option value="sans-serif">Sans-serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      ),
      label: "Font Family",
    },
    {
      element: (
        <select
          value={fontSize}
          onChange={handleSizeChange}
          className="border rounded px-1 py-1 text-sm"
        >
          <option value="1">Small</option>
          <option value="2">Normal</option>
          <option value="3">Medium</option>
          <option value="4">Large</option>
          <option value="5">X-Large</option>
          <option value="6">XX-Large</option>
          <option value="7">XXX-Large</option>
        </select>
      ),
      label: "Font Size",
    },
    {
      icon: <FaAlignLeft />,
      label: "Align Left",
      action: () => execCommand("justifyLeft"),
    },
    {
      icon: <FaAlignCenter />,
      label: "Align Center",
      action: () => execCommand("justifyCenter"),
    },
    {
      icon: <FaAlignRight />,
      label: "Align Right",
      action: () => execCommand("justifyRight"),
    },
    {
      icon: <FaListUl />,
      label: "Unordered List",
      action: () => execCommand("insertUnorderedList"),
    },
    {
      icon: <FaListOl />,
      label: "Ordered List",
      action: () => execCommand("insertOrderedList"),
    },
    {
      icon: <FaOutdent />,
      label: "Outdent",
      action: () => execCommand("outdent"),
    },
    {
      icon: <FaIndent />,
      label: "Indent",
      action: () => execCommand("indent"),
    },
    { icon: <FaLink />, label: "Insert Link", action: createLink },
    { icon: <FaImage />, label: "Insert Image", action: insertImage },
    {
      icon: <FaCode />,
      label: "Code",
      action: () => execCommand("formatBlock", "<pre>"),
    },
    {
      icon: <FaQuestionCircle />,
      label: "Help",
      action: () => alert("This is a basic rich text editor."),
    },
  ];

  return (
    <div className="flex items-center p-2 bg-gray-50 border-b border-gray-300 rounded-t-lg flex-wrap gap-1">
      {toolbarButtons.map((button, i) =>
        button.element ? (
          <div key={i} className="p-1">
            {button.element}
          </div>
        ) : (
          <button
            key={i}
            type="button"
            className="p-2 hover:bg-gray-200 rounded"
            onClick={button.action}
          >
            {button.icon}
          </button>
        )
      )}
    </div>
  );
};

// Header
const FormHeader = ({ title, buttonText, onButtonClick }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
    <button
      className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 flex items-center"
      onClick={onButtonClick}
    >
      <FaCog className="mr-2" /> {buttonText}
    </button>
  </div>
);

// Product Variant Form Modal
const ProductVariantForm = ({
  isOpen,
  onClose,
  onSave,
  variantData = null,
}) => {
  const [formData, setFormData] = useState({
    sku: variantData?.sku || "",
    old_price: variantData?.old_price || "",
    price: variantData?.price || "",
    stock: variantData?.stock || 0,
    color: variantData?.color || "",
    size: variantData?.size || "",
    image: variantData?.image || null,
    is_active:
      variantData?.is_active !== undefined ? variantData.is_active : true,
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const getFileName = () => {
    if (!formData.image) return "Choose file";
    if (formData.image instanceof File) return formData.image.name;
    if (typeof formData.image === "string") {
      try {
        const url = new URL(formData.image);
        return url.pathname.split("/").pop();
      } catch {
        return formData.image;
      }
    }
    return "Choose file";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  const sizeOptions = [
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large" },
    { value: "xl", label: "Extra Large" },
    { value: "xxl", label: "Double Extra Large" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {variantData ? "Edit Product Variant" : "Add Product Variant"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="SKU"
              id="sku"
              value={formData.sku}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Price"
              id="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
            />
            <InputField
              label="Old Price"
              id="old_price"
              type="number"
              value={formData.old_price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
            <InputField
              label="Stock"
              id="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              required
              min="0"
            />
            <InputField
              label="Color"
              id="color"
              value={formData.color}
              onChange={handleInputChange}
            />
            <SelectField
              label="Size"
              id="size"
              options={sizeOptions}
              value={formData.size}
              onChange={handleInputChange}
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Variant Image
              </label>
              <FileUploadField
                fileName={getFileName()}
                onFileChange={(index, file) => handleFileChange(file)}
                index={0}
                showDelete={false}
              />
            </div>
            <div className="md:col-span-2">
              <ToggleSwitch
                id="is_active"
                label="Active Status"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_active: e.target.checked,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              {variantData ? "Update Variant" : "Add Variant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Variant List Component
const VariantList = ({ variants, onEdit, onDelete }) => {
  if (variants.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-500">
        No variants added yet. Click "Add Variant" to create one.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 border-b text-left">SKU</th>
            <th className="px-4 py-2 border-b text-left">Price</th>
            <th className="px-4 py-2 border-b text-left">Stock</th>
            <th className="px-4 py-2 border-b text-left">Color</th>
            <th className="px-4 py-2 border-b text-left">Size</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{variant.sku}</td>
              <td className="px-4 py-2 border-b">${variant.price}</td>
              <td className="px-4 py-2 border-b">{variant.stock}</td>
              <td className="px-4 py-2 border-b">{variant.color || "-"}</td>
              <td className="px-4 py-2 border-b">
                {variant.size ? variant.size.toUpperCase() : "-"}
              </td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    variant.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {variant.is_active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(variant, index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Product Form Component
const CreateOrEditProduct = ({ mode = "create", productData }) => {
  const [formData, setFormData] = useState({
    name: productData?.name || "",
    slug: productData?.slug || "",
    category: productData?.category?.id || "",
    brand: productData?.brand?.id || "",
    description: productData?.description || "Enter Your Text Here",
    is_active:
      productData?.is_active !== undefined ? productData.is_active : true,
  });

  const [variants, setVariants] = useState(productData?.variants || []);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [existingVariants, setExistingVariants] = useState([]);

  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
 

  // Fetch brands and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, categoriesRes] = await Promise.all([
          api.get("/seller_supplier_brands/"),
          api.get("/seller_supplier_categories/"),
        ]);
        
        // Handle paginated responses
        setBrandOptions(brandsRes.data.results || brandsRes.data);
        setCategoryOptions(categoriesRes.data.results || categoriesRes.data);
        
        // If in edit mode, fetch the product data
        if (mode === "edit" && id) {
          const productRes = await api.get(`/seller_supplier_products/${id}/`);
          const product = productRes.data;
          
          // Find category and brand IDs by name
          const categoryObj = (categoriesRes.data.results || categoriesRes.data).find(
            cat => cat.name === product.category
          );
          const brandObj = (brandsRes.data.results || brandsRes.data).find(
            brand => brand.name === product.brand
          );
          
          setFormData({
            name: product.name,
            slug: product.slug,
            category: categoryObj ? categoryObj.id : "",
            brand: brandObj ? brandObj.id : "",
            description: product.description,
            is_active: product.is_active,
          });
          
          // Fetch variants for this product
          const variantsRes = await api.get(`/seller_supplier_variants/?product=${id}`);
          const variantData = variantsRes.data.results || variantsRes.data;
          
          setVariants(variantData.map(v => ({
            id: v.id,
            sku: v.sku,
            old_price: v.old_price,
            price: v.price,
            stock: v.stock,
            color: v.color,
            size: v.size,
            is_active: v.is_active,
            image: v.image
          })));
          
          setExistingVariants(variantData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    
    fetchData();
  }, [mode, id]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = formData.description;
    }
  }, [formData.description]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setFormData((prev) => ({
        ...prev,
        description: editorRef.current.innerHTML,
      }));
    }
  };

  const handleAddVariant = () => {
    setEditingVariant(null);
    setEditingVariantIndex(null);
    setIsVariantModalOpen(true);
  };

  const handleEditVariant = (variant, index) => {
    setEditingVariant(variant);
    setEditingVariantIndex(index);
    setIsVariantModalOpen(true);
  };

  const handleDeleteVariant = async (index) => {
    const variant = variants[index];
    
    // If variant has an ID, delete it from the server
    if (variant.id) {
      try {
        const token = localStorage.getItem("access_token");
        await api.delete(`/seller_supplier_variants/${variant.id}/update-delete/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error("Error deleting variant:", err);
        alert("Failed to delete variant");
        return;
      }
    }
    
    // Remove from local state
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveVariant = (variantData) => {
    if (editingVariantIndex !== null) {
      // Update existing variant
      const updatedVariants = [...variants];
      updatedVariants[editingVariantIndex] = variantData;
      setVariants(updatedVariants);
    } else {
      // Add new variant
      setVariants((prev) => [...prev, variantData]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (mode === "create") {
        // Create product first
        const productPayload = {
          name: formData.name,
          slug: formData.slug,
          brand: formData.brand,
          category: formData.category,
          description: formData.description,
          is_active: formData.is_active,
        };

        const productRes = await api.post(
          "/seller_supplier_products/create/",
          productPayload,
          config
        );
        
        const productId = productRes.data.id;
        
        // Create variants for the product
        for (const variant of variants) {
          const variantFormData = new FormData();
          variantFormData.append("product", productId);
          variantFormData.append("sku", variant.sku);
          variantFormData.append("price", variant.price);
          variantFormData.append("stock", variant.stock);
          variantFormData.append("is_active", variant.is_active);
          
          if (variant.old_price) variantFormData.append("old_price", variant.old_price);
          if (variant.color) variantFormData.append("color", variant.color);
          if (variant.size) variantFormData.append("size", variant.size);
          if (variant.image && variant.image instanceof File) {
            variantFormData.append("image", variant.image);
          }
          
          await api.post(
            "/seller_supplier_variants/create/",
            variantFormData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
         
        alert("✅ Product Created Successfully!");
        navigate("/");
      } else {
        // Update product
        const productPayload = {
          name: formData.name,
          slug: formData.slug,
          brand: formData.brand,
          category: formData.category,
          description: formData.description,
          is_active: formData.is_active,
        };

        await api.put(
          `/seller_supplier_products/${id}/update-delete/`,
          productPayload,
          config
        );
        
        // Update variants
        for (const variant of variants) {
          const variantFormData = new FormData();
          
          if (variant.id) {
            // Update existing variant
            variantFormData.append("product", id);
            variantFormData.append("sku", variant.sku);
            variantFormData.append("price", variant.price);
            variantFormData.append("stock", variant.stock);
            variantFormData.append("is_active", variant.is_active);
            
            if (variant.old_price) variantFormData.append("old_price", variant.old_price);
            if (variant.color) variantFormData.append("color", variant.color);
            if (variant.size) variantFormData.append("size", variant.size);
            if (variant.image && variant.image instanceof File) {
              variantFormData.append("image", variant.image);
            }
            
            await api.put(
              `/seller_supplier_variants/${variant.id}/update-delete/`,
              variantFormData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } else {
            // Create new variant
            variantFormData.append("product", id);
            variantFormData.append("sku", variant.sku);
            variantFormData.append("price", variant.price);
            variantFormData.append("stock", variant.stock);
            variantFormData.append("is_active", variant.is_active);
            
            if (variant.old_price) variantFormData.append("old_price", variant.old_price);
            if (variant.color) variantFormData.append("color", variant.color);
            if (variant.size) variantFormData.append("size", variant.size);
            if (variant.image && variant.image instanceof File) {
              variantFormData.append("image", variant.image);
            }
            
            await api.post(
              "/seller_supplier_variants/create/",
              variantFormData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
        }
        
        // Delete variants that were removed
        const currentVariantIds = variants.map(v => v.id).filter(id => id);
        const variantsToDelete = existingVariants.filter(v => !currentVariantIds.includes(v.id));
        
        for (const variant of variantsToDelete) {
          await api.delete(
            `/seller_supplier_variants/${variant.id}/update-delete/`,
            config
          );
        }
        
        alert("✅ Product Updated Successfully!");
      }
    } catch (err) {
      console.error("Error submitting product:", err.response?.data || err);
      alert("❌ Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="container mx-auto p-4">
        <FormHeader
          title={mode === "create" ? "Product Create" : "Product Edit"}
          buttonText="Manage"
          onButtonClick={() => navigate("/admin/products/manage")}
        />

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <InputField
              label="Product Name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Slug"
              id="slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Category"
              id="category"
              options={categoryOptions.map((c) => ({
                value: c.id,
                label: c.name,
              }))}
              value={formData.category}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Brand"
              id="brand"
              options={brandOptions.map((b) => ({
                value: b.id,
                label: b.name,
              }))}
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
            <div className="md:col-span-2">
              <ToggleSwitch
                id="is_active"
                label="Active Status"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_active: e.target.checked,
                  }))
                }
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <div className="border border-gray-300 rounded-lg">
              <RichTextToolbar editorRef={editorRef} />
              <div
                ref={editorRef}
                className="w-full p-4 border-0 focus:ring-0 rounded-b-lg min-h-[200px] max-h-[400px] overflow-y-auto"
                contentEditable
                onInput={handleEditorInput}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Product Variants</h3>
              <button
                type="button"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                onClick={handleAddVariant}
              >
                <FaPlus className="mr-2" /> Add Variant
              </button>
            </div>
            <VariantList
              variants={variants}
              onEdit={handleEditVariant}
              onDelete={handleDeleteVariant}
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : mode === "create"
                ? "Create Product"
                : "Update Product"}
            </button>
          </div>
        </div>
      </form>

      <ProductVariantForm
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onSave={handleSaveVariant}
        variantData={editingVariant}
      />

      <style>{`
        .toggle-checkbox:checked { right: 0; border-color: #34D399; }
        .toggle-checkbox:checked + .toggle-label { background-color: #34D399; }
        [contenteditable]:focus { outline: none; }
      `}</style>
    </div>
  );
};

export default CreateOrEditProduct;
