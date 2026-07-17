const userService = require("../services/userService");

const createUser = async(req,res)=>{

    try{

        await userService.createUser(req.body);

        res.status(201).json({

            success:true,

            message:"Usuario creado correctamente."

        });

    }catch(error){

        console.error(error);

        res.status(500).json({

            success:false,

            message:"Error al crear usuario."

        });

    }

};

module.exports={

    createUser

};