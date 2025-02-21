import Header from "../../component/header/Header";
import HorizontalCalendar from "../../component/calendar/HorizontalCalendar";
import Task from "../../component/Tasks/Tasks";
import Calendar from "../../component/calendar/Calendar";
import CreateTask from "../../component/Tasks/CreateTask";
import { useState } from "react";

export default function Dashboard() {
  const [showCreatetaskModal, setShowCreatetaskModal] = useState(false);
  return (
    <div>
      <Header setShowCreatetaskModal={setShowCreatetaskModal}/>
      <div className="flex relative mt-7 justify-between items-start">
        <div className="w-[70%]  border border-gray-200 shadow rounded-lg pb-12">
          <HorizontalCalendar />
          <Task />
        </div>

        <div className="w-[28%]">
          <Calendar />
        </div>
        {showCreatetaskModal && <CreateTask setShowCreatetaskModal={setShowCreatetaskModal} />}
      </div>
    </div>
  );
}
