import { memo } from "react";

const OrderProductsCell = ({ products }) => {
  return (
    <div className="space-y-2 md:space-y-4 lg:space-y-6">
      {products.map((product, idx) => (
        <div key={idx} className="flex justify-between items-start gap-4">
          {/* Text details */}
          <p className="flex-1 text-[13px]">
            <strong>Product:</strong> {product.name} <br />
            <strong>Qty:</strong> {product.qty} <br />
            <strong>Size:</strong> {product.size} <br />
            <strong>Color:</strong> {product.color} <br />
            <strong>Price:</strong> ৳{product.price}
          </p>
          {/* Image */}
          <img
            src={product.image}
            alt="Product"
            className="w-12 h-12 rounded object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default memo(OrderProductsCell);
