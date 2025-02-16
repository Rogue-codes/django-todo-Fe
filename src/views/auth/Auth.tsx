import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth() {
  const [activeTab, setActiveTab] = useState(0);
  const Tab = () => {
    return (
      <div className="flex justify-center items-center gap-6 my-5">
        {["Sign In", "Sign Up"].map((item, index) => (
          <div
            className={`${
              activeTab === index
                ? "bg-blue-500 text-white shadow-md border-2"
                : "border border-gray-500"
            } text-sm cursor-pointer px-4 py-1 rounded-xl`}
            onClick={() => setActiveTab(index)}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="bg-blue-500 w-full min-h-screen flex justify-center items-center py-12 lg:py-0">
      <div className="w-[80%] lg:w-[30vw] p-5 pb-12 bg-white shadow-md rounded-lg">
        <p className="text-lg font-black text-center">Welcome to Todist</p>
        <p className="text-sm text-center">
          Number one Task management platform
        </p>
        {Tab()}

        <>{activeTab === 0 ? <LoginForm /> : <RegisterForm setActiveTab={setActiveTab} />}</>
      </div>
    </div>
  );
}
