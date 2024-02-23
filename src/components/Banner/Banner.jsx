import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Trush_Icon_red from "../../Assets/img/Trush_Icon_red.svg";
import Nav from "../Nav/Nav";
import "./Banner.css";

const Banner = () => {
  const [brandData, setBrandData] = useState([]);
  const [newBrand, setNewBrand] = useState({ name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBrandData = async () => {
    const storedToken = localStorage.getItem("authToken");
    const response = await fetch("https://vaziat.uz/api/v1/brand/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setBrandData(data);
  };

  useEffect(() => {
    fetchBrandData();
    // Fetch brand data on component mount
  }, []);

  useEffect(() => {
    fetchBrandData();
    fetchBrandData(); // Fetch brand data on component mount
  }, []);

  const handleBrandFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await fetch("https://vaziat.uz/api/v1/brand/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(newBrand),
      });

      if (response.ok) {
        const responseData = await response.json();
        setBrandData((prevBrandData) => [...prevBrandData, responseData]);
        setNewBrand({ name: "" });
        closeModal(); // Close the modal after successful submission
        fetchBrandData(); // Fetch the latest brand data
      }
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  const handleDeleteButtonClick = async (itemId) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await fetch(
        `https://vaziat.uz/api/v1/brand/delete/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        // Handle successful deletion, such as updating the UI
        fetchBrandData(); // Fetch the latest brand data after deletion
      } else {
        console.error("Error deleting brand:", response.status);
      }
    } catch (error) {
      console.error("Error deleting brand:", error.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewBrand({
      name: "",
    });
  };

  Modal.setAppElement("#root"); // Assuming your root element has the id "root"

  return (
    <>
      {brandData.length === 0 && <p className="loading-text">Yuklanmoqda...</p>}
      <div className="container">
        <div className="admin-wrapper">
          <Nav />
          <h2 className="banner-title">Banner</h2>
          <button className="banner-btn" onClick={openModal}>
            +
          </button>

          <div className="banner-wrapper">
            <div className="banner-inner">
              <ul className="banner-list">
                {brandData.map((item) => (
                  <li key={item.id} className="banner-item">
                    <h2>{item.name}</h2>
                    <button
                      className="banner-delete"
                      onClick={() => handleDeleteButtonClick(item.id)}
                    >
                      Oʻchirish
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
        onRequestClose={closeModal}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button className="admin-btn" onClick={closeModal}>
              &#10006;
            </button>
            <h2 className="modal-title">Brand qo’shish</h2>
            <form className="modal-form" onSubmit={handleBrandFormSubmit}>
              <label htmlFor="brandName">Brand nomi</label>
              <input
                type="text"
                className="input-name"
                id="brandName"
                name="name"
                placeholder="Brand nomi"
                autoComplete="off"
                value={newBrand.name}
                onChange={(e) =>
                  setNewBrand({ ...newBrand, name: e.target.value })
                }
              />
              <button className="save-btn" type="submit">
                Saqlash
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Banner;
