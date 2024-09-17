import { useState } from "react";
import CreateQuizCard from "./createquizcart";
import QuizCardList from "./quizcardlist";
export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    return (
        <div>
      <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 shadow-lg flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">IQCHASE</h1>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="game-pin" className="text-lg font-medium">
            Join a Quiz
          </label>
          <input
            type="text"
            id="game-pin"
            placeholder="Enter Game PIN"
            className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all">
            Join
          </button>
        </div>
        {/* Add login button or avatar */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-3">
            <img
              src="/avatar.jpg" // Replace with the user's actual avatar source
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="text-lg">John Doe</span>
          </div>
        ) : (
          <button
            onClick={() => setIsLoggedIn(true)} // Example login action
            className="bg-white text-purple-500 px-6 py-2 rounded-lg hover:bg-gray-200 transition-all"
          >
            Login
          </button>
        )}
      </header>
      </div>
    );
  }
  