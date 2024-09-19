// pages/index.js
import { useState } from 'react';
import QuizFormModal from '../../components/quizmodalform';
import QuizList from '../../components/quizlist';
import Header from '@/components/Header';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    time: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        // image: file,
        image: "/images/images.jpeg"
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add form submission logic here (API call or form processing)
    const res = await fetch('/api/quiz/addquiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({formData, options: quizzes})
    })
    const data = await res.json()
    if(res.ok){
      console.log("we did it we made it")
    }
    else{
      console.log("I am sorry", data)
    }
    console.log('Form Data Submitted:', formData, quizzes);
  };

  const handleAddQuiz = (newQuiz) => {
    setQuizzes([...quizzes, newQuiz]);
  };


  // Function to handle deleting a quiz
  const handleDeleteQuiz = (quizIndex) => {
    const updatedQuizzes = quizzes.filter((_, index) => index !== quizIndex);
    setQuizzes(updatedQuizzes);
  };


  return (
    <div className=' bg-gray-100 '>
        <Header />
<div className="min-h-screen bg-gray-100 flex items-center  p-4 text-black">
    <div className='flex-col'>
    <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Submit Your Info
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Describe your submission"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Rate Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Time</label>
          <input
            type="number"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter a rate from 1 to 10"
            min="1"
            max="10"
            required
          />
        </div>

        {/* Image Upload Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            required
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        
      </form>
    </div>

    <div className='flex-col justify-center items-center ml-11'>

    <h1 className="text-4xl font-bold mb-6">Quiz Creator</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
      >
        Add New Quiz
      </button>

      {/* Quiz List */}
      <QuizList quizzes={quizzes} onDeleteQuiz={handleDeleteQuiz} />

      {/* Quiz Form Modal */}
      <QuizFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddQuiz={handleAddQuiz}
      />

    </div>
    
      
    </div>
    {/* Submit Button */}
    <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
    </div>
    
  );
}
