var express = require("express");
var router = express.Router();
const fs = require('fs-extra');

router.get("/test", async function (req, res) {
    try {
        res.status(200).json({ message: "success", routeNo: "11", boardingPoint: "Malkajgiri" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
