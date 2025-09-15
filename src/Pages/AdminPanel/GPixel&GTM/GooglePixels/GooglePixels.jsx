import { useState } from "react";
import GPixelAndGTMRoot from "../../../../components/AdminPanel/GPixel&GTM/GPixelAndGTMRoot";

const GooglePixel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPixelInEditModal, setCurrentPixelInEditModal] = useState();

  const columns = ["SL", "Pixel ID", "Status", "Action"];
  const pixelsData = [
    {
      id: 45484841534,
      status: "Active",
    },
  ];

  const openEditModal = (itemId) => {
    // integrate proper functionalities
    const pixelItem = pixelsData.find((item) => item.id === itemId);
    setCurrentPixelInEditModal(pixelItem);

    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);

    setCurrentPixelInEditModal(null);
  };

  return (
    <GPixelAndGTMRoot
      label={"Pixel"}
      columns={columns}
      data={pixelsData}
      currentItem={currentPixelInEditModal}
      isModalOpen={isModalOpen}
      openEditModal={openEditModal}
      closeEditModal={closeEditModal}
    />
  );
};

export default GooglePixel;
