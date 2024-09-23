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
// const {quiz} = sequelize.import('../models/quiz')
export const addQuiz = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Only POST is Accepted" });
  }
  const { name, time, description } = req.body.formData;
  // console.log(req.body.formData)
  // console.log(req.body.options)
  const options = req.body.options;
  const image = req.body.imageUrl;
  // console.log("it is fine !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

  if (!name || !time || !image || !description || !options) {
    return res.status(400).json({ message: "Fill All Requirments" });
  }
  // console.log(options[0].options);
  try {
    const newQuizName = await quizname.create({
      name: name,
      time: time,
      image: image,
    });

    let i = 0;
    let quizOption = [];
    let quizz = [];
    
    while (i < options.length) {
      const newQuiz = await quiz.create({
        question: options[i].question,
        quizname_id: newQuizName.id,
      });
      for (let j = 0; j < options[i].options.length; j++){
        const newQuizOption = await quizoption.create({
          quiz_id: newQuiz.id,
          option_text: options[i].options[j].text,
          is_correct: options[i].options[j].isCorrect,
        });
        quizOption[i] = newQuizOption;
      }
      
      quizz[i] = newQuiz;
      i++;
    }
    const updateQuizName = await quizname.update(
      { success: true },
      { where: { id: newQuizName.id } }
    );
    return res.status(201).json({
      message: "Quiz created successfully!",
      quiz: quizz,
      quizOption: quizOption,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return res.status(500).json({
      message: "Something went wrong while creating the quiz.",
    });
  }
};

export const getQuiz = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Only GET is Accepted" });
  }
  try{
    const QuzName = await quizname.findAll({ where: { success: true } });
    res.status(200).json({ message: "all quiz", data: QuzName });
  }catch(error){
    console.error("Error creating quiz:", error);
    return res.status(500).json({
      message: "Something went wrong while getting the quiz.",
    });
  }
  
};

export const getQuizById = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Only GET is Accepted" });
  }
  const { id } = req.query;
  const intid = parseInt(id);
  // const intid = parseInt(id)
  try {
    const Quizzes = await quiz.findAll({ where: { quizname_id: intid } });

    let QuizOptions = [];
    for (let i = 0; i < Quizzes.length; i++) {
      const intid1 = parseInt(Quizzes[i].id);
      const QuizzesOption = await quizoption.findAll({
        where: { quiz_id: intid1 },
      });
      QuizOptions[i] = QuizzesOption;
    }

    return res
      .status(200)
      .json({ message: "single Quiz", Quizzes, QuizOptions });
  } catch(error) {
    console.error("Error creating quiz:", error);
    return res.status(500).json({
      message: "Something went wrong while getting the quiz.",
    });
  }
};
export default { addQuiz, getQuiz, getQuizById };
