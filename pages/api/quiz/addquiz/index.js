import { addQuiz } from "../../../../controller/quizController";
export default async function handler (req, res){
    await addQuiz(req, res);
}