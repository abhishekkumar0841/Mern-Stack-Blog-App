import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(404).json({
            success: false,
            message: "User un authenticated, token does not exist"
        })
    }

    try {
        const userDetails = await jwt.decode(token, process.env.JWT_SECRET)
        req.user = userDetails
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export default authMiddleware