import tick from "./assets/tick.svg";
import cross from "./assets/cross.svg";

const Checkbox = ({
  checked = false,
  onClick,
  onChange = () => null,
  size = "medium",
  showCross = true,
  disabled = false,
}) => {
  const handleClick = () => {
    if (disabled === true) {
      return;
    }
    onClick(!checked);
    onChange();
  };
  return (
    <div
      onClick={handleClick}
      className={`aspect-square select-none ${
        disabled ? "" : "hover:scale-105"
      } duration-75
                ${
                  size === "small"
                    ? "w-4 border-[1.5px] p-[1px] rounded"
                    : size === "medium"
                    ? "w-5 border-[2px] p-[2px] rounded-md"
                    : size === "large"
                    ? "w-7 border-[2px] p-[1px] rounded-md"
                    : "w-5 border-[2px] p-[2px] rounded-md"
                }
            `}
      style={{ borderColor: disabled ? "#5B58AD" : "gray" }}
      draggable={false}
    >
      {checked ? <img src={tick} /> : showCross ? <img src={cross} /> : ""}
    </div>
  );
};

export default Checkbox;
