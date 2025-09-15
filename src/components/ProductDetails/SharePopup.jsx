import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa";

const SharePopup = ({ showSharePopup }) => {
  if (!showSharePopup) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl p-2 z-10">
      <a
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        href="#"
      >
        <FaFacebook className="mr-2" />
        Facebook
      </a>
      <a
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        href="#"
      >
        <FaInstagram className="mr-2" />
        Instagram
      </a>
      <a
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        href="#"
      >
        <FaLink className="mr-2" />
        Copy Link
      </a>
    </div>
  );
};

export default SharePopup;