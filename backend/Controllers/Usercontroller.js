import { users } from "../Model/Userschema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const saltRounds = 10;

// User Register
export const Useregistercontroller ={
    register : async(req,res)=>{
        const {username,email,password} = req.body;

        try {
            const existinguser = await users.findOne({email});
            if(existinguser){
                res.status(406).json('This User Already Exist...')
            }
            else{
                bcrypt.hash(password,saltRounds, async function(err,hash){
                    if(err) throw err
                    const newuser = new users({
                       username,
                       email,
                       password: hash
                    })
                    await newuser.save()
                    res.status(200).json(newuser)
                })
            }
        } catch (error) {
            res.status(401).json(`error transaction failed:  ${error}`)
        }
    }
}

// User Login

export const Userlogincontroller ={
    login: async(req,res)=>{
        const {email,password} = req.body;

        try {
            const existinguser = await users.findOne({email})
           if(existinguser){
            bcrypt.compare(password,existinguser.password, function(err,result){
                if(err) throw err

                if(result){
                    // generate token
                    const token = jwt.sign({userId:existinguser._id}, process.env.SECRETKEY)
                    res.status(200).json({
                        existinguser,
                        token:token
                    })
                }else{
                    res.status(404).json('Incorrect email or password');
                }
            })
           }else{
                res.status(404).json("incorrect email / password")
           }
           
        } catch (error) {
            res.status(401).json(`error transaction failed:  ${error}`) 
        }
    }
}