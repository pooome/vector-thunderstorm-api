const mongoose = require("mongoose");
var multer  = require('multer')
const Coupon = require("../models/coupon");

exports.getCoupons = (req, res, next) => {
    Coupon.find()
        .select('sensorId storeName description expiration qrCode imageUrl')
        .exec()
        .then(docs => {
            const response = {
                coupons: docs.map(doc => {
                    return {
                        sensorId: doc.sensorId,
                        storeName: doc.storeName,
                        description: doc.description,
                        expiration: doc.expiration,
                        qrCode: doc.qrCode,
                        imageUrl: doc.imageUrl
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.getCouponsByStore = (req, res, next) => {

    const sensorId = req.body.sensorId;

    if (!sensorId) {
        res.status(400).json({err: 'sensorId is required'})
    }

    Coupon.find({
        sensorId: sensorId
    })
        .select('sensorId storeName description expiration qrCode imageUrl')
        .exec()
        .then(docs => {
            const response = {
                coupons: docs.map(doc => {
                    return {
                        sensorId: doc.sensorId,
                        storeName: doc.storeName,
                        description: doc.description,
                        expiration: doc.expiration,
                        qrCode: doc.qrCode,
                        imageUrl: doc.imageUrl
                    };
                })
              };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

};

exports.createCoupon = (req, res, next) => {
    
    const coupon = new Coupon({
        sensorId: req.body.sensorId,
        storeName: req.body.storeName,
        description: req.body.description,
        expiration: req.body.expiration,
        qrCode: req.body.qrCode,
        imageUrl: req.body.imageUrl
    });

    //req.file.path,

    coupon
        .save()
        .then(result => {
            res.status(201).json({
                message: "Created coupon successfully!",
                createdCoupon: {
                    sensorId: result.sensorId,
                    storeName: result.storeName,
                    description: result.description,
                    expiration: result.expiration,
                    qrCode: result.qrCode,
                    imageUrl: result.imageUrl
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};



//TODO: delete coupon

//TODO: edit coupon
