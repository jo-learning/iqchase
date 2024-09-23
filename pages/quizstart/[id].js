import Header from "@/components/Header";
import StartQuiz from "@/components/startquiz";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function QuizStart(){
    const router = useRouter()
    const { id  } = router.query;
    const [startquiz, setStartQuiz] = useState(true);
    useEffect(()=>{
        const fetchdata = async() =>{
            const res = await fetch(`/api/score/getscore/${id}`);
            const data = await res.json();
            if (res.ok){
                setStartQuiz(false);
            }
            else{
                setStartQuiz(true);
            }
        }
        fetchdata();
    })
    return (
        <div className="bg-gray-200 pb-[300px]">
            <Header />
            <StartQuiz quiz = {id} startquiz = {startquiz}/>
        </div>
    );
}