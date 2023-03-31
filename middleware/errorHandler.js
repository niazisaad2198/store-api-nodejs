const { CustomApiError } = require("../errors/errorHandler")

const errorHandler = (err, req, res, next) =>{
    if(err instanceof CustomApiError){
        return next(createCustomError({ msg: err.message }, err.statusCode))
    }
    res.status(500).json({msg:err})
}

module.exports = errorHandler