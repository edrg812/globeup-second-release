

const vendorInfo = [
  {
    id: 1,
    image:"https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    title: "Morsalin's Tech",
    description: "Best tech gadgets"
  },
  {
    id: 2,
    image:"https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    title: "Morsalin's Tech",
    description: "Best tech gadgets"
  },
  {
    id: 3,
    image:"https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    title: "Morsalin's Tech",
    description: "Best tech gadgets"
  },
  {
    id: 4,
    image:"https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    title: "Morsalin's Tech",
    description: "Best tech gadgets"
  },
  {
    id: 5,
    image:"https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    title: "Morsalin's Tech",
    description: "Best tech gadgets"
  },
  {
    id: 6,
    image:"https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
    title: "Morsalin's Tech",
    description: "Best tech gadgets"
  },

]

const PopularVendorCard = ({ image, title, description }) => {
  return (
    <div className="w-[320px] rounded-xl shadow-lg  bg-gray-400 dark:bg-gray-50 dark:text-gray-800 overflow-hidden">

      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id="vendor-clip" clipPathUnits="objectBoundingBox">
            <path
              d="M0.154081 0.127111 C0.000000 0.015731 0.017461 0.000000 0.115385 -0.008326 L0.500000 0.000000 L0.727414 0.000000 C0.741798 0.000000 0.755513 0.005472 0.765179 0.015068 L0.858000 0.107207 L0.986220 0.236143 C0.995093 0.245066 1.000000 0.256625 1.000000 0.268605 L1.000000 0.500000 L1.000000 0.964865 C1.000000 0.984269 0.982539 1.000000 0.961000 1.000000 L0.039000 1.000000 C0.017461 1.000000 0.000000 0.984269 0.000000 0.964865 L-0.007739 0.113039 Z"
              fill="black"
            />
          </clipPath>
        </defs>
      </svg>


      <figure
        style={{ clipPath: "url(#vendor-clip)" }}
        className="w-full h-56 overflow-hidden"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>


      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <button className="w-full py-2 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition">
          View Info
        </button>
      </div>
    </div>
  );
};



export default function PopularVendors()
{
    const vendorCards = vendorInfo.map(vendor =>{
        return(
          <>
                <PopularVendorCard
                  key = {vendor.id}
          image={vendor.image}
          title={vendor.title}
          description={vendor.description}
        />
          </>
        )
    })
  return (
    <div className = "bg-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Popular Vendors
      </h2>
      <div className="flex gap-6 flex-wrap p-6 justify-center">
          {vendorCards}
      </div>

    </div>
  )
}
