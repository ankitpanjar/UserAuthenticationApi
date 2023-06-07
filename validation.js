const joi=require('@hapi/joi')

// register validation ....
const registerValidation=(data)=>{
    // create a schema to validate the data ...
    const schema=joi.object({
        name:joi.string().min(3).required(),
        email:joi.string().min(3).required().email(),
        password:joi.string().min(3).required()
    });
    return schema.validate(data);
}

// login validation ...
const loginValidation=(data)=>{
    // create a schema to validate the data ...
    const schema=joi.object({
        email:joi.string().min(3).required().email(),
        password:joi.string().min(3).required()
    });
    return schema.validate(data);
}

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;