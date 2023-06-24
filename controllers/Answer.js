import mongoose from "mongoose";
import Question from "../models/Question.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered,userId } = req.body;
    // const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
  
    updateNoOfQuestions(_id, noOfAnswers);
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(_id, {
        $addToSet: { 'answers': [{ answerBody, userAnswered, userId }] },
      });
      res.status(200).json(updatedQuestion);
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
  const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
      await Question.findByIdAndUpdate(_id, {
        $set: { 'noofanswer': noOfAnswers },
      });
    } catch (error) {
      console.log(error);
    }
  };


 export const deleteAnswer = async (req,res) => {
  const { id: _id } = req.params;
      const {answerId, noOfAnswers } = req.body;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
      }
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("answer unavailable...");
      }
      updateNoOfQuestions(_id, noOfAnswers);
    try {
      
      await Question.updateOne( {_id} , {
        $pull:{'answers':{_id:answerId}}
      });
      res.status(200).json({message:'sucessfully deleted'})
    } catch (error) {
     res.status(405).json(error)
    }
  };


