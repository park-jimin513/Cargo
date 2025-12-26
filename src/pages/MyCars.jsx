import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyCars.css";

const MyCars = ({ cars }) => {
  const navigate = useNavigate();

  const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="50%" fill="%23fff" font-size="20" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>';

  return (
    <div className="my-cars-container">
      {/* Header Section */}
      <div className="section-header">
        <h2>Your Fleet ({cars.length})</h2>
      </div>

      {/* Main Content Area */}
      <div className="cars-grid">
        {cars.length === 0 ? (
          <p className="empty-message">No cars listed in your fleet yet.</p>
        ) : (
          cars.map((car) => (
            <div key={car._id || car.id} className="car-card glass-morphism">
              <img
                src={car.imageUrl || car.image || placeholder}
                alt={car.name}
              />
              <div className="car-info">
                <h3>
                  {car.brand} {car.name}
                </h3>
                <p>
                  ${car.price}/day • {car.color}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom-Left Navigation */}
      <button className="back-btn" onClick={() => navigate("/owner")}>
        ← Back
      </button>
    </div>
  );
};

export default MyCars;