import React, { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import OverviewCard from './OverviewCard';
import LatestEntries from './LatestEntries';
import CustomCalendar from './CustomCalendar';
import { Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap';

function DashboardLayout() {
  const [selectedTab, setSelectedTab] = useState("รายรับ");
  const [entries, setEntries] = useState({
    รายรับ: [],
    รายจ่าย: [],
    ยอดเงินเก็บ: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    time: "",
  });
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = () => {
    if (!formData.amount) {
      setError("กรุณากรอกจำนวนเงิน");
      return;
    }

    const entryAmount = parseFloat(formData.amount);
    const newEntry = { 
      source: formData.source, 
      amount: selectedTab === "รายจ่าย" || selectedTab === "ยอดเงินเก็บ" ? -entryAmount : entryAmount, 
      date: formData.date, 
      time: formData.time,
      type: selectedTab
    };

    setEntries(prevEntries => ({
      ...prevEntries,
      [selectedTab]: [...prevEntries[selectedTab], newEntry],
    }));

    if (selectedTab === "รายรับ") {
      setBalance(prevBalance => prevBalance + entryAmount);
    } else if (selectedTab === "รายจ่าย" || selectedTab === "ยอดเงินเก็บ") {
      setBalance(prevBalance => prevBalance - entryAmount);
    }

    handleCancel();
    setShowModal(false);
  };

  const handleEditEntry = useCallback((entry) => {
    setIsEditMode(true);
    setFormData({ 
      source: entry.source, 
      amount: Math.abs(entry.amount).toString(), 
      date: entry.date, 
      time: entry.time 
    });
    setCurrentEntry(entry);
    setShowModal(true);
  }, []);

  const handleUpdateEntry = () => {
    if (!formData.amount) {
      setError("กรุณากรอกจำนวนเงิน");
      return;
    }

    const entryAmount = parseFloat(formData.amount);
    const updatedEntry = { 
      source: formData.source, 
      amount: selectedTab === "รายจ่าย" || selectedTab === "ยอดเงินเก็บ" ? -entryAmount : entryAmount, 
      date: formData.date, 
      time: formData.time,
      type: selectedTab
    };

    setEntries(prevEntries => {
      const updatedTypeEntries = prevEntries[selectedTab].map(entry => 
        entry === currentEntry ? updatedEntry : entry
      );

      return {
        ...prevEntries,
        [selectedTab]: updatedTypeEntries,
      };
    });

    handleCancel();
    setShowModal(false);
  };

  const handleCancel = () => {
    setFormData({
      source: "",
      amount: "",
      date: "",
      time: "",
    });
    setError("");
    setIsEditMode(false);
    setCurrentEntry(null);
    setShowModal(false);
  };

  const calculateTotal = (type) => {
    return entries[type].reduce((acc, entry) => acc + entry.amount, 0);
  };

  const combinedEntries = entries["รายรับ"]
    .concat(entries["รายจ่าย"], entries["ยอดเงินเก็บ"])
    .sort((a, b) => new Date(b.date) - new Date(a.date) || b.time.localeCompare(a.time))
    .map((entry) => ({
      ...entry,
      onEdit: () => handleEditEntry(entry),
    }));

  return (
    <div style={{ display: "flex", width: "100vw", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div style={{
        backgroundColor: "#F8E7EF", color: "#333", width: "240px", minHeight: "100vh", boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
        padding: "1rem", position: "fixed", top: 0, left: 0,
      }}>
        <Sidebar onSelectTab={setSelectedTab} />
      </div>
      <div style={{ flex: 1, padding: "2rem", marginLeft: "260px" }}>
        <Header />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem", marginTop: "1rem" }}>
          <OverviewCard title="รายรับ" value={`฿${calculateTotal("รายรับ")}`} entries={entries["รายรับ"]} onClick={() => setSelectedTab("รายรับ")} />
          <OverviewCard title="รายจ่าย" value={`฿${calculateTotal("รายจ่าย")}`} entries={entries["รายจ่าย"]} onClick={() => setSelectedTab("รายจ่าย")} />
          <OverviewCard title="ยอดคงเหลือ" value={`฿${balance}`} entries={[]} />
          <OverviewCard title="ยอดเงินเก็บ" value={`฿${calculateTotal("ยอดเงินเก็บ")}`} entries={entries["ยอดเงินเก็บ"]} onClick={() => setSelectedTab("ยอดเงินเก็บ")} />
        </div>

        <Row className="mt-4">
          <Col md={6}>
            <LatestEntries entries={combinedEntries} title="รายการรายรับ-รายจ่าย-ยอดเงินเก็บล่าสุด" onEditEntry={handleEditEntry} />
          </Col>
          <Col md={6}>
            <div style={{ padding: "20px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
              <CustomCalendar entries={combinedEntries} />
            </div>
          </Col>
        </Row>

        <button style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "15px 30px",
          backgroundColor: "#FF69B4",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "50px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          border: "none",
        }} onClick={() => { setIsEditMode(false); setShowModal(true); }}>
          เพิ่มรายการ
        </button>

        <Modal show={showModal} onHide={handleCancel} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditMode ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formType">
                <Form.Label>ประเภท:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTab}
                  onChange={(e) => setSelectedTab(e.target.value)}
                  disabled={isEditMode}
                >
                  <option value="รายรับ">รายรับ</option>
                  <option value="รายจ่าย">รายจ่าย</option>
                  <option value="ยอดเงินเก็บ">ยอดเงินเก็บ</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formSource" className="mt-3">
                <Form.Label>ที่มา:</Form.Label>
                <Form.Control
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="กรอกที่มาของรายรับ/รายจ่าย"
                />
              </Form.Group>
              <Form.Group controlId="formAmount" className="mt-3">
                <Form.Label>จำนวนเงิน:</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="กรอกจำนวนเงิน"
                />
              </Form.Group>
              <Form.Group controlId="formDate" className="mt-3">
                <Form.Label>วันที่:</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formTime" className="mt-3">
                <Form.Label>เวลา:</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </Form.Group>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              ยกเลิก
            </Button>
            <Button variant="primary" onClick={isEditMode ? handleUpdateEntry : handleAddEntry}>
              {isEditMode ? "บันทึกการเปลี่ยนแปลง" : "บันทึก"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default DashboardLayout;
