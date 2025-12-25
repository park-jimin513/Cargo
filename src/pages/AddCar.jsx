import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddCar.css";

function AddCar({ onClose, onCarAdded }) {
  const [carData, setCarData] = useState({
    name: "",
    brand: "",
    price: "",
    color: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCar = {
      id: Date.now(),
      ...carData,
      image: carData.image
        ? URL.createObjectURL(carData.image)
        : null,
    };

    onCarAdded(newCar);
    onClose();
  };

  const navigate = useNavigate();

  return (
    <div className="form-container glass-morphism">
      <div className="form-header">
        <h2>List a New Car</h2>
        <button className="close-x" onClick={onClose}>✕</button>
      </div>

      <form className="add-car-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Car Name</label>
          <input
            type="text"
            name="name"
            required
            value={carData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            required
            value={carData.brand}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price / Day</label>
            <input
              type="number"
              name="price"
              required
              value={carData.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              name="color"
              required
              value={carData.color}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Car Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCarData({ ...carData, image: e.target.files[0] })
            }
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            List Car
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCar;
