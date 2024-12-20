import React from "react";
import { IoMdClose } from "react-icons/io";
import { Plus } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 flex text-white items-center justify-center z-20">
            <div className="bg-white px-4 py-2 w-1/2">
              <div className="flex flex-row justify-between mt-5">
                <h1 className="text-black text-xl">ADD A REPOSITORY</h1>
                <button className="text-black" onClick={() => onClose()}>
                  <IoMdClose className="h-8 w-8" />
                </button>
              </div>
              <div className="flex my-5 space-x-2 space-y-4">
                <input
                  className="bg-transparent border-2 border-black w-full p-2 rounded-md mt-4"
                  placeholder="enter the repository link "
                  type="url"
                />
                <button
                  onClick={() => onClose()}
                  className="flex-1 flex gap-2 w-40 items-center px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <Plus></Plus>
                  Add
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
