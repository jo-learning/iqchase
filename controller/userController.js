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
// const {quiz} = sequelize.import('../models/quiz')
export const creatUser = async (users, provider) => {
    // if (req.method !== "POST") {
    //   return res.status(400).json({ message: "Only POST is Accepted" });
    // }
    const { name, email, image } = users;
    // console.log(req.body.formData)
    // console.log(req.body.options)
    // const options = req.body.options;
    // console.log("it is fine !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    if (!name || !email || !image ) {
      return { message: "Fill All Requirments" };
    }
    console.log(name, email)
    
    try {
      const User = await user.findOne({where: {email, provider}});
      if (User){
        return { message: "allready registed" }
      }
      const newUser = await user.create({
        name,
        email,
        provider
      });
  
      return {
        message: "User created successfully!",
        User: newUser
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      return {
        message: "Something went wrong while creating the quiz.",
      };
    }
  };


  // pages/api/secure-data.js
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export const CheckUser =  async (req, res) => {
  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If the token is valid, return some secure data
  res.status(200).json({ message: "This is secure data", userId: token.id });
};

  export default { creatUser, CheckUser};
