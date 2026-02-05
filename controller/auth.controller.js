const {v4} = require("uuid")

const { read_file, write_file } = require("../api/file-system")
const bcrypt = require("bcryptjs")
const register = async(req,res) =>{
    try{

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const login = async(req,res) =>{
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
            password: hash
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

module.exports = {
    register,
    login
}