import { useRef, useState } from "react";

const ProductImageGallery = ({ mainImage, thumbnails, onImageChange }) => {
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const imgZoomContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = imgZoomContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = Math.min(
      100,
      Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const y = Math.min(
      100,
      Math.max(0, ((e.clientY - rect.top) / rect.height) * 100)
    );

    setZoomStyle({
      display: "block",
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => setZoomStyle({ display: "none" });

  if (!mainImage) {
    return <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse" />;
  }

  return (
    <div
      className="relative"
      ref={imgZoomContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        alt="Product main"
        className="w-full h-auto cursor-crosshair rounded-lg object-cover aspect-square"
        src={mainImage}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://p...content-available-to-author-only...d.co/600x600/F0F0F0/CCC?text=Image+Not+Found";
        }}
      />

      <div
        style={{
          ...zoomStyle,
          backgroundImage: `url('${mainImage}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "200% 200%",
        }}
        className="hidden md:block absolute top-0 left-[105%] w-[300px] h-[300px] border bg-white shadow-lg rounded-lg z-10 pointer-events-none"
      />

      <div className="flex mt-4 space-x-2">
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            alt={`Product thumbnail ${index + 1}`}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-md cursor-pointer object-cover ${
              thumbnail === mainImage
                ? "border-2 border-pink-500"
                : "border border-gray-200"
            }`}
            onClick={() => onImageChange(thumbnail)}
            src={thumbnail}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://p...content-available-to-author-only...d.co/80x80/F0F0F0/CCC?text=...";
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
