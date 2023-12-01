import "./header.css";
import logo from "../../../assets/image/logo.png";
import avatarDefault from "../../../assets/image/avatarDefault.png";
import iconMore from "../../../assets/imageButtons/more.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const dataUser = localStorage.getItem("userAdmin");
      setUser(JSON.parse(dataUser));
    };
    getUser();
  }, []);


    const navigate = useNavigate();
    const handleOnClickLogout = () => {
        localStorage.removeItem("userAdmin");
        navigate("/login");
    }
    return (
        <div className="header-container">
            <Link className="header-logo" to="/home">
                <img className="logo-img" src={logo} />
                <p className="logo-name">CINEZA</p>
            </Link>
            <div className="header-inform">
                <img className="header-inform-avatar" src={avatarDefault} />
                <p className="header-inform-name">{user.fullName}</p>
                <p className="action-logout" onClick={handleOnClickLogout}>Đăng xuất</p>
            </div>
        </div>
    );

};

export default Header;
