const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
    sensorId: { type: String, required: true },
    storeName: { type: String, required: true },
    description: { type: String, required: true },
    expiration: { type: Number, required: true },
    qrCode: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

 module.exports = mongoose.model('Coupon', couponSchema); 