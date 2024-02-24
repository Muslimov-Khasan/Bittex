import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import admin from "../../Assets/img/admin.svg";
import Banner from "../../Assets/img/brand.svg";
import FAQ from "../../Assets/img/FAQ.svg";
import home_icon from "../../Assets/img/home_icon.svg";
import Kategoriya from "../../Assets/img/Kategoriya.svg";
import Links from "../../Assets/img/link.svg";
import News from "../../Assets/img/News.svg";
import Users from "../../Assets/img/users.svg";
import "./Nav.css";

const Nav = () => {
  const [activeBtn, setActiveBtn] = useState();
  const [adminData, setAdminData] = useState([]); // Declare adminData state
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdminData = localStorage.getItem("");
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("", JSON.stringify(adminData));
  }, [adminData]);

  const handleButtonClick = (btnName, route) => {
    setActiveBtn(btnName);
    navigate(route);
  };

  return (
    <>
      <div className="contianer">
        <div className="nav-wrapper">
          <div className="buttons">
            <NavLink
              to="/Monitoring"
              className={`btn ${activeBtn === "Monitoring" ? "active" : ""}`}
              onClick={() => handleButtonClick("Monitoring", "/Monitoring")}
            >
              <img src={home_icon} alt="home_icon" width={21} height={21} />
              Monitoring
            </NavLink>
            <NavLink
              to="/adminAdd"
              className={`btn ${activeBtn === "Admin" ? "active" : ""}`}
              onClick={() => handleButtonClick("Admin", "/adminAdd")}
            >
              <img src={admin} alt="home_icon" width={21} height={21} />
              Admin
            </NavLink>
            <NavLink
              to="/add-category"
              className={`btn ${activeBtn === "Kategoriya" ? "active" : ""}`}
              onClick={() => handleButtonClick("Kategoriya", "/add-category")}
            >
              <img src={Kategoriya} alt="home_icon" width={25} height={25} />
              Kategoriya
            </NavLink>
            <NavLink
              to="/news"
              className={`btn ${activeBtn === "Yangiliklar" ? "active" : ""}`}
              onClick={() => handleButtonClick("Yangiliklar", "/news")}
            >
              <img src={News} alt="home_icon" width={25} height={25} />
              Yangiliklar
            </NavLink>
            <NavLink
              to="/Brand"
              className={`btn ${activeBtn === "Banner" ? "active" : ""}`}
              onClick={() => handleButtonClick("Banner", "/image-upload")}
            >
              <img src={Banner} alt="home_icon" width={25} height={25} />
              Brand
            </NavLink>
            <NavLink
              to="/faq"
              className={`btn ${activeBtn === "faq" ? "active" : ""}`}
              onClick={() => handleButtonClick("faq", "/faq")}
            >
              <img src={FAQ} alt="home_icon" width={25} height={25} />
              FAQ
            </NavLink>
            <NavLink
              to="/users"
              className={`btn ${activeBtn === "users" ? "active" : ""}`}
              onClick={() => handleButtonClick("users", "/users")}
            >
              <img src={Users} alt="home_icon" width={25} height={25} />
              Foydalanuvchilar
            </NavLink>
            <NavLink
              to="/Contact"
              className={`btn ${activeBtn === "Contact" ? "active" : ""}`}
              onClick={() => handleButtonClick("Contact", "/Contact")}
            >
              <img src={Links} alt="home_icon" width={25} height={25} />
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
