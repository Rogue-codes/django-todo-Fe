import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Nav() {
  const user = useSelector((state:any)=>state.auth.user)
  console.log("user", user);

  const initials = user.first_name.charAt(0) + user.last_name.charAt(0)
  return (
    <nav className="w-full bg-white fixed top-0 shadow z-[999] left-0 px-12 h-[120px] border-gray-200 border-b flex justify-between items-center">
      <p className="text-2xl">Todoist</p>
      <div className="w-[8%] flex items-center justify-between">
      <CiSettings size={30}/>
      <IoIosNotificationsOutline size={30} />
      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-500 text-white border-2 ">
        {initials}
      </div>
      </div>
    </nav>
  )
}
