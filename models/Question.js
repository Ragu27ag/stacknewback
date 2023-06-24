import mongoose from "mongoose";


const Quesschema = mongoose.Schema({
    quesTitle : {type : String , required: 'Title is required'},
    quesBody : {type : String , required: 'Body is required'},
    quesTags : {type : [String] , required: 'Title is required'},
    noofanswer : {type : Number , default:0},
    upvote : {type : [String] , default:[]},
    downvote : {type : [String] , default:[]},
    author : {type:String,reqired:'Author is required'},
    userId : {type:String},
    posteddate : {type:Date,default:Date.now},
    answers : [{
        answerBody : String,
        userAnswered : String,
        userId : String,
        answeredon : {type:Date,default:Date.now}
    }]
})


export default mongoose.model("Questions" , Quesschema)