import React from 'react';
import { Card, Button } from 'react-bootstrap';

function LatestEntries({ entries, title, onEditEntry }) {
  const latestEntries = entries.slice(-5).reverse();

  return (
    <Card 
      style={{ 
        marginBottom: '1rem', 
        border: '2px solid #ADD8E6', 
        borderRadius: '10px',
      }}
    >
      <Card.Header style={{ backgroundColor: '#E0F7FA', fontWeight: 'bold' }}>
        {title}
      </Card.Header>
      <Card.Body>
        {latestEntries.length > 0 ? (
          latestEntries.map(({ id, source = "ไม่ระบุ", type, amount, date, time }, index) => (
            <div 
              key={id || index} // ใช้ id หากมี มิฉะนั้นจะใช้ index
              style={{ 
                marginBottom: '0.5rem', 
                paddingBottom: '0.5rem', 
                borderBottom: index !== latestEntries.length - 1 ? '1px solid #ADD8E6' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{source}</span>
                <span style={{ 
                  color: type === "รายจ่าย" ? 'red' : type === "รายรับ" ? 'green' : 'orange' 
                }}>
                  ฿{Math.abs(amount).toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'gray', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span>
                    {date 
                      ? new Date(date).toLocaleDateString('th-TH', {
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric'
                        }) 
                      : "ไม่ระบุ"}
                  </span>
                  <span> - {time || "ไม่ระบุ"}</span>
                </div>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onEditEntry({ id, source, type, amount, date, time })} // เรียกใช้ฟังก์ชันแก้ไขทันที
                  style={{ fontSize: '0.8rem', color: '#007bff', textDecoration: 'underline' }}
                >
                  แก้ไข
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>ไม่มีข้อมูล</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default LatestEntries;

