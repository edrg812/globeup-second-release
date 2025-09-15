import { Link } from "react-router-dom";

const NavigationBar = ({ setRequestModalOpen }) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link to={"/"} className="text-white hover:text-white/60">
        Home
      </Link>
      <Link to={"/categories"} className="text-white hover:text-white/60">
        Categories
      </Link>
      <button
        className="text-white hover:text-white/60 cursor-pointer"
        onClick={() => setRequestModalOpen(true)}
      >
        Become a Reseller
      </button>
    </nav>
  );
};

export default NavigationBar;
