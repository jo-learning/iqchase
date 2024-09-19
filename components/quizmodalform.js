// components/QuizFormModal.js
import { useState } from 'react';
import { FiX } from 'react-icons/fi';

const QuizFormModal = ({ isOpen, onClose, onAddQuiz }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (answer) => {
    setCorrectAnswer(answer);
    const updatedOptions = options.map(option => ({
      ...option,
      isCorrect: option.text === answer, // Mark the correct option based on the answer
    }));
    setOptions(updatedOptions);
  };

  const handleAddQuiz = () => {
    if (!question || options.some(option => !option.text) || !correctAnswer) {
      alert("Please fill out all fields and select the correct answer.");
      return;
    }

    const newQuiz = {
      question,
      options,
      correctAnswer,
    };
    

    onAddQuiz(newQuiz);
    onClose();  // Close the modal after adding
    setQuestion('');
    setOptions([{ text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }, { text: '', isCorrect: false }]);
    setCorrectAnswer('');
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Quiz</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        {/* Quiz Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              placeholder="Enter your question"
            />
          </div>

          {/* Options */}
          {options.map((option, index) => (
            <div key={index}>
              <label className="block text-gray-700 font-medium">Option {index + 1}</label>
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                placeholder={`Option ${index + 1}`}
              />
            </div>
          ))}

          {/* Correct Answer */}
          <div>
            <label className="block text-gray-700 font-medium">Correct Answer</label>
            <select
              value={correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
            >
              <option value="">Select the correct answer</option>
              {options.map((option, index) => (
                <option key={index} value={option.text}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleAddQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Quiz
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default QuizFormModal;
