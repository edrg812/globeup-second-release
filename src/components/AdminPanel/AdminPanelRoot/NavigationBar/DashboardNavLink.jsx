import { RiFileAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const DashboardNavLink = ({ link, labelStyle={} }) => {
  return (
    <Link
      to={link.url}
      className="flex justify-start items-center px-4 py-2 border-b border-b-[#ddd] hover:bg-linear-[135deg] hover:from-[#6C47E0] hover:to-[#8E2DE2] hover:text-white"
    >
      <div
        className="flex justify-start items-center gap-2 text-[19px]"
        style={labelStyle}
      >
        {link?.icon ? <link.icon /> : <RiFileAddLine />}
        <p>{link.label}</p>
      </div>
    </Link>
  );
};

export default DashboardNavLink;
