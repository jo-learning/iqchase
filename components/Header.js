import { useState } from "react";
import CreateQuizCard from "./createquizcart";
import QuizCardList from "./quizcardlist";
import LoginModal from "./loginmodal";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const {data: session, status} = useSession();
    const [gamepin, setGamePin] = useState('')
    const router = useRouter();

    const navigateToGame = (gamePin) => {
      // Navigate to the 'game' page with the gamePin as a query parameter
      console.log(gamePin);
      router.push({
        pathname: '/wordgame/testgame',
      });
    };

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    return (
        <div>
      <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 shadow-lg flex justify-between items-center">
        <div className="flex items-center">
          <Link href={'/'}><h1 className="text-3xl font-bold">IQCHASE</h1></Link>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="game-pin" className="text-lg font-medium">
            Join a Quiz
          </label>
          {/* <input
            type="text"
            id="game-pin"
            placeholder="Enter Game PIN"
            onClick={(e) => setGamePin(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
          <button onClick={()=> navigateToGame(gamepin)} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all">
            Join
          </button>
        </div>
        {/* Add login button or avatar */}
        {session ? (
          <div className="flex items-center space-x-3">
            <button
            onClick={() => setIsLoggedIn(false)} // Example login action
            className="bg-white text-purple-500 px-6 py-2 rounded-lg hover:bg-gray-200 transition-all"
          >
            <Link href={'/ranking'}>
            Rank list
            </Link>
            
          </button>
            <img
              src={session.user.image} // Replace with the user's actual avatar source
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="text-lg">{session.user.name}</span>
            <a onClick={() => {signOut()}}>logout</a>
          </div>
        ) : (
          <button
            onClick={async() => {
              setIsLoginModalOpen(true)
              
              // signIn("google")
               
              //  sleep(120)
              setIsLoggedIn(true)
            }
            } // Example login action
            className="bg-white text-purple-500 px-6 py-2 rounded-lg hover:bg-gray-200 transition-all"
          >
            Login
          </button>
        )}
      </header>
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      </div>
    );
  }
  