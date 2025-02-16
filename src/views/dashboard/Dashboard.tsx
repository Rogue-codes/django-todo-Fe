import Header from "../../component/header/Header";
import HorizontalCalendar from "../../component/calendar/HorizontalCalendar";
import Task from "../../component/Tasks/Tasks";
import Calendar from "../../component/calendar/Calendar";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="flex mt-7 justify-between items-start">
        <div className="w-[70%] shadow rounded-lg pb-12 border">
          <HorizontalCalendar />
          <Task />
        </div>

        <div className="w-[28%]">
        <Calendar />

        </div>
      </div>
    </div>
  );
}
