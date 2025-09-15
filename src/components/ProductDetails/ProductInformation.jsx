import { useState } from "react";
import ReviewItem from "./ReviewItem";
import RelatedProducts from "./RelatedProducts";

const ProductInformation = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");
  console.log(product?.reviews);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: `Reviews (${product?.reviews?.length || 0})` },
    { id: "related", label: "Related Products" },
  ];

  return (
    <div className="bg-white mt-6 p-4 md:p-8 rounded-lg shadow-md">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-6">
        {activeTab === "description" && (
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{
              __html: product?.description || "Loading description...",
            }}
          />
        )}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-8">
            {product?.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))
            ) : (
              <p>No reviews for this product yet.</p>
            )}
          </div>
        )}

        {activeTab === "related" && <RelatedProducts />}
      </div>
    </div>
  );
};

export default ProductInformation;
