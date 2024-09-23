import { checkScore } from "../../../../controller/scoreController";
export default async function handler (req, res){
    return await checkScore(req, res);
}