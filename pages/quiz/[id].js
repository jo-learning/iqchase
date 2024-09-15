// pages/quiz/[id].js
import { quizzes } from '../../data/quizzes';
import Quiz from '../../components/Quiz';
import { useRouter } from 'next/router';

const QuizPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const quiz = quizzes.find((quiz) => quiz.id === parseInt(id));

  if (!quiz) {
    return <p>Quiz not found.</p>;
  }

  return <Quiz quiz={quiz} />;
};

export default QuizPage;
