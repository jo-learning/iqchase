// components/Quiz.js
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { getSession } from "next-auth/react";
import Link from "next/link";

const fakeQuizDatas = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { id: "a", option_text: "Berlin", is_correct: "false" },
      { id: "b", option_text: "Madrid", is_correct: "false" },
      { id: "c", option_text: "Paris", is_correct: "true" },
      { id: "d", option_text: "Lisbon", is_correct: "false" },
    ],
    answer: "c",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: "a", option_text: "Earth", is_correct: "false" },
      { id: "b", option_text: "Mars", is_correct: "true" },
      { id: "c", option_text: "Jupiter", is_correct: "false" },
      { id: "d", option_text: "Venus", is_correct: "false" },
    ],
    answer: "b",
  },
  {
    id: 3,
    question: "Who wrote 'Pride and Prejudice'?",
    options: [
      { id: "a", option_text: "Jane Austen", is_correct: "true" },
      { id: "b", option_text: "Charles Dickens", is_correct: "false" },
      { id: "c", option_text: "William Shakespeare", is_correct: "false" },
      { id: "d", option_text: "Mark Twain", is_correct: "false" },
    ],
    answer: "a",
  },
];

const UpdatedQuiz = ({ id }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fakeQuizData, setfakeQuizData] = useState(fakeQuizDatas);
  const [onetime, setonetime] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(120); // Timer set to 30 seconds per question
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [scorelist, setScoreList] = useState([]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setScoreList((prev) => [...prev, optionId]);
  };

  const handleNextQuestion = async () => {
    // if (selectedOption === fakeQuizData[currentQuestion].answer) {
    //   setScore(score + 1);
    // }
    for (let i = 0; i < fakeQuizData[currentQuestion].options.length; i++) {
      if (selectedOption == fakeQuizData[currentQuestion].options[i].id) {
        if (fakeQuizData[currentQuestion].options[i].is_correct == "true") {
          setScore(score + 1);
          break;
        } else {
          break;
        }
      }
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

      if (timer !== 0) {
        const session = await getSession();

        if (!session) {
          setError("You must be logged in to perform this action.");
          return;
        }

        const res = await fetch("/api/score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score, id }),
        });
        const data = await res.json();
        if (res.ok) {
          console.log(data);
        } else {
          console.log(data);
        }
      }
      setQuizCompleted(true);
      console.log(scorelist);
    }
  };

  // Countdown timer logic
  useEffect(() => {
    console.log(id);
    const fetchdata = async () => {
      const res11 = await fetch(`/api/quiz/getquiz/${id}`);
      const data11 = await res11.json();
      if (res11.ok) {
        const question = data11.Quizzes;
        const options = data11.QuizOptions;
        let fullquiz = [];
        for (let i = 0; i < question.length; i++) {
          // fullquiz[i].id = question[i].id
          fullquiz = [
            ...fullquiz,
            {
              id: question[i].id,
              question: question[i].question,
              options: options[i],
            },
          ];
          // fullquiz[i].question = question[i].question
        }
        setfakeQuizData(fullquiz);
      }
    };

    if (onetime) {
      fetchdata();
      console.log("it is working");
      setonetime(false);
    }
    if (timer === 0) {
      setQuizCompleted(true);
    } else if (quizCompleted == true) {
      console.log(true);
    } else {
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
            {timer == 0 ? (
              <div className="text-center">
                {isAllCorrect && <Confetti />}
                <h2 className="text-2xl font-bold">
                  Quiz InCompleted! Time is Up
                </h2>
                <p className="mt-4 text-lg">
                  Your Score: {score}/{fakeQuizData.length}
                </p>
                {isAllCorrect && (
                  <p className="text-green-500 font-bold mt-4">
                    Congratulations! You got all the questions right!
                  </p>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Restart Quiz
                </button>
              </div>
            ) : (
              <div className="text-center">
                {isAllCorrect && <Confetti />}
                <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                <p className="mt-4 text-lg">
                  Your Score: {score}/{fakeQuizData.length}
                </p>
                {isAllCorrect && (
                  <p className="text-green-500 font-bold mt-4">
                    Congratulations! You got all the questions right!
                  </p>
                )}
                <Link href={`/ranking/${id}`}>
                <button
                  // onClick={() => {}}
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Rank
                </button>
                </Link>
              </div>
            )}
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
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {option.option_text}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <p className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {fakeQuizData.length}
              </p>
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

export default UpdatedQuiz;
