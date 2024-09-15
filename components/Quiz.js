// components/Quiz.js
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Quiz = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleNext = (data) => {
    const selectedAnswer = data.answer;
    const currentQuestion = quiz.questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      reset(); // Reset the form for the next question
    } else {
      setShowScore(true); // Quiz is finished
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-6">{quiz.description}</p>

      {!showScore ? (
        <form onSubmit={handleSubmit(handleNext)} className="space-y-4">
          <div>
            <p className="text-lg font-semibold mb-2">
              {currentQuestionIndex + 1}. {quiz.questions[currentQuestionIndex].question}
            </p>

            {quiz.questions[currentQuestionIndex].options.map((option, index) => (
              <label key={index} className="block">
                <input
                  type="radio"
                  value={option}
                  {...register('answer')}
                  className="mr-2"
                  required
                />
                {option}
              </label>
            ))}
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="mt-4">
            Your Score: {score} / {quiz.questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
