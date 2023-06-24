import  express  from "express";
import auth from "../middlewares/auth.js";
import { AskQuestion, GetAllQuestion,deleteQuestion,voteQuestion } from "../controllers/Question.js";


const router = express.Router();


router.post('/Ask',AskQuestion)
router.get('/get',GetAllQuestion)
router.delete ('/delete/:id',deleteQuestion)
router.patch ('/vote/:id',voteQuestion)

export default router