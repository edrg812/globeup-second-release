import { IoClose } from "react-icons/io5";

const BasicModal = ({ isModalOpen, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fixed z-[9999] w-screen h-screen ${
        isModalOpen ? "visible opacity-100" : "invisible opacity-0"
      } inset-0 grid place-items-center bg-black/20 backdrop-blur-sm transition-all duration-100 dark:bg-black/30`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-xl mx-4 ${
          isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-110"
        } transition-all duration-300 rounded-lg p-6 shadow-xl bg-white`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <IoClose className="text-lg md:text-xl" />
        </button>

        {/* Modal content */}
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default BasicModal;
