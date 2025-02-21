import { motion } from "framer-motion";
import { LiaTimesSolid } from "react-icons/lia"; // Close icon

const ViewTaskModal = ({
  taskData,
  onClose,
  isLoading,
}: {
  taskData: any;
  onClose: any;
  isLoading: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Fade-in effect
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-[#3333332c] bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-[99999]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-[40%] max-w-[500px] bg-white shadow-lg border border-gray-200 rounded-2xl p-6"
      >
        {/* Close Button */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Task Details
              </h2>
              <LiaTimesSolid
                size={24}
                className="cursor-pointer text-gray-500 hover:text-red-500 transition-all"
                onClick={onClose}
              />
            </div>

            {/* Task Title */}
            <h3 className="text-lg font-bold text-blue-600">
              {taskData?.title}
            </h3>

            {/* Task Description */}
            <p className="text-gray-600 mt-2">{taskData?.description}</p>

            {/* Task Dates */}
            <div className="mt-4 space-y-2 text-gray-500">
              <p>
                <span className="font-semibold text-gray-700">Start Date:</span>{" "}
                {taskData?.start_date}
              </p>
              <p>
                <span className="font-semibold text-gray-700">End Date:</span>{" "}
                {taskData?.end_date}
              </p>
            </div>

            <div className="w-full flex justify-between items-center gap-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="mt-6 w-full border hover:text-white hover:scale-105 cursor-pointer text-red-500 border-red-500 font-medium py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                close
              </button>

              <button
                onClick={onClose}
                className="mt-6 w-full bg-blue-500 text-white font-medium py-2 cursor-pointer rounded-lg hover:scale-105 transition-all"
              >
                mark as complete
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ViewTaskModal;
