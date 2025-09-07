const notificationMidtransServices = require("../../Services/Transaction/notificationTransaction");

const notificationMidtransController = async (req,res,next) => {
    const { order_id } = req.body;
    const {_id} = req.result

    try {
        const result = await notificationMidtransServices(order_id,_id);
        res.status(200).json({
            message: "Notification processed",
            data : result
        });
    } catch (error) {
        return next(error);
    }
};


module.exports = notificationMidtransController;
