import Link from 'next/link';
import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // For sliding icons

const quizzes = [
  {
    id: 1122,
    name: "JavaScript Basics",
    rate: 4.5,
    image: "/images/js-quiz.jpg",
    description: "Test your knowledge of JavaScript fundamentals.",
  },
  {
    id: 112233,
    name: "CSS Mastery",
    rate: 4.8,
    image: "/images/css-quiz.jpg",
    description: "How well do you know CSS and modern layouts?",
  },
  {
    id: 123123,
    name: "React Quiz",
    rate: 4.7,
    image: "/images/react-quiz.jpg",
    description: "Challenge yourself with this advanced React quiz.",
  },
  {
    id: 2354,
    name: "Python Essentials",
    rate: 4.9,
    image: "/images/python-quiz.jpg",
    description: "Assess your Python skills with this quiz.",
  },
  // Add more quiz data here
];

export default function QuizCardList() {
  const sliderRef = useRef(null);

  // Function to handle sliding
  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 300;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 300;
  };

  return (
    <div className="relative max-w-full">
      {/* Left Slide Button */}
      <button
        onClick={slideLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full z-10 hover:bg-purple-700 focus:outline-none"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Quiz Cards */}
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll space-x-6 scrollbar-hide py-6 px-4"
      >
        {quizzes.map((quiz, index) => (
            <div
            key={index}
            className="min-w-[250px] bg-white shadow-lg rounded-lg p-4 flex-shrink-0"
          >
          <Link href={`/quizstart/${quiz.name}`}>
          
            <img
              src={quiz.image}
              alt={quiz.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{quiz.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{quiz.description}</p>
              <div className="flex items-center mt-3">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-gray-800 font-semibold">{quiz.rate}</span>
              </div>
            </div>
          
          </Link>
          </div>
        ))}
      </div>

      {/* Right Slide Button */}
      <button
        onClick={slideRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full z-10 hover:bg-purple-700 focus:outline-none"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
}
