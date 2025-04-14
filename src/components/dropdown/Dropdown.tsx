import { HiOutlineDotsVertical } from "react-icons/hi";
import cl from "classnames";
import { useState } from "react";
const Dropdown = ({ style = "", children, ...others }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      <div className="dropdown  dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <HiOutlineDotsVertical size={20} />
        </div>
        <ul
          tabIndex={0}
          className={cl(
            "dropdown-content menu gap-2 bg-gray-200 rounded-lg z-[1] w-[10rem] p-2 shadow",
            style
          )}
        >
          {children}
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
