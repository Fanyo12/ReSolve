const knowledgeService = require("../services/knowledgeService");


async function createManualKnowledge(req,res){

    try{

        const knowledge = await knowledgeService.createManualKnowledge(
            req.body,
            req.user.id
        );


        res.json({

            success:true,
            data:knowledge

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

}


async function getKnowledge(req,res){

    try{

        const knowledge = await knowledgeService.getKnowledge();


        res.json({

            success:true,
            data:knowledge

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

}

async function getKnowledgeById(req,res){

    try{

        const knowledge = await knowledgeService.getKnowledgeById(
            req.params.id
        );


        if(!knowledge){

            return res.status(404).json({

                success:false,
                message:"Conocimiento no encontrado."

            });

        }


        res.json({

            success:true,
            data:knowledge

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

}
async function getAvailableTickets(req,res){

    try{

        const tickets = await knowledgeService.getAvailableTickets();


        res.json({

            success:true,
            data:tickets

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

}

async function createTicketKnowledge(req,res){

    try{

        const knowledge = await knowledgeService.createTicketKnowledge(
            req.body.ticket_id,
            req.user
        );


        res.json({

            success:true,
            data:knowledge

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

}

module.exports = {

    createManualKnowledge,
    getKnowledge,
    getKnowledgeById,
    getAvailableTickets,
    createTicketKnowledge

};