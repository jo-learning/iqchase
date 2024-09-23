import Link from "next/link";
import { quizzes } from "../data/quizzes";
import { useSession } from "next-auth/react";

import Head from "next/head";
import Header from "../components/Header";
import CreateQuizCard from "@/components/createquizcart";
import QuizCardList from "@/components/quizcardlist";

export default function Home() {
  const {data: session, status } = useSession();
  console.log(session);
  return (
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
