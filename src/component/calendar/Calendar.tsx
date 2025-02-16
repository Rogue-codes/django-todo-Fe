import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, startOfMonth, startOfWeek, addDays, isSameDay } from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();

  // Generate calendar days
  const startDate = startOfWeek(startOfMonth(selectedDate));
  const days = Array.from({ length: 42 }, (_, i) => addDays(startDate, i));

  return (
    <div className="w-full mx-auto border p-4 bg-white rounded-md shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="text-gray-600 hover:text-blue-600"
          onClick={() =>
            setSelectedDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)))
          }
        >
          <FaChevronLeft />
        </button>
        <h2 className="text-lg font-semibold">{format(selectedDate, "MMMM yyyy")}</h2>
        <button
          className="text-gray-600 hover:text-blue-600"
          onClick={() =>
            setSelectedDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)))
          }
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Date Picker & Today Button */}
      <div className="flex items-center justify-between mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border rounded-md px-3 py-1 text-gray-700"
          dateFormat="MMM d, yyyy"
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded-md"
          onClick={() => setSelectedDate(today)}
        >
          Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 text-center text-gray-500 mb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-2 rounded-md ${
              isSameDay(day, today) ? "bg-blue-600 text-white font-bold" : "text-gray-700"
            }`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
