const notificationMidtransServices = require("../../Services/Transaction/notificationTransaction");

const notificationMidtransController = async (req,res,next) => {
    const { order_id } = req.body; // ambil dari body, bukan params

    console.log(">>> ORDER ID masuk ke service:", order_id);

    try {
        const result = await notificationMidtransServices(order_id);
        res.status(200).json({
            message: "Notification processed",
            data : result
        });
    } catch (error) {
        return next(error);
    }
};


module.exports = notificationMidtransController;
