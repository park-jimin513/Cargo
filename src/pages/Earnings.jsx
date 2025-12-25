import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Earnings.css";

const Earnings = () => {
  const navigate = useNavigate();

  // Mock data for the table
  const transactions = [
    { id: "#TR-9021", date: "2025-12-22", car: "Model S", amount: 198, status: "Paid" },
    { id: "#TR-8842", date: "2025-12-18", car: "Taycan", amount: 450, status: "Paid" },
    { id: "#TR-7721", date: "2025-12-10", car: "Model 3", amount: 120, status: "Processing" },
  ];

  return (
    <div className="earnings-page-container">
      <div className="section-header">
        <h2>Financial Overview</h2>
      </div>

      {/* Top Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card glass-morphism gold-glow">
          <span className="stat-label">Total Revenue</span>
          <h3 className="stat-value">$4,250.00</h3>
          <div className="stat-trend positive">+12.5% vs last month</div>
        </div>

        <div className="stat-card glass-morphism blue-glow">
          <span className="stat-label">Earnings This Month</span>
          <h3 className="stat-value">$1,120.00</h3>
          <div className="stat-trend">8 bookings total</div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="transactions-section glass-morphism">
        <div className="table-header">
          <h3>Recent Transactions</h3>
          <button className="export-btn">Download CSV</button>
        </div>
        <table className="earnings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Car</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td className="tx-id">{t.id}</td>
                <td>{t.date}</td>
                <td>{t.car}</td>
                <td className="tx-amount">${t.amount}</td>
                <td>
                  <span className={`status-tag ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="back-btn-pill" onClick={() => navigate("/owner")}>
        ← Back
      </button>
    </div>
  );
};

export default Earnings;