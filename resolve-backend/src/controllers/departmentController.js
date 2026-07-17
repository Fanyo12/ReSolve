const departmentService = require("../services/departmentService");

async function getDepartments(req, res) {

    try {

        const departments = await departmentService.getDepartments();

        res.json({

            success: true,
            data: departments

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

}

module.exports = {

    getDepartments

};