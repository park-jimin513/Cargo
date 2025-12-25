import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Bookings.css";

const Bookings = () => {
  const bookingsList = [
    {
      id: 1,
      customer: "Alice",
      car: "Model S",
      from: "2025-12-20",
      to: "2025-12-22",
      total: 198,
      status: "Confirmed",
    },
    // Add more mock data here to see the table fill up
  ];

  const navigate = useNavigate();

  return (
    <div className="my-cars-container">
      <div className="section-header">
        <h2>Rental Bookings</h2>
      </div>

      <div className="table-container glass-morphism">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Customer</th>
              <th>From</th>
              <th>To</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingsList.map((b) => (
              <tr key={b.id}>
                <td className="car-name">{b.car}</td>
                <td>{b.customer}</td>
                <td>{b.from}</td>
                <td>{b.to}</td>
                <td className="price-cell">${b.total}</td>
                <td>
                  <span className={`status-badge ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="back-btn" onClick={() => navigate("/owner")}>
        ← Back
      </button>
    </div>
  );
};

export default Bookings;