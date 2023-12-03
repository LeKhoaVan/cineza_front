import iconAddress from "../../../assets/imageButtons/iconAddress.png";
import ButtonSidebar from "../../ButtonSidebar";
import iconUser from "../../../assets/imageButtons/iconUser.png";
import iconProduct from "../../..//assets/imageButtons/iconProduct.png";
import iconBack from "../../../assets/imageButtons/iconBack.png";
import iconPromotion from "../../../assets/imageButtons/iconPromotion.png";
import { Link } from "react-router-dom";
import "./sidebarHierarychStructure.css";

import { useState } from "react";

const SidebarHierarchyStructure = () => {
  const titleButton = [
    { text: "Vị trí địa lý", image: iconAddress, href: "/vtdl" },
    { text: "Người sử dụng", image: iconUser, href: "/users" },
    // { text: "Sản phẩm", image: iconProduct, href: "#" },
    // { text: "Khuyến mãi", image: iconPromotion, href: "/promotions" },
  ];

  // quản lý trạng thái button
  const [selectedButtons, setSelectedButtons] = useState(null);
  const handleButtonClick = (buttonId) => {
    // Cập nhật trạng thái chọn
    if (selectedButtons == buttonId) {
      setSelectedButtons(null);
    } else {
      setSelectedButtons(buttonId);
    }
  };

  return (
    <div className="sidebar-hierarych-structure">
      <div className="sidebar-btn-back">
        <Link to={"/home"}>
          <img src={iconBack} className="img-btn-sidebar" />
        </Link>
      </div>
      {titleButton.map((ct, index) => {
        return (
          <div key={index}
            className={
              selectedButtons === ct.text ? "selected" : "none-selected"
            }
            onClick={() => handleButtonClick(ct.text)}
          >
            <ButtonSidebar
              text={ct.text}
              image={ct.image}
              href={ct.href}
            />
          </div>
        );
      })}
    </div>
  );
};
export default SidebarHierarchyStructure;
