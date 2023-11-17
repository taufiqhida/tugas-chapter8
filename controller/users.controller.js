const{users}= require("../model")
const utils = require("../utils")
module.exports={
    register: async(req, res, next)=>{
        try {
            const newUser = await users.create({
                data : {
                   email: req.body.email,
                   password: await utils.cryptPassword(req.body.password)
                } 
            })

            return res.status(201).json({
                data : utils.exlcude(newUser, ['password'])
            })
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    },
    resetPassword: async(req, res)=>{
        try {
            const findUser = await users.findFirst({
                where: {
                    resetPasswordToken : req.body.key
                }
            })

            if(!findUser){
                return res.render("error")
            }
            await users.update({
                data : {
                   resetPasswordToken: await utils.cryptPassword(req.body.email)
                },
                where : {
                    id: findUser.id 
                }
            })

            return res.render('success')
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    },
    setPassword: async(req, res)=>{
        try {
            const findUser = await users.findFirst({
                where: {
                    email: req.body.email
                }
            })

            if(!findUser){
                return res.render("error")
            }
            const newUser = await users.update({
                data : {
                   resetPasswordToken: await utils.cryptPassword(req.body.email)
                },
                where : {
                    id: findUser.id 
                }
            })

            return res.render('success')
        } catch (error) {
            return res.status(500).json({
                error
            });
        }
    }
}