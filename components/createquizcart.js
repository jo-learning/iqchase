import Link from 'next/link'; // Import Link to navigate between pages

export default function CreateQuizCard() {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Create a New Quiz</h2>
        <p className="text-gray-600 mb-4">Choose a quiz type to get started</p>

        {/* Buttons for single and multiple choice quiz creation */}
        <div className="grid grid-cols-1 gap-4">
          <Link href="/create" className='mb-3'>
            <span className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-all">
              Create Single Choice Quiz
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
