import { useState } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(show);

  const handleModalClose = () => {
    setIsModalVisible(false);
    onClose();
  };

  return (
    <>
      {isModalVisible ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Modal Title</p>
                <div
                  className="cursor-pointer z-50"
                  onClick={handleModalClose}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.561 4.561a.5.5 0 0 0-.708-.708L9 8.293 4.146 3.439a.5.5 0 1 0-.708.708L8.293 9l-4.854 4.854a.5.5 0 0 0 .708.708L9 9.707l4.854 4.854a.5.5 0 0 0 .708-.708L9.707 9l4.854-4.854z"
                    />
                  </svg>
                </div>
              </div>

              <div className="mb-3">
                <p>Modal content goes here.</p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  className="modal-save px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                  onClick={handleModalClose}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : <></>}
    </>
  );
};

export default Modal;
