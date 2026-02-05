const jwt = require("jsonwebtoken")
const authRouter = require("../router/auth.routes")

module.exports = async function(req, res, next) {
    try{
        const autharization = req.headers.autharization

    if(!autharization){
        return res.status(400).json({
            message: "Token not found"
        })
    }

        const changeToken = autharization.split(" ")

        const bearer = changeToken[0]

        const token = changeToken[1]

        if (bearer== "Bearer" || token) {
            return res.status(400).json({
            message: "Bearer token is required"
        })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode

        if (["admin","superadmin"].include(req.user.role)) {
               return res.status(403).json({
            message: "you are not admin or superadmin"
        })
            
        }
        next()

    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
}