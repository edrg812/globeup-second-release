import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardNavLink from "./DashboardNavLink";

const DashboardNavLinkGroup = ({ group, openGroup, groupOpenCloseHandler }) => {
  return (
    <div className="overflow-y-auto">
      <div
        onClick={() => groupOpenCloseHandler(group.label)}
        className={`flex justify-between items-center px-4 py-2 text-[19px] ${
          openGroup === group.label ? "" : "border-b border-b-[#ddd]"
        } cursor-pointer relative hover:bg-linear-[135deg] hover:from-[#6C47E0] hover:to-[#8E2DE2] hover:text-white`}
      >
        <div className="flex justify-start items-center gap-2">
          {group?.icon && <group.icon />}
          <p>{group.label}</p>
        </div>
        <MdKeyboardArrowRight
          className={"duration-200 " + (openGroup === group.label ? "rotate-90" : "")}
        />
      </div>

      {/* sub menu */}
      <div
        className={
          "pl-8 transition-all duration-300 overflow-hidden " +
          (openGroup === group.label ? "max-h-120" : "max-h-0")
        }
      >
        {group.sub_menu.map((link) => (
          <DashboardNavLink
            key={link.label}
            link={link}
            labelStyle={{ fontSize: "18px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardNavLinkGroup;
