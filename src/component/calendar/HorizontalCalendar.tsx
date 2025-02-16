import { useState } from "react";
import dayjs from "dayjs";

const HorizontalCalendar = () => {
  const today = dayjs(); // Get today's date
  const [selectedDate, setSelectedDate] = useState(today.date()); // Default selected date

  // Generate 7 consecutive days starting from today
  const days = Array.from({ length: 11 }, (_, i) => {
    const current = today.add(i, "day");
    return {
      day: current.format("ddd"), // Mon, Tue, etc.
      date: current.date(), // Numeric date
    };
  });

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">{today.format("MMMM YYYY")}</h2>
      <div className="flex gap-2 overflow-x-auto">
        {days.map((d) => (
          <button
            key={d.date}
            className={`flex flex-col w-[14%] items-center px-3 py-2 border rounded-md ${
              selectedDate === d.date
                ? "bg-blue-600 text-white font-bold"
                : "bg-gray-100"
            }`}
            onClick={() => setSelectedDate(d.date)}
          >
            <span>{d.day}</span>
            <span className="text-lg">{d.date}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCalendar;
