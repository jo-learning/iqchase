// components/Quiz.js
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const fakeQuizData = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: [
      { id: 'a', text: 'Berlin' },
      { id: 'b', text: 'Madrid' },
      { id: 'c', text: 'Paris' },
      { id: 'd', text: 'Lisbon' },
    ],
    answer: 'c',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: [
      { id: 'a', text: 'Earth' },
      { id: 'b', text: 'Mars' },
      { id: 'c', text: 'Jupiter' },
      { id: 'd', text: 'Venus' },
    ],
    answer: 'b',
  },
  {
    id: 3,
    question: "Who wrote 'Pride and Prejudice'?",
    options: [
      { id: 'a', text: 'Jane Austen' },
      { id: 'b', text: 'Charles Dickens' },
      { id: 'c', text: 'William Shakespeare' },
      { id: 'd', text: 'Mark Twain' },
    ],
    answer: 'a',
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120); // Timer set to 30 seconds per question
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [scorelist, setScoreList] = useState([])

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setScoreList((prev) => [...prev, optionId])
  };

  const handleNextQuestion = () => {
    if (selectedOption === fakeQuizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < fakeQuizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      // setTimer(30); // Reset timer for the next question
    } else {
      // for(let i = 0; i < fakeQuizData.length; i++){
      //   if (scorelist[i] == fakeQuizData[i].answer){
      //     setScore(score + 1);
      //   }
      // }
      setQuizCompleted(true);
      console.log(scorelist)
    }
  };

  // Countdown timer logic
  useEffect(() => {
    if (timer === 0) {
      setQuizCompleted(true);
    }
    else if (quizCompleted == true){
      console.log(true)
    }
    else {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  // Show confetti if all answers are correct
  const isAllCorrect = score === fakeQuizData.length;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        {quizCompleted ? (
          <div>
            {
              timer == 0 ? (<div className="text-center">
                {isAllCorrect && <Confetti />}
                <h2 className="text-2xl font-bold">Quiz InCompleted! Time is Up</h2>
                <p className="mt-4 text-lg">Your Score: {score}/{fakeQuizData.length}</p>
                {isAllCorrect && (
                  <p className="text-green-500 font-bold mt-4">Congratulations! You got all the questions right!</p>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Restart Quiz
                </button>
              </div>) : (
                <div className="text-center">
                {isAllCorrect && <Confetti />}
                <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                <p className="mt-4 text-lg">Your Score: {score}/{fakeQuizData.length}</p>
                {isAllCorrect && (
                  <p className="text-green-500 font-bold mt-4">Congratulations! You got all the questions right!</p>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Restart Quiz
                </button>
              </div>
              )
            }
          </div>
          
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {fakeQuizData[currentQuestion].question}
            </h2>
            <div className="mb-4 text-lg text-gray-600">
              Time Remaining: <span className="font-bold">{timer}s</span>
            </div>
            <div className="space-y-2">
              {fakeQuizData[currentQuestion].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedOption === option.id
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {fakeQuizData.length}</p>
              {selectedOption && (
                <button
                  onClick={handleNextQuestion}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
