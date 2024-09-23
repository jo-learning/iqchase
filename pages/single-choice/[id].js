import Header from "@/components/Header";
import Quiz from "@/components/Quiz";
import UpdatedQuiz from "@/components/UpdatedQuiz";
// import StartQuiz from "@/components/startquiz";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function QuizStart(){
    const router = useRouter()
    const { id  } = router.query;
    const {data: session, status} = useSession();
    useEffect(()=>{
        const checkuser = async() =>{
            if(status == 'unauthenticated'){
                await signIn()
            }
        }
        checkuser();
    },[status, router])
    return (
        <div>
            <Header />
            <UpdatedQuiz id = {id} />
        </div>
    );
}