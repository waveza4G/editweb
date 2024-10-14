import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ onSelectTab }) {
  const [activeTab, setActiveTab] = useState("#home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onSelectTab) onSelectTab(tab); // ตรวจสอบว่ามี onSelectTab หรือไม่
  };

  return (
    <div className="list-group list-group-flush">
      <div style={{
        fontFamily: 'sans-serif',
        fontSize: '24px',
        color: '#FF69B4',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        Money Lecture
      </div>
      
      <Link
        to="/home"
        onClick={() => handleTabClick("#home")}
        className={`list-group-item list-group-item-action ${activeTab === "#home" ? "active" : ""}`}
        style={{
          border: '2px solid #FF69B4', 
          padding: '10px',
          borderRadius: '10px',
          color: activeTab === "#home" ? '#FFF' : '#FF69B4',
          backgroundColor: activeTab === "#home" ? '#FF69B4' : 'transparent',
          textAlign: 'center',
          marginBottom: '0.2rem',
          textDecoration: 'none' // เอาเส้นใต้ลิงก์ออก
        }}
      >
        Home
      </Link>
      
      <Link
        to="/overview"
        onClick={() => handleTabClick("#overview")}
        className={`list-group-item list-group-item-action ${activeTab === "#overview" ? "active" : ""}`}
        style={{
          border: '2px solid #FF69B4',
          padding: '10px',
          borderRadius: '10px',
          color: activeTab === "#overview" ? '#FFF' : '#FF69B4',
          backgroundColor: activeTab === "#overview" ? '#FF69B4' : 'transparent',
          textAlign: 'center',
          marginBottom: '0.2rem',
          textDecoration: 'none'
        }}
      >
        Overview
      </Link>
      
      <Link
        to="/account"
        onClick={() => handleTabClick("#account")}
        className={`list-group-item list-group-item-action ${activeTab === "#account" ? "active" : ""}`}
        style={{
          border: '2px solid #FF69B4',
          padding: '10px',
          borderRadius: '10px',
          color: activeTab === "#account" ? '#FFF' : '#FF69B4',
          backgroundColor: activeTab === "#account" ? '#FF69B4' : 'transparent',
          textAlign: 'center',
          marginBottom: '0.5rem',
          textDecoration: 'none'
        }}
      >
        Account
      </Link>
    </div>
  );
}

export default Sidebar;
