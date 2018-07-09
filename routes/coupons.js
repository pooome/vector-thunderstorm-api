var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/'})

const CouponsController = require('../controllers/coupons');
var router = express.Router();

router.get('/all', CouponsController.getCoupons);

router.post('/create', upload.single('imageUrl'), CouponsController.createCoupon);

router.post('/sensor', CouponsController.getCouponsByStore);

module.exports = router;
