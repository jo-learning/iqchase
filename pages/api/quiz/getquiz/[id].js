import { getQuizById } from "../../../../controller/quizController";
export default async function handler (req, res){
    // req.query = req.query;
    await getQuizById(req, res);
}