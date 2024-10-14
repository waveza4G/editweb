import React from 'react';
import { Navbar, Form, FormControl, Nav } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

function Header() {
    const headerStyle = {
    
    };
  
    const leftSectionStyle = {
      display: "flex",
      alignItems: "center",
    };
  
    const rightSectionStyle = {
      display: "flex",
      alignItems: "center",
      gap: "28rem",
    };
  
    const searchStyle = {
      padding: "0.5rem",
      borderRadius: "20px",
      border: "1px solid #ddd",
      marginLeft: "1rem",
    };
  
    return (
      <div style={headerStyle}>
        <div style={leftSectionStyle}>
          <span style={{ fontFamily: 'sans-serif', fontSize: "1.67rem", color: "#FF69B4", fontWeight: 'bold' }}>Home</span>
          
          <div style={rightSectionStyle}>
          <i className="fas fa-users" />
          <i className="fas fa-bell" />
          <img
            src="profile_picture_url" // แทนที่ด้วย URL รูปโปรไฟล์
            alt="Profile"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </div>
        
          
          
        </div>
      </div>
    );
  }

export default Header;
