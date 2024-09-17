import Header from "@/components/Header";
import StartQuiz from "@/components/startquiz";
import { useRouter } from "next/router";

export default function QuizStart(){
    const router = useRouter()
    const { id  } = router.query
    return (
        <div>
            <Header />
            <StartQuiz quiz = {id}/>
        </div>
    );
}