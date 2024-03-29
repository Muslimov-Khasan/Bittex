// import "./Moderator.css";
import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import LocationIcon from "../../Assets/img/location.svg";
import { Link } from "react-router-dom";

const ModeratorCheked = () => {
  const [productsItems, setProductsItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId.id);
    }
  }, [productId]); // Fetch product details when selectedProduct changes

  const fetchData = async () => {
    const storedToken = localStorage.getItem("authToken");
    const response = await fetch(
      `https://vaziat.uz/api/v1/products/get-all-by-check/${true}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    const data = await response.json();
    setProductsItems(data);
  };

  const fetchProductDetails = async (productId) => {
    const storedToken = localStorage.getItem("authToken");
    const response = await fetch(
      `https://vaziat.uz/api/v1/products/get-by-id/${productId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    const data = await response.json();
    setProductDetails(data);
  };

  const openModal = (product) => {
    setProductId(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setProductId(null);
    setProductDetails(null);
    setModalIsOpen(false);
  };

  Modal.setAppElement("#root"); // Assuming your root element has the id "root"
  const shouldAddClass = true;

  return (
    <>
      <div className="contianer">
        <h2 className="moderator-title">Tasdiqlangan</h2>
        <div className="button-row">
        <div
            className="po"
            style={{
              display: "flex",
              border: "1px solid #d0d5dd",
              borderRight: "1px solid #d0d5dd", // Add right border
              borderRadius: "8px",
              minWidth: "300px", // Adjust the minimum width as needed
          
            }}
          >
            <Link
              className={`wrapper-link ${shouldAddClass ? "" : ""}`}
              to="/Moderator"
              style={{
                flex: 1,
                padding: "10px",
                textAlign: "center",
                whiteSpace: "nowrap", // Add white-space property
              }}
            >
              Yangi qo’shilgan
            </Link>
            <Link
              className={`wrapper-link ${shouldAddClass ? "newClass" : ""}`}
              to="/ModeratorCheked"
              style={{
                flex: 1,
                padding: "10px",
                textAlign: "center",
                borderLeft: "1px solid #d0d5dd",
              }}
            >
              Tasdiqlangan
            </Link>
          </div>
        </div>
        <ul className="productcheked-list">
          {productsItems.map((product, index) => (
            <li
              className="productcheked-item"
              key={index}
              onClick={() => openModal(product)}
            >
              <img
                className="productcheked-img"
                src={product.photoUrl}
                alt=""
                width={280}
                height={180}
              />
              <p className="productcheked-region">
                <img src={LocationIcon} alt="" width={19} height={19} />{" "}
                {product.region}
              </p>
              <h2 className="productcheked-title">{product.name}</h2>
              <p className="productcheked-description">{product.description}</p>
              <div className="productcheked-wrapper">
                <p className="productcheked-price">{product.price} So'm</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        isOpen={modalIsOpen}
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
        onRequestClose={closeModal}
      >
        <div>
          <button className="modal-close-button" onClick={closeModal}>
            &#10006;
          </button>
          {productDetails && (
            <>
              <div className="nimaaa">
                <p className="tesy">{productDetails.name} Nomi</p>
                <p className="tesy"> {productDetails.category?.nameL} Kategory nomi</p>
              </div>
              <div className="modal-img-container">
                {productDetails?.imageList.map((imageUrl, index) => (
                  <img
                    className="modal-img"
                    src={imageUrl}
                    alt="Description"
                    width={120}
                    height={120}
                    key={index}
                  />
                ))}
              </div>
              <div className="nimaaa">
                <p className="tesy">{productDetails.price} So'm</p>
                <p className="tesy">{productDetails.user.phone} Telefon raqam</p>
              </div>
              <div className="description">
                <p>{productDetails.description}</p>
              </div>
              <div className="infos">
                <p className="tesy">{productDetails.region}</p>
                <p className="tesy">{productDetails.district}</p>
                <p className="tesy">{productDetails.user.phone}</p>
                <p className="tesy">{productDetails.status} Status</p>
                <p className="tesy">{new Date(productDetails.category.createdDate).toLocaleString()} Vaqti</p>

              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModeratorCheked;
