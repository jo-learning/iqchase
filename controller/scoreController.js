const Sequelize = require("sequelize");
const { sequelize } = require("@/models");
const quiz = require("../models/quiz")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);
const quizname = require("../models/quizname")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);
const quizoption = require("../models/quizoption")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);
const user = require("../models/user")(
    sequelize,
    Sequelize.DataTypes,
    Sequelize.Model
  );
const userScore = require("../models/userquizscore")(
    sequelize,
    Sequelize.DataTypes,
    Sequelize.Model
  );
 import { getServerSession } from "next-auth";
 import { authOptions } from "@/pages/api/auth/[...nextauth]";


// const {quiz} = sequelize.import('../models/quiz')
export const addScore = async (req, res) => {
  if(req.method !== "POST"){
    return res.status(400).json({ message: "Only POST is Accepted" });
  }
    const {score , id} = req.body;
    console.log(score, id);
    if (!score || !id){
      return res.status(400).json({ message: "Fill All Requirments" });
    }
    const session = await getServerSession(req, res, authOptions );

    if (!session) {
      // If no session, return 401 Unauthorized
      return res.status(401).json({ error: "Unauthorized" });
    }
    try{
      const User = await user.findOne({where: {name: session.user.name, email: session.user.email}})
      const checkuser = await userScore.findOne({where: {user_id: User.id, quiz_id: id}})
      if (checkuser){
        return res.status(200).json({message: "your result is allready added"})
      }
      const newScore = await userScore.create({
        user_id: User.id,
        quiz_id: id,
        score,
        name: User.name
      })
      return res.status(200).json({message: "Score created successfully", score: newScore})
    }catch(error){
      return res.status(500).json({message: "server error 2"})
    }
    
  };

export const checkScore = async (req, res)=>{
  if(req.method !== "GET"){
    return res.status(400).json({ message: "Only GET is Accepted" });
  }
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions );

    if (!session) {
      // If no session, return 401 Unauthorized
      return res.status(401).json({ error: "Unauthorized" });
    }
  try{
  const User = await user.findOne({where: {name: session.user.name, email: session.user.email}})
  const CheckScore = await userScore.findOne({where: {user_id: User.id, quiz_id: id}})
  if (CheckScore){
    const AllScore = await userScore.findAll({where: {quiz_id:id}, order: [['score', 'ASC']]})
    return res.status(200).json({message: "score exist", score: AllScore})
  }
  else{
    return res.status(400).json({message: "score Doesn't exist"})
  }}catch(error){
    return res.status(500).json({message: "server error"})
  }
}


  export default { addScore, checkScore };
