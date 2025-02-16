import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetTasksQuery } from "../../api/task.api";
import { ITask } from "../../interface/ITask.interface";

const tasks = [
  { id: 1, title: "Create Wireframe", time: "10:30 am - 11:30 am" },
  { id: 2, title: "Design Landing Page", time: "11:30 am - 12:00 pm" },
  { id: 3, title: "Go shopping", time: "12:30 pm - 1:30 pm" },
  { id: 4, title: "Do my laundry", time: "1:30 pm - 2:10 pm" },
  { id: 5, title: "Meeting with Product Manager", time: "2:15 pm - 4:30 pm" },
  { id: 6, title: "Meeting with Stakeholder", time: "5:30 pm" },
  {
    id: 7,
    title: "Create Wireframe",
    time: "9:00 am - 10:00 am",
    completed: true,
  },
];

const Task = () => {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const toggleTask = (id: number) => {
    setSelectedTasks((prev: any) =>
      prev.includes(id) ? prev.filter((t: any) => t !== id) : [...prev, id]
    );
  };

  const { data, isloading } = useGetTasksQuery({});

  console.log("data", data);

  return (
    <div className="w-full h-full px-5 rounded-md">
      <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
      <div className="divide-y">
        {data?.results?.map((task: ITask) => (
          <label
            key={task.task_id}
            className={`flex items-center justify-between p-3 ${
              task.status === "completed"
                ? "text-gray-400 line-through"
                : "text-gray-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                className="h-5 w-5 accent-blue-600"
                // checked={selectedTasks.includes(task.id)}
                // onChange={() => toggleTask(task.id)}
              />
              <div>
                <p className="font-medium -mt-2">{task.title}</p>
                <div className="flex justify-start items-center gap-3">
                  <p className="text-sm text-gray-500">{task.start_time}</p> -{" "}
                  <p className="text-sm text-gray-500">{task.end_time}</p>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">Today</span>
          </label>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t mt-4 pt-4">
        <button className="flex items-center gap-1 text-blue-600 hover:underline">
          <FaChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <div className="flex items-center gap-2">
          {[1, 2, 3, "...", 8, 9, 10].map((num, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${
                num === 1 ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-blue-600 hover:underline">
          Next
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Task;
