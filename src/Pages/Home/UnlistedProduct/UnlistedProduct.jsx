import React, { useState, useEffect, useMemo } from "react";
import { FaShoppingCart, FaFilter } from "react-icons/fa";
import api from "../../../services/api/axiosConfig";
import { Link } from "react-router-dom";

const UnlistedProduct = () => {
  // Data
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  // Loading / error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Price bounds derived from products
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);

  // Applied filters (what the product grid actually uses)
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [priceRange, setPriceRange] = useState(maxPrice);

  // Temporary UI state (changed by user, applied on button click)
  const [tempCategory, setTempCategory] = useState("all");
  const [tempBrand, setTempBrand] = useState("all");
  const [tempPriceRange, setTempPriceRange] = useState(maxPrice);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // categories
        const categoriesRes = await api.get("/seller_supplier_categories/");

        const cats = categoriesRes?.data?.results ?? [];
        // keep a normalized "All" at the front
        setCategories([{ id: "all", name: "All" }, ...cats]);

        // brands
        const brandsRes = await api.get("/seller_supplier_brands/");
        const brs = brandsRes?.data?.results ?? [];
        setBrands([{ id: "all", name: "All Brands" }, ...brs]);

        // products/variants
        const variantsRes = await api.get("/seller_supplier_variants/");
        const prods = variantsRes?.data?.results ?? [];
        setProducts(prods);

        // derive price bounds
        const prices = prods.map((p) => parseFloat(p.price) || 0);
        const derivedMax = prices.length ? Math.max(...prices) : 50000;
        const derivedMin = prices.length ? Math.min(...prices) : 0;

        // round nicely
        const niceMax = Math.ceil(derivedMax / 100) * 100;
        const niceMin = Math.floor(derivedMin / 100) * 100;

        setMinPrice(niceMin);
        setMaxPrice(niceMax);

        // default both temp & applied to max so items show
        setPriceRange(niceMax);
        setTempPriceRange(niceMax);

        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Normalized options (codes are what we store in state)
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

  // Apply & Reset
  const applyFilters = () => {
    setActiveCategory(tempCategory);
    setSelectedBrand(tempBrand);
    setPriceRange(tempPriceRange);
  };

  const resetFilters = () => {
    setTempCategory("all");
    setTempBrand("all");
    setTempPriceRange(maxPrice);

    setActiveCategory("all");
    setSelectedBrand("all");
    setPriceRange(maxPrice);
  };

  // Filtering
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const cat = (p.product?.category || "").toLowerCase();
      const br = (p.product?.brand || "").toLowerCase();
      const pr = parseFloat(p.price) || 0;

      if (activeCategory !== "all" && cat !== activeCategory) return false;
      if (selectedBrand !== "all" && br !== selectedBrand) return false;
      if (pr > priceRange) return false;

      return true;
    });
  }, [products, activeCategory, selectedBrand, priceRange]);

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
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-['Work_Sans'] text-gray-800 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="space-y-6 rounded-md border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaFilter className="mr-2" /> Filters
                </h3>

                {/* Brand */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="brand-select"
                  >
                    Brand
                  </label>
                  <select
                    id="brand-select"
                    value={tempBrand}
                    onChange={(e) => setTempBrand(e.target.value)}
                    className="h-12 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {brandOptions.map((b) => (
                      <option key={b.key} value={b.code}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="price-range"
                  >
                    Max Price
                  </label>
                  <input
                    id="price-range"
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    step={Math.max(1, Math.round((maxPrice - minPrice) / 100))}
                    value={tempPriceRange}
                    onChange={(e) =>
                      setTempPriceRange(parseInt(e.target.value, 10))
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
                  />
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>৳{minPrice}</span>
                    <span>৳{maxPrice}</span>
                  </div>
                  <div className="text-center mt-1 text-sm text-blue-600">
                    Selected: ৳{tempPriceRange}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={applyFilters}
                    className="flex-1 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={resetFilters}
                    className="flex-1 rounded-md bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Products
              </h1>
              <p className="mt-2 text-gray-600">
                Explore our curated collection of products from top brands and
                designers.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4 overflow-x-auto">
              {categoryOptions.map((c) => (
                <button
                  key={c.key}
                  className={`rounded-t-md border-b-2 px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    tempCategory === c.code
                      ? "border-blue-600 text-blue-600 font-semibold"
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-800"
                  }`}
                  onClick={() => setTempCategory(c.code)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="flex justify-center items-center h-64 flex-col">
                <div className="text-xl mb-4">
                  No products found matching your criteria.
                </div>
                <div className="text-sm text-gray-500">
                  Active Category: {activeCategory} | Selected Brand:{" "}
                  {selectedBrand}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Price Range: up to ৳{priceRange} | Total Products:{" "}
                  {products.length}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 xl:gap-x-8">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <Link
                      to={`/seller/products/${product.id}`}
                      className="flex flex-col flex-1"
                    >
                      <img
                        alt={product.product?.name || 'Product image'}
                        className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
                        src={product.image || '/placeholder-image.jpg'}
                      />
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="text-base font-semibold text-gray-900">
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {product.product?.name || 'Unnamed Product'}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Brand: {product.product?.brand}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Category: {product.product?.category}
                        </p>

                        <div className="mt-auto flex items-end justify-between pt-4">
                          <div>
                            {product.old_price && (
                              <p className="text-sm text-gray-500 line-through">৳{parseInt(product.old_price)}</p>
                            )}
                            <p className="text-lg font-medium text-gray-900">৳{parseInt(product.price) || 0}</p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Add to Cart button outside the Link to prevent navigation when clicking it */}
                    <div className="p-4 pt-0">
                      <button
                        className="w-full rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation when clicking the button
                          handleAddToCart(product.id);
                        }}
                      >
                        <FaShoppingCart className="mr-1" size={14} />
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlistedProduct;
