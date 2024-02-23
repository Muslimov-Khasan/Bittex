import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Edit from "../../Assets/img/edit.png";
import Trush_Icon from "../../Assets/img/Trush_Icon.png";
import Nav from "../Nav/Nav";
import "./addCategory.css";
const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDeleteIndex, setCategoryToDeleteIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [categoriesData, setCategoriesData] = useState({
    nameL: "",
    nameK: "",
  }); // Add imgUrl to your state
  const [editCategoryData, setEditCategoryData] = useState({
    nameL: "",
    nameK: "",
  });

  const [statusChangeData, setStatusChangeData] = useState({
    id: "",
    status: "",
  });

  const openEditModal = (index) => {
    const selectedCategory = categories[index];
    setEditCategoryData(selectedCategory);
    setIsEditModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    // Clear form data after closing the modal
    setEditCategoryData({
      nameL: "",
      nameK: "",
    });
  };

  const fetchDataGetAll = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const responseGetcategory = await fetch(
        `https://vaziat.uz/api/v1/category/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const dataGet = await responseGetcategory.json();
      setCategories(dataGet);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataGetAll();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Clear form data after closing the modal
    setCategoriesData({
      nameL: "",
      nameK: "",
    });
  };

  function convertUzbekLatinToCyrillic(uzbekLatinWord) {
    const uzbekLatinToCyrillicMapping = {
      a: "а",
      b: "б",
      d: "д",
      e: "е",
      f: "ф",
      g: "г",
      h: "ҳ",
      i: "и",
      j: "ж",
      k: "к",
      l: "л",
      m: "м",
      n: "н",
      o: "о",
      p: "п",
      q: "қ",
      r: "р",
      s: "с",
      t: "т",
      u: "у",
      v: "в",
      x: "х",
      y: "й",
      z: "з",
      sh: "ш",
      ch: "ч",
      ng: "нг",
    };

    const uzbekCyrillicWord = uzbekLatinWord
      .toLowerCase()
      .replace(/sh|ch|gh/g, (match) => uzbekLatinToCyrillicMapping[match])
      .replace(
        /[a-z]/g,
        (letter) => uzbekLatinToCyrillicMapping[letter] || letter
      );

    return uzbekCyrillicWord;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "nameL") {
      let convertWord = convertUzbekLatinToCyrillic(value);
      convertWord = convertWord.charAt(0).toUpperCase() + convertWord.slice(1);
      setCategoriesData((prevData) => ({
        ...prevData,
        ["nameK"]: convertWord,
      }));
    }
    setCategoriesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");
    if (
      categoriesData.nameL.length === 0 ||
      categoriesData.nameK.length === 0
    ) {
      setError("Barcha malumotlarni to'ldirish shart ?!.");
      return;
    }

    const response = await fetch("https://vaziat.uz/api/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(categoriesData),
    });

    // Check if the response content type is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const newCategory = await response.json();
      setCategories((prevCategories) => [...prevCategories, newCategory]);
    } else {
      console.log("Success:", await response.text());
    }
    closeModal();
    fetchDataGetAll();
  };

  const handleDeleteClick = (index) => {
    setCategoryToDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const itemId = categories[categoryToDeleteIndex].id;

      const response = await fetch(
        `https://vaziat.uz/api/v1/category/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      // Remove the deleted category from the state
      setCategories((prevCategories) =>
        prevCategories.filter((_, i) => i !== categoryToDeleteIndex)
      );

      // Close the delete confirmation modal
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteCancelled = () => {
    setCategoryToDeleteIndex(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditClick = (index) => {
    openEditModal(index);
  };

  const handleToggle = () => {
    setToggleStatus((prevToggleStatus) => !prevToggleStatus);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nameL") {
      let convertWord = convertUzbekLatinToCyrillic(value);
      convertWord = convertWord.charAt(0).toUpperCase() + convertWord.slice(1);
      setEditCategoryData((prevData) => ({
        ...prevData,
        ["nameK"]: convertWord,
      }));
    }

    setEditCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    if (!editCategoryData) {
      return;
    }

    try {
      const storedToken = localStorage.getItem("authToken");
      let a = await fetch(
        `https://vaziat.uz/api/v1/category/update/${editCategoryData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            nameL: editCategoryData.nameL,
            nameK: editCategoryData.nameK,
          }),
        }
      );
      console.log(a.status);

      // Close the edit modal after successful submission
      closeEditModal();
      fetchDataGetAll();
    } catch (error) {
      console.error("Error submitting edit form:", error);
    }
  };

  const handleChangeStatus = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await fetch(
        `https://vaziat.uz/api/v1/category/change-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            id: statusChangeData.id,
            status: statusChangeData.status,
          }),
        }
      );

      // Update the status of the category in the state
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === statusChangeData.id
            ? { ...category, status: statusChangeData.status }
            : category
        )
      );
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const handleStatusChange = (id, status) => {
    setStatusChangeData({ id, status });
    handleChangeStatus();
  };

  const threePointButton = (index) => {
    setActiveIndex(index);
    setShowActions((prevShowActions) => !prevShowActions);
  };

  Modal.setAppElement("#root");
  return (
    <>
      {categories.length === 0 && (
        <p className="loading-text">Yuklanmoqda...</p>
      )}
      <div className="container">
        <div className="admin-wrapper">
          <Nav />
          <div className="addcatgory-word">
            <div className="po">
              <button className="addcategoriya-btn" onClick={openModal}>
                ➕ Kategoriya qo’shish
              </button>
            </div>
          </div>
          <table className="add-catgory-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Kategoriya nomi</th>
                <th>Категория номи</th>
                <th>status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((addcategory, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>{addcategory.nameL}</td>
                  <td>{addcategory.nameK}</td>
                  <td>
                    <div className="toggle-wrapper">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={addcategory.status === "ACTIVE"}
                          onChange={() =>
                            handleStatusChange(
                              addcategory.id,
                              addcategory.status === "ACTIVE"
                                ? "NOT_ACTIVE"
                                : "ACTIVE"
                            )
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    {addcategory.status && (
                      <p className="toggle-message">{addcategory.status}</p>
                    )}
                  </td>

                  <td>
                    <button
                      className="categories-btn"
                      onClick={() => {
                        threePointButton(index);
                      }}
                    >
                      &#x22EE;
                    </button>

                    {showActions && activeIndex === index && (
                      <div className="addcategories-buttons">
                        <button
                          className="addcategories-delete"
                          onClick={() => {
                            handleDeleteClick(index);
                            setShowActions(false); // Close the options after deleting
                          }}
                        >
                          <img
                            className="picture"
                            src={Trush_Icon}
                            alt="Trush Icon"
                            width={20}
                            height={20}
                          />
                          o'chirish
                        </button>
                        <button
                          className="addcategories-edit"
                          onClick={() => {
                            handleEditClick(index);
                            setShowActions(false); // Close the options after editing
                          }}
                        >
                          <img
                            className="picture"
                            src={Edit}
                            alt="Edit"
                            width={25}
                            height={25}
                          />
                          Tahrirlash
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={isModalOpen}
          className="react-modal-content"
          overlayClassName="react-modal-overlay"
          onRequestClose={closeModal}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button className="add-btn" onClick={closeModal}>
                &#10006;
              </button>
              <h2 className="modal-title">Yangi Kategoriya Qo'shish</h2>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <h4 style={{ color: "red", textAlign: "center" }}>{error}</h4>
                <label>
                  Kategoriya nomi
                  <input
                    type="text"
                    name="nameL"
                    value={categoriesData.nameL}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                </label>
                <label>
                  Категория номи
                  <input
                    type="text"
                    name="nameK"
                    value={categoriesData.nameK}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </label>

                <button className="save-btn" type="submit">
                  Saqlash
                </button>
              </form>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          className="react-modal-content"
          overlayClassName="react-modal-overlay"
          onRequestClose={closeEditModal}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button className="category-close-btn" onClick={closeEditModal}>
                &#10006;
              </button>
              <h2 className="modal-title">Kategoriyani tahrirlash</h2>
            </div>
            <div className="modal-body-editd">
              <form onSubmit={handleEditFormSubmit}>
                <label>
                  Kategoriya nomi
                  <input
                    type="text"
                    name="nameL"
                    value={editCategoryData.nameL}
                    onChange={handleEditInputChange}
                    autoComplete="off"
                  />
                </label>
                <label>
                  Категория номи
                  <input
                    type="text"
                    name="nameK"
                    value={editCategoryData.nameK}
                    autoComplete="off"
                    onChange={handleEditInputChange}
                  />
                </label>

                <button className="save-btn" type="submit">
                  Saqlash
                </button>
              </form>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={isDeleteModalOpen}
          className="react-modal-content"
          overlayClassName="react-modal-overlay"
          onRequestClose={handleDeleteCancelled}
        >
          <div className="react-modal-content">
            <button
              className="delete-close-btn"
              onClick={handleDeleteCancelled}
            >
              &#10006;
            </button>
            <h2 className="delete-title">Kategoriyani o’chirish</h2>
            <p className="delete-word">
              “Dehqonchilik” kategoriyasini o’chirishni xohlaysizmi?
            </p>
            <div className="delete-modal-buttons">
              <button className="delete-modal" onClick={handleDeleteConfirmed}>
                O’chirish
              </button>
              <button className="cancel-modal" onClick={handleDeleteCancelled}>
                Bekor qilish
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddCategory;
