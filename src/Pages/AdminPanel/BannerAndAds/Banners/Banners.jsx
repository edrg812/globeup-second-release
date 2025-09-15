import { useState } from "react";
import BasicModal from "../../../../components/shared/BasicModal";
import Table from "../../../../components/shared/Table/Table";
import renderBannersRow from "../../../../components/AdminPanel/BannersAndAds/Banners/renderBannersRow";
import BannerEditForm from "../../../../components/AdminPanel/BannersAndAds/Banners/BannerEditForm";

const bannersData = [
  {
    id: 1,
    title: "Footer Top Ads",
    categoryId: "1",
    link: "/",
    image:
      "https://ecom2.lolona.shop/public/uploads/banner/17529227671212-Feature.png",
    status: "Active",
  },
  {
    id: 2,
    title: "Sidebar Promo Banner",
    categoryId: "2",
    link: "/",
    image:
      "https://ecom2.lolona.shop/public/uploads/banner/1752922779DMALL-PRODUCTS-BANNER.jpg",
    status: "Inactive",
  },
  {
    id: 3,
    title: "Homepage Hero Banner",
    categoryId: "3",
    link: "/",
    image:
      "https://ecom2.lolona.shop/public/uploads/banner/1752922793DARAZ-GAMES-BANNER.jpg",
    status: "Active",
  },
  {
    id: 4,
    title: "Category Page Top",
    categoryId: "4",
    link: "/",
    image:
      "https://ecom2.lolona.shop/public/uploads/banner/17529229424e6ef8563d3ae9da183636363146ec1d.jpg_2200x2200q80.jpg",
    status: "Inactive",
  },
  {
    id: 5,
    title: "Product Detail Page Bottom",
    categoryId: "5",
    link: "/",
    image:
      "https://ecom2.lolona.shop/public/uploads/banner/1752922954Daraz-12.12-Live-Featured.webp",
    status: "Active",
  },
  {
    id: 6,
    title: "Mobile App Splash",
    categoryId: "6",
    link: "/",
    image:
      "https://ecom2.lolona.shop/public/uploads/banner/175292290000425eb7ffe73fdf870bd55f933864a7.jpg_2200x2200q80.jpg",
    status: "Active",
  },
  {
    id: 7,
    title: "Special Event Banner",
    categoryId: "7",
    link: "/",
    image:
      "https://ecom2.lolona.shop/public/uploads/banner/1752922909GET-READY-DFW-BANNER-1.jpg",
    status: "Inactive",
  },
];

const Banners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const columns = ["SL", "Category", "Image", "Status", "Action"];

  const openEditModal = (itemId) => {
    // integrate proper functionalities
    const bannerItem = bannersData.find((item) => item.id === itemId);
    setCurrentItem(bannerItem);

    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);

    setCurrentItem(null);
  };

  return (
    <div className="space-y-2 md:space-y-4 lg:space-y-6 mx-2 md:mx-3 lg:mx-4">
      <h2 className="text-lg md:text-xl font-medium">Banner Categories</h2>

      <div className="px-2 md:px-4 lg:px-6 space-y-2 md:space-y-4 lg:space-y-6">
        <Table
          columns={columns}
          data={bannersData}
          renderRow={renderBannersRow}
          additionalProps={{
            onToggleStatus: null,
            onEdit: openEditModal,
          }}
        />
      </div>

      {/* edit modal */}
      {!!currentItem && (
        <BasicModal isModalOpen={isModalOpen} onClose={closeEditModal}>
          <BannerEditForm bannerData={currentItem} />
        </BasicModal>
      )}
    </div>
  );
};

export default Banners;
