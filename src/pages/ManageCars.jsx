import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCar from "./AddCar";
import "../styles/ManageCars.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const ManageCars = () => {
  const navigate = useNavigate();

  // ✅ Start with EMPTY fleet (no dummy data)
  const [cars, setCars] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "",
    price: "",
  });
  const [showAddCarForm, setShowAddCarForm] = useState(false);

  // Delete Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this car from your fleet?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/cars/${id}`, { method: "DELETE" });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        // Try to parse JSON error if present
        if (contentType.includes("application/json")) {
          const json = await res.json();
          alert(json.message || `Error: ${res.status}`);
        } else {
          const text = await res.text();
          console.error("Delete non-JSON response:", text);
          alert(`Delete failed: ${res.status}`);
        }
        return;
      }

      // success
      if (contentType.includes("application/json")) {
        const json = await res.json();
        if (json.ok) setCars((prev) => prev.filter((car) => car.id !== id));
        else alert(json.message || "Delete failed");
      } else {
        // server returned non-JSON success (unlikely) — remove locally
        setCars((prev) => prev.filter((car) => car.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // Start Editing
  const handleEditClick = (car) => {
    setEditingId(car.id);
    setEditFormData({
      name: car.name,
      category: car.category,
      price: car.price,
    });
  };

  // Save Update
  const handleSave = async (id) => {
    const payload = {
      name: editFormData.name,
      brand: editFormData.category,
      price: Number(editFormData.price || 0),
    };
    try {
      const res = await fetch(`${API_BASE}/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        if (contentType.includes("application/json")) {
          const jsonErr = await res.json();
          alert(jsonErr.message || "Update failed");
        } else {
          const text = await res.text();
          console.error("Update non-JSON response:", text);
          alert(`Update failed: ${res.status}`);
        }
        return;
      }

      let json;
      if (contentType.includes("application/json")) json = await res.json();
      if (json && json.ok && json.car) {
        const updated = {
          id: json.car._id || id,
          name: json.car.name,
          category: json.car.brand || editFormData.category,
          price: json.car.price || editFormData.price,
          status: json.car.status || "Available",
        };
        setCars((prev) => prev.map((c) => (c.id === id ? updated : c)));
        setEditingId(null);
      } else {
        alert((json && json.message) || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // Load cars from backend on mount
  React.useEffect(() => {
    fetch(`${API_BASE}/api/cars`)
      .then((r) => r.json())
      .then((res) => {
        if (res.ok && res.cars) {
          const list = res.cars.map((c) => ({
            id: c._id,
            name: c.name,
            category: c.brand || "",
            price: c.price || 0,
            status: c.status || "Available",
          }));
          setCars(list);
        }
      })
      .catch((err) => console.error("fetch cars", err));
  }, []);

  return (
    <div className="manage-cars-container">
      <div className="section-header">
        <h2>Manage Fleet</h2>
        <p>Total Vehicles: {cars.length}</p>
      </div>

      <div className="table-wrapper glass-morphism">
        {cars.length > 0 ? (
          <table className="manage-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Category</th>
                <th>Price/Day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car.id}
                  className={editingId === car.id ? "editing-row" : ""}
                >
                  <td>
                    {editingId === car.id ? (
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <span className="car-name-text">{car.name}</span>
                    )}
                  </td>

                  <td>
                    {editingId === car.id ? (
                      <input
                        type="text"
                        value={editFormData.category}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            category: e.target.value,
                          })
                        }
                      />
                    ) : (
                      car.category
                    )}
                  </td>

                  <td>
                    {editingId === car.id ? (
                      <input
                        type="number"
                        value={editFormData.price}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            price: e.target.value,
                          })
                        }
                      />
                    ) : (
                      `$${car.price}`
                    )}
                  </td>

                  <td>
                    <span className={`status-pill ${car.status.toLowerCase()}`}>
                      {car.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      {editingId === car.id ? (
                        <button
                          className="save-icon-btn"
                          onClick={() => handleSave(car.id)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="edit-btn"
                          onClick={() => handleEditClick(car)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(car.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-fleet-msg">
            <p>No cars listed in your fleet yet.</p>
          </div>
        )}
      </div>

      <div className="footer-actions">
        <button className="back-btn-pill" onClick={() => navigate("/owner")}>
          ← Back
        </button>
        <button
          className="add-new-btn"
          onClick={() => setShowAddCarForm(true)}
        >
          + Add New Car
        </button>
      </div>

      {showAddCarForm && (
        <div className="modal-overlay compact-modal">
          <AddCar
            onClose={() => setShowAddCarForm(false)}
            onCarAdded={(newCar) => {
              // normalize server car to local shape
              const normalized = {
                id: newCar._id || newCar.id,
                name: newCar.name,
                category: newCar.brand || "",
                price: newCar.price || 0,
                status: newCar.status || "Available",
              };
              setCars((prev) => [normalized, ...prev]);
              setShowAddCarForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ManageCars;
