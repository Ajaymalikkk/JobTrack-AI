import {
    FaHome,
    FaBriefcase,
    FaPlusCircle,
    FaRobot,
    FaSignOutAlt,
  } from "react-icons/fa";
  
  import { Link, useNavigate } from "react-router-dom";
  
  function Sidebar() {
    const navigate = useNavigate();
  
    const logoutHandler = () => {
      localStorage.removeItem("token");
      navigate("/");
    };
  
    return (
      <div className="w-72 h-screen bg-slate-950 text-white border-r border-slate-800 p-6">
        <h1 className="text-3xl font-bold mb-10">
          JobTrack AI
        </h1>
  
        <div className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <FaHome />
            Dashboard
          </Link>
  
          <Link
            to="/jobs"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <FaBriefcase />
            Jobs
          </Link>
  
          <Link
            to="/jobs/add"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <FaPlusCircle />
            Add Job
          </Link>
  
          <Link
            to="/ai-insights"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition"
          >
            <FaRobot />
            AI Insights
          </Link>
  
          <button
            onClick={logoutHandler}
            className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    );
  }
  
  export default Sidebar;