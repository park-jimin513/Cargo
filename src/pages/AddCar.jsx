import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddCar.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

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

    // Send to backend
    const form = new FormData();
    form.append("name", carData.name);
    form.append("brand", carData.brand);
    form.append("price", carData.price);
    form.append("color", carData.color);
    if (carData.image) form.append("image", carData.image);

    fetch(`${API_BASE}/api/cars`, {
      method: "POST",
      body: form,
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.car) {
          onCarAdded(res.car);
          onClose();
        } else {
          alert(res.message || "Failed to save car");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to save car");
      });
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
