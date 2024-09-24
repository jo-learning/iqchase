import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // For sliding icons
import LoadingSpinner from './loadingspinner';


export default function QuizCardList() {
  const sliderRef = useRef(null);
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(false);

  // Function to handle sliding
  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 300;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 300;
  };
  useEffect(()=>{
    const getquiz = async() => {
      setLoading(true);
      const res11 = await fetch('/api/quiz/getquiz/22')
      const res = await fetch('/api/quiz/getquiz')
      const data = await res.json();
      const data11 = await res11.json();
      let question = 0
      if (data11.Quizzes){
      question = data11.Quizzes;}
      const options = data11.QuizOptions;
      let fullquiz = []
      for (let i=0; i < question.length; i++){
        // fullquiz[i].id = question[i].id
        fullquiz = [...fullquiz,{ id: question[i].id, question: question[i].question, options: options[i] }]
        // fullquiz[i].question = question[i].question

      }
      console.log(fullquiz)
      if(res.ok){
        setLoading(false);
        setQuizzes(data.data);
      }
      else{
        
      }
      
    }
    getquiz();
  },[]);

  if (loading) return (<div><LoadingSpinner /></div>);

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
          <Link href={`/quizstart/${quiz.id}`}>
          
            <img
              src={quiz.image}
              alt={quiz.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">{quiz.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{quiz.name}</p>
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
