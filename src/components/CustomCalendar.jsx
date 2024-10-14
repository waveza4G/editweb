import React, { useState, useEffect } from 'react';
import '../index.css';

function CustomCalendar({ entries }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, entries]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array.from({ length: 42 }, (_, index) => {
      const day = index - firstDayOfMonth + 1;
      return day > 0 && day <= lastDateOfMonth ? day : null;
    });

    setDaysInMonth(daysArray);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getTotalsForDay = (day) => {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayEntries = entries.filter(entry => entry.date === dateStr);

    // คำนวณยอดรวมรายรับ รายจ่าย และยอดเงินเก็บแยกกัน
    const incomeTotal = dayEntries
      .filter(entry => entry.type === "รายรับ")
      .reduce((acc, entry) => acc + entry.amount, 0);

    const expenseTotal = dayEntries
      .filter(entry => entry.type === "รายจ่าย")
      .reduce((acc, entry) => acc + entry.amount, 0);

    const savingsTotal = dayEntries
      .filter(entry => entry.type === "ยอดเงินเก็บ")
      .reduce((acc, entry) => acc + entry.amount, 0);

    return { incomeTotal, expenseTotal, savingsTotal };
  };

  return (
    <div className="custom-calendar">
      <header>
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h3>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={handleNextMonth}>{">"}</button>
      </header>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="calendar-day-header">{day}</div>
        ))}
        {daysInMonth.map((day, index) => {
          const { incomeTotal, expenseTotal, savingsTotal } = getTotalsForDay(day || 0);
          return (
            <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
              {day && (
                <>
                  <span>{day}</span>
                  <div className="entries">
                    {incomeTotal !== 0 && (
                      <div style={{ color: 'green' }}>
                        +฿{Math.abs(incomeTotal).toLocaleString()}
                      </div>
                    )}
                    {expenseTotal !== 0 && (
                      <div style={{ color: 'red' }}>
                        -฿{Math.abs(expenseTotal).toLocaleString()}
                      </div>
                    )}
                    {savingsTotal !== 0 && (
                      <div style={{ color: 'orange' }}>
                        ฿{Math.abs(savingsTotal).toLocaleString()} {/* ยอดเงินเก็บ */}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomCalendar;
