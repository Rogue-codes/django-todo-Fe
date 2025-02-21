import { useState } from "react";
import { useGetTaskQuery, useGetTasksQuery } from "../../api/task.api";
import { ITask } from "../../interface/ITask.interface";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ViewTaskModal from "./ViewTaskModal";

dayjs.extend(relativeTime);

const Task = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleTask = (id: number) => {
    setSelectedTasks((prev: any) =>
      prev.includes(id) ? prev.filter((t: any) => t !== id) : [...prev, id]
    );
  };

  const { data, isLoading } = useGetTasksQuery({});
  const { data:taskData, isLoading: isLoadingTaskData } = useGetTaskQuery({
    id: selectedTask as string,
  });
  

  console.log("data", taskData);

  return (
    <div className="w-full h-[40vh] px-5 rounded-md">
      <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
      <div className="">
        {data?.results?.map((task: ITask) => (
          <div
            key={task.task_id}
            className={`flex border-b border-gray-200 items-center justify-between p-3 ${
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
                <p className="font-medium cursor-pointer -mt-2" onClick={()=>{
                  setSelectedTask(task.task_id);
                  setShowModal(true);
                }}>{task.title}</p>
                <div className="flex justify-start items-center gap-3">
                  <p className="text-sm text-gray-500">{task.start_time}</p> -{" "}
                  <p className="text-sm text-gray-500">{task.end_time}</p>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {dayjs(task.created_at).fromNow()}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="flex mt-12 items-center justify-between border-t mt-4 pt-4">
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
      </div> */}

      {showModal && <ViewTaskModal taskData={taskData} onClose={()=>setShowModal(false)} isLoading={isLoadingTaskData}/>}
    </div>
  );
};

export default Task;
