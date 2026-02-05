const {v4} = require("uuid")

const { read_file, write_file } = require("../api/file-system")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const register = async(req,res) =>{
    try{

       const {username, email, password} = req.body
        if (!username || !email || !password) {
           return res.status(400).json({
                message:"Username, email, password are required"
            })
        }

        const fileData = read_file("auth.json")
        const foundedUser = fileData.find((item) => item.email === email)

        if (!foundedUser) {
            return res.status(400).json({
                message:"User already exist!"
            })
        }
        
        const hash = await bcrypt.hash(password, 12)

        fileData.push({
            id: v4(),
            username,
            email,
            password: hash,
            role: "user"
        })

        write_file("auth.json", fileData)
        res.status(201).json({
            message : "Registered"
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const login = async(req,res) =>{
    try{
        const {email, password} = req.body
        if (!email || !password) {
           return res.status(400).json({
                message:"Email, password are required"
            })
        }

        const fileData = read_file("auth.json")
        const foundedUser = fileData.find((item) => item.email === email)

        if (!foundedUser) {
            return res.status(400).json({
                message:"User not found!"
            })
        }
        
        const check = await bcrypt.compare(password, foundedUser.password)


        if (check) {
            const payload= {id: foundedUser.id, email: foundedUser.email, role: foundedUser.role }
            const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"})

            res.status(200).json({
                message: "success",
                token
            })
        }else{
            res.status(401).json({
                message: "wrong password"
            })
        }




    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {
    register,
    login
}