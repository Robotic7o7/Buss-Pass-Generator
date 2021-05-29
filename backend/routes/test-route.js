var express = require("express");
var router = express.Router();
const fs = require('fs-extra');

//import models
const BusStop = require("../models/busStop");

router.get("/test", async function (req, res) {
    try {
        res.status(200).json({ message: "success", routeNo: "11", boardingPoint: "Malkajgiri" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get stop by routeNo
router.get("/:area", async function (req, res) {
    try {
        const item = await BusStop.findOne({ area: req.params.area });;
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


module.exports = router;
