import React from "react";
import logo from "../../assets/Subtract1.png";
import { IoMdClose } from "react-icons/io";
import {
  Home,
  CloudLightning,
  FileText,
  Settings,
  LogOut,
  PhoneCall,
} from "lucide-react";
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const handleRedirect = (path: string) => {
    window.location.href = path;
  };
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-0 top-0 w-full bg-white transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="p-4 h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="CodeAnt AI Logo" className="w-8 h-8" />
              <span className="text-xl font-semibold">CodeAnt AI</span>
            </div>
            <button onClick={onClose} className="p-2">
              <IoMdClose className="h-8 w-8" />
            </button>
          </div>

          {/* Navigation Links */}
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
            <button
              onClick={() => handleRedirect("https://www.codeant.ai")}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <PhoneCall className="w-5 h-5" />
              Support
            </button>
            <button
              onClick={() => handleRedirect("/")}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};
