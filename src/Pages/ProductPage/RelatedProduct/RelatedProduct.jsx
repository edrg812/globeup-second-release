




import { FaShoppingCart } from "react-icons/fa";





const ProductCard = ({ product }) => {
  return (
    <div className="max-w-xs w-80 bg-white rounded-2xl shadow-lg  transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl overflow-hidden">
      <div className="relative w-full h-64 bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center clip-custom"
        />
        
        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
          {Math.round(
            ((product.originalPrice - product.discountPrice) /
              product.originalPrice) *
              100
          )}
          % OFF
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-500">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <span className="text-lg font-semibold text-red-500">
              ${product.discountPrice}
            </span>
            <span className="text-sm line-through text-gray-400">
              ${product.originalPrice}
            </span>
          </div>
          
          <button
  type="button"
  className="bg-violet-600 text-white p-3 rounded-full hover:bg-violet-800 transition-transform duration-300 ease-in-out transform hover:scale-110"
>
  <FaShoppingCart className="text-lg" />
</button>
        </div>
      </div>
    </div>
  );
};




const sampleProducts = [
  {
    image: "https://tiimg.tistatic.com/fp/1/007/688/breathable-skin-friendly-easy-to-wear-light-green-color-stylish-branded-men-jacket-032.jpg",
    title: "Elegant Jacket",
    description: "Premium quality winter wear.",
    originalPrice: 120,
    discountPrice: 85,
  },
   {
    image: "https://www.shutterstock.com/image-photo/pair-comfortable-sport-shoes-sporty-600nw-2125635932.jpg",
    title: "Running Shoes",
    description: "Breathable, lightweight running shoes for all terrains.",
    originalPrice: 90,
    discountPrice: 65,
  },
  {
    image: "https://static-01.daraz.com.bd/p/ff842f0e752cb914024b8ef46b0a4d1f.jpg",
    title: "Travel Backpack",
    description: "Durable waterproof backpack for long journeys.",
    originalPrice: 70,
    discountPrice: 50,
  },
  {
    image: "https://img.drz.lazcdn.com/static/bd/p/b506a3a49007f3df27f2d222b190ecb6.jpg_720x720q80.jpg",
    title: "Smart Watch",
    description: "Track your fitness and stay connected on the go.",
    originalPrice: 150,
    discountPrice: 110,
  },
  {
    image: "https://m.media-amazon.com/images/I/61WOJadm8gL._AC_SL1500_.jpg",
    title: "Wireless Headphones",
    description: "Noise-cancelling headphones with long battery life.",
    originalPrice: 110,
    discountPrice: 80,
  },
  {
    image: "https://www.dhonno.com/public/uploads/all/IQzSSneiJu2hzeRmTvCkPF9d8OUFYfMluYFRVRjF.png",
    title: "Stylish Sunglasses",
    description: "Protect your eyes in style under the summer sun.",
    originalPrice: 60,
    discountPrice: 35,
  },
  {
    image: "https://luxurywatchbd.com/wp-content/uploads/2022/03/275558845_476920260796513_1546358804957299287_n.jpg",
    title: "Luxury Watch",
    description: "A classy timepiece to elevate your style.",
    originalPrice: 200,
    discountPrice: 150,
  },

  {
    image: "https://cdn.mos.cms.futurecdn.net/vzjeFAkyeM82mUdJPz7upm.jpg",
    title: "Ultrabook Laptop",
    description: "Slim, powerful laptop perfect for professionals.",
    originalPrice: 999,
    discountPrice: 849,
  },
  {
    image: "https://m.media-amazon.com/images/I/61qJX973fRL._AC_SL1500_.jpg",
    title: "Smartphone",
    description: "Fast, stylish, and loaded with features.",
    originalPrice: 699,
    discountPrice: 599,
  },
];

const RelatedProducts = () => {
  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Related Products
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {sampleProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;

