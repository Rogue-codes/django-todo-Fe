import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { LuAlarmClock } from "react-icons/lu";
import DateSelect from "../Datepicker/Datepicker";
import { formatDate, getFutureDate } from "../../utils/date";
import { enqueueSnackbar } from "notistack";
import { useCreateTaskMutation } from "../../api/task.api";
import { motion } from "framer-motion";

interface ICreateTaskModal {
  setShowCreatetaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ITaskObj {
  title: string;
  description: string;
  start_date: Date | null;
  end_date: Date | null;
  start_time: string;
  end_time: string;
}

export default function CreateTask({
  setShowCreatetaskModal,
}: ICreateTaskModal) {
  const [taskObj, setTaskObj] = useState<ITaskObj>({
    title: "",
    description: "",
    start_date: null,
    end_date: null,
    start_time: "",
    end_time: "",
  });

  const [create, { isLoading, isSuccess, data }] = useCreateTaskMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create({
      ...taskObj,
      start_date: formatDate(taskObj.start_date),
      end_date: formatDate(taskObj.end_date),
    })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        enqueueSnackbar(e?.data?.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });

    setTaskObj({
      title: "",
      description: "",
      start_date: null,
      end_date: null,
      start_time: "",
      end_time: "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      enqueueSnackbar(data.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setShowCreatetaskModal(false);
    }
  }, [isSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-[20rem] z-50 bg-white rounded-lg shadow p-5 border-gray-100 absolute right-0 top-0 border"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex justify-between items-center">
          <p>Add Task</p>
          <LiaTimesSolid
            size={20}
            className="cursor-pointer"
            onClick={() => setShowCreatetaskModal(false)}
          />
        </div>

        <div className="w-[90%] mx-auto mt-3 ">
          <input
            value={taskObj.title}
            onChange={(e) => setTaskObj({ ...taskObj, title: e.target.value })}
            placeholder="task title"
            className="w-full h-[30px] mb-3 p-5  focus:outline-none rounded-lg bg-gray-100"
            type="text"
          />
          <textarea
            value={taskObj.description}
            onChange={(e) =>
              setTaskObj({ ...taskObj, description: e.target.value })
            }
            cols={30}
            rows={6}
            className="w-full h-full p-5 focus:outline-none rounded-lg bg-gray-100"
            placeholder="Task description..."
          />
        </div>

        <div className="flex my-5 gap-6 justify-between items-center">
          <div className="w-36 h-10 border flex text-md shadow border-gray-100 hover:scale-105 transition-all justify-center items-center rounded-lg cursor-pointer">
            <DateSelect
              className="border bg-white border-transparent hover:border-[#B0BACA] items-center shadow-[0px_0px_12px_rgba(16,39,81,0.17)]  rounded-lg text-lg h-full p-3"
              placeholderText="Start date"
              selected={taskObj.start_date}
              onChange={(date_: any) =>
                setTaskObj({ ...taskObj, start_date: date_ })
              }
              minDate={getFutureDate(0)}
            />
          </div>
          <div className="w-36 h-10 border flex text-md shadow border-gray-100 hover:scale-105 transition-all justify-center items-center rounded-lg cursor-pointer">
            <DateSelect
              className="border bg-white border-transparent hover:border-[#B0BACA] items-center shadow-[0px_0px_12px_rgba(16,39,81,0.17)]  rounded-lg text-lg h-full p-3"
              placeholderText="End date"
              selected={taskObj.end_date}
              onChange={(date_: any) =>
                setTaskObj({ ...taskObj, end_date: date_ })
              }
              minDate={taskObj.start_date || getFutureDate(0)}
            />
          </div>
        </div>

        <div className="flex gap-6 justify-between items-center">
          <div className="w-36 h-10 border gap-2 flex text-md shadow border-gray-100 hover:scale-105 transition-all justify-center items-center rounded-lg">
            <LuAlarmClock size={20} />
            <input
              type="time"
              className="bg-transparent outline-none"
              value={taskObj.start_time}
              onChange={(e) =>
                setTaskObj({ ...taskObj, start_time: e.target.value })
              }
            />
          </div>
          <div className="w-36 h-10 border gap-2 flex text-md shadow border-gray-100 hover:scale-105 transition-all justify-center items-center rounded-lg">
            <LuAlarmClock size={20} />
            <input
              type="time"
              className="bg-transparent outline-none"
              value={taskObj.end_time}
              onChange={(e) =>
                setTaskObj({ ...taskObj, end_time: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-between my-5 items-center">
          <div className="flex justify-start items-center gap-3">
            <IoIosNotificationsOutline size={30} />
            <p className="text-md">10 minutes before</p>
          </div>
          <p className="text-gray-500 cursor-pointer">Edit...</p>
        </div>

        <div className="flex justify-between items-center">
          <button
            className="w-34 cursor-pointer hover:scale-105 transition-all py-1 rounded-lg border-gray-500 border"
            onClick={() => {
              setShowCreatetaskModal(false);
              setTaskObj({
                title: "",
                description: "",
                start_date: null,
                end_date: null,
                start_time: "",
                end_time: "",
              });
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-34 cursor-pointer hover:scale-105 transition-all py-1 bg-blue-500 text-white rounded-lg border"
          >
            {isLoading ? "Loading..." : "Add"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
