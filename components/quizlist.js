// components/QuizList.js
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

const QuizList = ({ quizzes, onDeleteQuiz }) => {
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (quizIndex) => {
    setQuizToDelete(quizIndex);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (quizToDelete !== null) {
      onDeleteQuiz(quizToDelete);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Quiz List</h2>
      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes added yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz, index) => (
            <li key={index} className="p-4 bg-white shadow-lg rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{quiz.question}</h3>
                <ul className="ml-4 list-disc text-gray-600">
                  {quiz.options.map((option, idx) => (
                    <li key={idx} className={option.isCorrect ? 'font-bold text-green-500' : ''}>
                      {option.text}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-gray-600">Correct Answer: <span className="font-bold">{quiz.correctAnswer}</span></p>
              </div>
              <button
                onClick={() => handleDeleteClick(index)}
                className="text-red-500 hover:text-red-600"
              >
                <FiTrash2 size={24} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <p className="text-gray-800">Are you sure you want to delete this quiz?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizList;

