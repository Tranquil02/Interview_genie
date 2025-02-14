import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { dark } from "@clerk/themes";

interface LoginModalProps {
  isOpen: boolean;

  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
      <SignIn
        appearance={{
        baseTheme: dark,
        }}
        fallbackRedirectUrl="/dashboard"
      />
      </div>


      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white"
      >
        &times;
      </button>
    </div>
  );
};

export default LoginModal;
