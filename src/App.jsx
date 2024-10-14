import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Overview from './components/Overview';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardLayout />} />
                <Route path="/overview" element={<Overview />} />
                {/* เพิ่มเส้นทางอื่นๆ ได้ที่นี่ */}
            </Routes>
        </Router>
    );
}

export default App;
