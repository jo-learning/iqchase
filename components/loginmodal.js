// components/LoginModal.js
import { signIn } from "next-auth/react";
import { FiX } from "react-icons/fi";

const LoginModal = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Login</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github")}
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 flex justify-center items-center"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* GitHub Icon */}
              <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1 2-.7 2.5-1.2a2.7 2.7 0 0 1 .8-1.8c-2.7-.3-5.6-1.3-5.6-5.7a4.6 4.6 0 0 1 1.2-3.2 4.3 4.3 0 0 1 .1-3.1s1-.3 3.3 1.3a11.3 11.3 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3.3.9.4 1.9.1 2.9a4.7 4.7 0 0 1 1.2 3.2c0 4.5-2.9 5.5-5.6 5.8.5.4 1 1.4 1 2.9v4.4c0 .3.2.7.8.6A12 12 0 0 0 12 0z" />
            </svg>
            Login with GitHub
          </button>

          <button
            onClick={() => signIn("google")}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex justify-center items-center"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* Google Icon */}
              <path d="M21.6 12.2c0-.8-.1-1.4-.2-2.1h-9.4v4h5.5c-.3 1.4-1 2.6-2.1 3.5v2.9h3.4c2-1.9 3-4.7 3-8.3z" />
              <path d="M12 22c2.7 0 5-1 6.6-2.7l-3.4-2.9c-1 1-2.3 1.6-3.8 1.6-2.9 0-5.4-2-6.3-4.7H1v2.9A10 10 0 0 0 12 22z" />
              <path d="M5.7 13.3a6 6 0 0 1 0-3.8V6.5H1A10 10 0 0 0 12 22c2.7 0 5-1 6.6-2.7l-3.4-2.9c-1 1-2.3 1.6-3.8 1.6-2.9 0-5.4-2-6.3-4.7H1v2.9A10 10 0 0 0 12 22z" />
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginModal;
