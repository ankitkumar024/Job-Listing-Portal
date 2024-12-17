import React from 'react';

const Popup = ({ onClose, children }) => {
  return (
    <div className="fixed flex items-center  inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto w-[100%] h-auto md:mx-0 md:mt-0">
      <div className="  rounded-lg p-2 w-[100%]">
        <button onClick={onClose} className="text-red-500 absolute top-[1rem] right-4 md:right-[20%] lg:right-[33%]">X</button>
        {children} {/* This will render the signup form */}
      </div>
    </div>
  );
};

export default Popup;