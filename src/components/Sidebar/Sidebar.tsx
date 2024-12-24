import React from "react";
import logo from "../../assets/Subtract1.png";
import {
  Home,
  CloudLightning,
  FileText,
  Settings,
  LogOut,
  PhoneCall,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { logoutUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = async () => {
    try {
      await logoutUser(dispatch);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleRedirect = (url: string) => {
    window.open(url, "_blank");
  };
  const users = [{ username: "naksh1414" }];
  console.log("User:", user);
  return (
    <div className="hidden md:flex md:flex-col h-full w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <img src={logo} alt="CodeAnt AI Logo" className="w-8 h-8" />
        <span className="text-xl font-semibold">CodeAnt AI</span>
      </div>

      {loading ? (
        <div className="w-8 h-8 my-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        <div className="flex space-x-3 my-5">
          <img
            src={user?.photoURL || ""}
            alt="name"
            className="h-8 w-8 rounded-full border-2 border-gray-800"
          />
          <h1 className="text-lg">Welocme {user?.displayName}</h1>
        </div>
      )}

      <div className="relative mb-4">
        <select className="w-full text-left px-4 border-black py-2 text-gray-700 bg-gray-100 border-2  rounded-md">
          <option value="">
            {users.map((user, index) => (
              <React.Fragment key={index}>{user.username}</React.Fragment>
            ))}
          </option>
        </select>
      </div>

      <nav className="space-y-1">
        <button className="w-full flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-md">
          <Home className="w-5 h-5" />
          Repositories
        </button>
        <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
          <FileText className="w-5 h-5" />
          AI Code Review
        </button>
        <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
          <CloudLightning className="w-5 h-5" />
          Cloud Security
        </button>
        <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
          <FileText className="w-5 h-5" />
          How to Use
        </button>
        <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </nav>

      <div className="absolute bottom-4 space-y-1">
        <button
          onClick={() => handleRedirect("https://www.codeant.ai")}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
        >
          <PhoneCall className="w-5 h-5" />
          Support
        </button>
        <button
          onClick={() => handleLogOut()}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
