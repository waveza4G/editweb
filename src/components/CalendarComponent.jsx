import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent({ entries }) {
  const [highlightedDates, setHighlightedDates] = useState([]);

  // แก้จากเดือนวันปีเป็นวันเดือนปี 13/10/67
  useEffect(() => {
    // ดึงวันที่ที่มีรายการจาก entries และเก็บในรูปแบบ "DD-MM-YYYY"
    const datesWithEntries = entries
      .map(entry => entry.date)
      .filter(date => date)
      .map(date => {
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
      }); // เก็บในรูปแบบ DD-MM-YYYY

    setHighlightedDates(datesWithEntries);
  }, [entries]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      if (highlightedDates.includes(formattedDate)) {
        return 'highlight';
      }
    }
    return null;
  };

  return (
    <div>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
}

export default CalendarComponent;
