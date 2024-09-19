import { getQuiz } from "../../../../controller/quizController";
export default async function handler (req, res){
    await getQuiz(req, res);
}