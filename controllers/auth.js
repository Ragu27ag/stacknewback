import users from '../models/authdb.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


export const signup = async (req,res) => {
    const {name,email,password} = req.body;

    try{
        const existsuser = await users.findOne({email});

        if(existsuser){
          return  res.status(404).json({message : 'user already exisis'})
        }

        const hasedpass = await bcrypt.hash(password,12);
        const newUser = await users.create({name,email,password:hasedpass});
        const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({result : newUser,token})
    }
    catch(error){
        res.status(500).json({message :'Something went wrong'})
    }

}

export const login = async (req,res) => {
    const {email,password} = req.body;

    try{
        const existsuser = await users.findOne({email});
        console.log(existsuser)
        if(!existsuser){
            return  res.status(404).json({message : 'user dont exist'})
        }
        const crtpassword = await bcrypt.compare(password,existsuser.password)
        if (!crtpassword) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
        const token = jwt.sign({email:existsuser.email,id:existsuser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({result : existsuser,token})

    }
    catch(error){
        res.status(500).json({message :'Something went wrong'})
    }
    
}


