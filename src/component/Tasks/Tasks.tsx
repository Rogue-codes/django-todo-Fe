import { useState, useEffect } from "react";
import {
  useGetTaskQuery,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "../../api/task.api";
import { ITask } from "../../interface/ITask.interface";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ViewTaskModal from "./ViewTaskModal";
import { enqueueSnackbar } from "notistack";

dayjs.extend(relativeTime);

const Task = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, isLoading } = useGetTasksQuery({});
  const { data: taskData, isLoading: isLoadingTaskData } = useGetTaskQuery({
    id: selectedTask as string,
  });

  const [
    updateTaskStatus_,
    { isLoading: isUpdatingTaskStatus, isSuccess, data: data__ },
  ] = useUpdateTaskStatusMutation();

  const updateTaskStatus = (id: string) => {
    updateTaskStatus_({
      status: "completed",
      id,
    })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        enqueueSnackbar(e?.data?.error, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(data__.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }, [isSuccess]);

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
              disabled={task.status === "completed" || task.status === "not_started"}
                type="checkbox"
                className="h-5 w-5 accent-blue-600"
                checked={task.status === "completed"}
                onChange={() => updateTaskStatus(task.task_id)}
              />
              <div>
                <p
                  className="font-medium cursor-pointer -mt-2"
                  onClick={() => {
                    setSelectedTask(task.task_id);
                    setShowModal(true);
                  }}
                >
                  {task.title}
                </p>
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

      {showModal && (
        <ViewTaskModal
          taskData={taskData}
          onClose={() => setShowModal(false)}
          isLoading={isLoadingTaskData}
        />
      )}
    </div>
  );
};

export default Task;
