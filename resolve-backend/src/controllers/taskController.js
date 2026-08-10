const taskService = require("../services/taskService");


async function getTasks(req,res){

    try{

        const tasks = await taskService.getTasks();

        res.json({
            success:true,
            data:tasks
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}



async function createTask(req,res){

    try{

        const task = await taskService.createTask({

            ...req.body,

            created_by:req.user.id

        });


        res.status(201).json({

            success:true,

            data:task

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

}



async function updateTask(req,res){

    try{

        const result =
        await taskService.updateTask(
            req.params.id
        );


        res.json({

            success:true,

            data:result

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

}



async function deleteTask(req,res){

    try{

        const result =
        await taskService.deleteTask(
            req.params.id
        );


        res.json({

            success:true,

            data:result

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

}



module.exports = {

    getTasks,
    createTask,
    updateTask,
    deleteTask

};