import { addScore } from "../../../controller/scoreController";
export default async function handler (req, res){
    
   
    return await addScore(req, res);
    // catch(error){
    //     return res.status(500).json({ message: "server error", error: error });
    // }
}