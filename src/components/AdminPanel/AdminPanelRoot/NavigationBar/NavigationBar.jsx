import { useState } from "react";
import navData from "../assets/navData";
import DashboardNavLink from "./DashboardNavLink";
import DashboardNavLinkGroup from "./DashboardNavLinkGroup";

const NavigationBar = () => {
  const [openGroup, setOpenGroup] = useState(undefined);

  const groupOpenCloseHandler = (clickedGroup) => {
    clickedGroup === openGroup
      ? setOpenGroup(undefined)
      : setOpenGroup(clickedGroup);
  };

  return (
    <div className="pr-4">
      <div className="bg-linear-[135deg] from-[#C0EDE4] to-[#C0EDE4]">
        {navData.map((link) =>
          link.isGroup ? (
            <DashboardNavLinkGroup
              key={link.label}
              group={link}
              openGroup={openGroup}
              groupOpenCloseHandler={groupOpenCloseHandler}
            />
          ) : (
            <DashboardNavLink key={link.label} link={link} />
          )
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
