import React from 'react';

function OverviewCard({ title, value, percentage, entries = [], onClick }) {
  return (
    <div onClick={onClick} style={{
      backgroundColor: "#FFE4E1", borderRadius: "10px", padding: "1rem", textAlign: "center", cursor: "pointer",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{ color: "#FF69B4", fontSize: "18px", fontWeight: "bold" }}>{title}</div>
      <p style={{ color: "#FF1493", fontSize: "24px", fontWeight: "bold" }}>{value}</p>
      
      
    </div>
  );
}

export default OverviewCard;
