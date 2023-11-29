const jwt=require('jwt');

const jwtSender=async (user,res,statusCode)=>{
    const jwtToken= user.generateJwtTokens();

    return res.status(statusCode).cookie("token",jwtToken).json({
        status:true,
        user:user,
        token:jwtToken,
    })
}

module.exports={jwtSender};