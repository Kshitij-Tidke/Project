import { useState } from 'react';

const DatePicker = ({ selectedDate, onDateSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [currentDate, setCurrentDate] = useState(new Date()); 

  const daysOfWeek = ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (day) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDateSelect(selected); 
    setIsOpen(false); 
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const formattedDate = selectedDate
    ? `${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
    : '';

  return (
    <div>
      <label className="block text-gray-700 mb-2">{label}</label>

      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-md"
        readOnly
        value={formattedDate}
        placeholder="Select a date"
        onClick={() => setIsOpen(!isOpen)} 
      />

      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-2">
          <div className="flex justify-between items-center mb-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handlePrevMonth}
            >
              &lt;
            </button>
            <h2 className="text-lg font-bold">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-gray-500">
                {day}
              </div>
            ))}

            {[...Array(firstDayOfMonth)].map((_, index) => (
              <div key={index}></div>
            ))}

            {[...Array(daysInMonth)].map((_, day) => (
              <button
                key={day}
                className={`p-2 rounded-lg ${
                  selectedDate &&
                  selectedDate.getDate() === day + 1 &&
                  selectedDate.getMonth() === currentDate.getMonth() &&
                  selectedDate.getFullYear() === currentDate.getFullYear()
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() => handleDateClick(day + 1)}
              >
                {day + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
