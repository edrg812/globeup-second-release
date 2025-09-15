import { useEffect, useState } from "react";
import Product from "../../components/shared/Product";
import UnlistedProduct from "../../components/shared/UnlistedProduct";
import Slider from "../../components/shared/Slider";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import axios from "axios";

import UserRoleActions from "./UserRoleActions/UserRoleActions";




const Home = () => {
  const [slides, setSlides] = useState([]);
  
  const [listedProducts, setListedProducts] = useState([]);
  
 

  
  const getListedItems = async () => {
    try {
      const res = await fetch(`${apiUrl}/products/`);

      if (!res.ok) throw new Error("Failed to fetch products");

      const data = await res.json(); // 👈 convert response to JSON
      setListedProducts(data.results);  
      // console.log(data)     // 👈 store in state
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getListedItems();
  }, []);

  

  useEffect(() => {
    getListedItems();
  }, []);


  // fetch active banner slides
  useEffect(() => {
    axios
      .get(apiUrl + "/banner/get_all_active_banners/")
      .then((res) => setSlides(res.data));
  }, []);

  return (
    <div className="px-4 max-w-7xl mx-auto">
      {slides.length > 0 && (
        <div className="w-full px-2 md:px-8 lg:px-16">
          <Slider slides={slides} />
        </div>
      )}

    
      {/* //here use props to send user role */}
      {localStorage.getItem("access_token") && <UserRoleActions />} 

      <div className="space-y-8">
   

        {/* Listed Products */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Featured Products
          </h2>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {listedProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;


