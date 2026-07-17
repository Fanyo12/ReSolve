const dashboardService = require("../services/dashboardService");

async function getDashboard(req, res) {

    try {

        const data = await dashboardService.getDashboard();

        res.json({
            success: true,
            message: "Dashboard generado correctamente.",
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    getDashboard
};