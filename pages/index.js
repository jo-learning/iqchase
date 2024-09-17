import Link from "next/link";
import { quizzes } from "../data/quizzes";

import Head from "next/head";
import Header from "../components/Header";
import CreateQuizCard from "@/components/createquizcart";
import QuizCardList from "@/components/quizcardlist";

export default function Home() {
  return (
    // <div className="max-w-2xl mx-auto p-4">
    //   <h1 className="text-3xl font-bold mb-6">Quizzes</h1>

    //   <ul className="space-y-4">
    //     {quizzes.map((quiz) => (
    //       <li key={quiz.id} className="border p-4 rounded">
    //         <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
    //         <p className="mb-2">{quiz.description}</p>
    //         <Link href={`/quiz/${quiz.id}`}>
    //           <span className="text-blue-500">Take Quiz</span>
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="bg-gray-400">
      <Head>
        <title>IQCHASE</title>
        <meta name="description" content="Join a quiz game with a game PIN" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
          <CreateQuizCard />
          <QuizCardList />
        {/* You can add more content for the page here */}
      </main>
    </div>
  );
}
