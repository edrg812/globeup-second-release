import { useState } from "react";
import GPixelAndGTMRoot from "../../../../components/AdminPanel/GPixel&GTM/GPixelAndGTMRoot";

const GoogleTagManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTagInEditModal, setCurrentTagInEditModal] = useState();

  const columns = ["SL", "Tag Manager ID", "Status", "Action"];
  const tagsData = [
    {
      id: 245464468768,
      status: "Active",
    },
  ];

  const openEditModal = (itemId) => {
    // integrate proper functionalities
    const tagItem = tagsData.find((item) => item.id === itemId);
    setCurrentTagInEditModal(tagItem);

    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);

    setCurrentTagInEditModal(null);
  };

  return (
    <GPixelAndGTMRoot
      label={"Tag"}
      columns={columns}
      data={tagsData}
      currentItem={currentTagInEditModal}
      isModalOpen={isModalOpen}
      openEditModal={openEditModal}
      closeEditModal={closeEditModal}
    />
  );
};

export default GoogleTagManager;
