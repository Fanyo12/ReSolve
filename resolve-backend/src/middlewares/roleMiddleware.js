function roleMiddleware(roles){

    return (req, res, next)=>{

        if(!roles.includes(req.user.role)){

            return res.status(403).json({
                success:false,
                message:"No tienes permisos para realizar esta acción"
            });

        }

        next();

    };

}

module.exports = roleMiddleware;