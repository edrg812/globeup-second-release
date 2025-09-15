import React, { useState, useEffect, useMemo } from "react";
import { FaShoppingCart, FaFilter, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api/axiosConfig";

const Category = () => {
  // Data
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Price bounds
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);

  // Applied filters
  const [filters, setFilters] = useState({
    category: "all",
    brand: "all",
    price: 50000,
  });

  // Temporary filters (for modal / UI before applying)
  const [tempFilters, setTempFilters] = useState({
    category: "all",
    brand: "all",
    price: 50000,
  });

  // For mobile filter panel
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catsRes, brsRes, prodsRes] = await Promise.all([
          api.get("/categories/"),
          api.get("/brands/"),
          api.get("/products/variants"),
        ]);
        const cats = catsRes?.data?.results ?? [];
        const brs = brsRes?.data?.results ?? [];
        const prods = prodsRes?.data?.results ?? [];

        setCategories([{ id: "all", name: "All" }, ...cats]);
        setBrands([{ id: "all", name: "All Brands" }, ...brs]);
        setProducts(prods);

        const prices = prods.map((p) => parseFloat(p.price) || 0);
        const derivedMin = prices.length ? Math.min(...prices) : 0;
        const derivedMax = prices.length ? Math.max(...prices) : maxPrice;

        // round nicely
        const niceMin = Math.floor(derivedMin / 100) * 100;
        const niceMax = Math.ceil(derivedMax / 100) * 100;

        setMinPrice(niceMin);
        setMaxPrice(niceMax);

        setFilters((f) => ({ ...f, price: niceMax }));
        setTempFilters((t) => ({ ...t, price: niceMax }));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Options
  const categoryOptions = useMemo(
    () =>
      categories.map((c) => ({
        code: c.id === "all" ? "all" : (c.name || "").toLowerCase(),
        label: c.name,
        key: c.id,
      })),
    [categories]
  );

  const brandOptions = useMemo(
    () =>
      brands.map((b) => ({
        code: b.id === "all" ? "all" : (b.name || "").toLowerCase(),
        label: b.name,
        key: b.id,
      })),
    [brands]
  );

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const prodCat = (p.product?.category || "").toLowerCase();
      const prodBrand = (p.product?.brand || "").toLowerCase();
      const price = parseFloat(p.price) || 0;

      if (filters.category !== "all" && prodCat !== filters.category)
        return false;
      if (filters.brand !== "all" && prodBrand !== filters.brand) return false;
      if (price > filters.price) return false;

      return true;
    });
  }, [products, filters]);

  const applyFilters = () => {
    setFilters({ ...tempFilters });
    setIsFilterPanelOpen(false); // close mobile panel if open
  };

  const resetFilters = () => {
    setTempFilters({
      category: "all",
      brand: "all",
      price: maxPrice,
    });
    setFilters({
      category: "all",
      brand: "all",
      price: maxPrice,
    });
  };

  const handleAddToCart = (productId) => {
    // TODO: implement add to cart logic
    console.log("Add to cart:", productId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Top bar with Filter button (for mobile) */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={() => setIsFilterPanelOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow"
          >
            <FaFilter className="mr-2" />
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-6 border border-gray-200 bg-white p-6 rounded-md shadow-sm">
              <FilterControls
                minPrice={minPrice}
                maxPrice={maxPrice}
                tempFilters={tempFilters}
                setTempFilters={setTempFilters}
                categoryOptions={categoryOptions}
                brandOptions={brandOptions}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
              />
            </div>
          </aside>

          {/* Main product area */}
          <div className="lg:col-span-3">
            {/* Always visible header on larger screens */}
            <div className="hidden lg:block mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Products</h1>
              <p className="mt-2 text-gray-600">
                Explore our curated collection of products from top brands.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
              {categoryOptions.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: c.code }));
                    setTempFilters((prev) => ({ ...prev, category: c.code }));
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap border ${
                    tempFilters.category === c.code
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl mb-2">
                  No products found matching your filters.
                </p>
                <p className="text-sm text-gray-500">
                  Please try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Panel / Drawer */}
        {isFilterPanelOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* overlay */}
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsFilterPanelOpen(false)}
            />
            <div className="relative w-full max-w-xs bg-white shadow-lg p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <FilterControls
                minPrice={minPrice}
                maxPrice={maxPrice}
                tempFilters={tempFilters}
                setTempFilters={setTempFilters}
                categoryOptions={categoryOptions}
                brandOptions={brandOptions}
                applyFilters={applyFilters}
                resetFilters={resetFilters}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Separate sub‑component for filter controls (category / brand / price / buttons)
const FilterControls = ({
  minPrice,
  maxPrice,
  tempFilters,
  setTempFilters,
  categoryOptions,
  brandOptions,
  applyFilters,
  resetFilters,
}) => (
  <div className="space-y-6">
    {/* Category Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <select
        value={tempFilters.category}
        onChange={(e) =>
          setTempFilters((prev) => ({ ...prev, category: e.target.value }))
        }
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {categoryOptions.map((c) => (
          <option key={c.key} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    </div>

    {/* Brand Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Brand
      </label>
      <select
        value={tempFilters.brand}
        onChange={(e) =>
          setTempFilters((prev) => ({ ...prev, brand: e.target.value }))
        }
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {brandOptions.map((b) => (
          <option key={b.key} value={b.code}>
            {b.label}
          </option>
        ))}
      </select>
    </div>

    {/* Price Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Max Price: ৳{tempFilters.price}
      </label>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        step={Math.max(1, Math.round((maxPrice - minPrice) / 100))}
        value={tempFilters.price}
        onChange={(e) =>
          setTempFilters((prev) => ({
            ...prev,
            price: parseInt(e.target.value, 10),
          }))
        }
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>৳{minPrice}</span>
        <span>৳{maxPrice}</span>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-3">
      <button
        onClick={applyFilters}
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
      >
        Apply
      </button>
      <button
        onClick={resetFilters}
        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Reset
      </button>
    </div>
  </div>
);

// Product Card component
const ProductCard = ({ product, onAddToCart }) => (
  <div
    key={product.id}
    className="flex flex-col bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
  >
    <Link to={`/products/${product.id}`} className="flex-1 flex flex-col">
      <div className="w-full overflow-hidden">
        <img
          alt={product.product?.name || "Product image"}
          src={product.image || "/placeholder-image.jpg"}
          className="w-full h-48 object-cover object-center transform hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {product.product?.name || "Unnamed Product"}
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          Brand: {product.product?.brand || "Unknown"}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Category: {product.product?.category || "Unknown"}
        </p>
        <div className="mt-auto">
          {product.old_price && (
            <span className="text-sm text-gray-400 line-through mr-2">
              ৳{parseInt(product.old_price, 10)}
            </span>
          )}
          <span className="text-lg font-bold text-gray-900">
            ৳{parseInt(product.price, 10) || 0}
          </span>
        </div>
      </div>
    </Link>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onAddToCart(product.id);
      }}
      className="w-full bg-blue-600 text-white py-2 text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center"
    >
      <FaShoppingCart className="mr-1" size={14} /> Add to Cart
    </button>
  </div>
);

export default Category;
