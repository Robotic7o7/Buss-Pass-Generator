var express = require("express");
var router = express.Router();

//import models
const BusStop = require("../models/busStop");



//get all bus Stops
router.get("/", async function (req, res) {
    try {
        const items = await BusStop.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get stop by id
router.get("/:id", async function (req, res) {
    try {
        const item = await BusStop.findById(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//get stop by routeNo
router.get("/:routeNo", async function (req, res) {
    try {
        const item = await BusStop.findOne({ routeNo: req.params.routeNo });
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get stop by routeNo
router.get("/:area", async function (req, res) {
    try {
        const item = await BusStop.find(req.params.area);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//new stop
router.post("/new", async function (req, res) {

    try {

        const busStop = new BusStop({
            routeNo: req.body.routeNo,
            area: req.body.area,
            designatedStop: req.body.designatedStop,
            status: req.body.status
        });

        const savedData = await busStop.save();
        console.log(savedData);
        res
            .status(200)
            .json({ message: "success", _id: savedData._id });
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
});


//update a Menu Item
router.patch("/:id/update_stop", async function (req, res) {
    try {
        updatedItem = await BusStop.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    routeNo: req.body.routeNo,
                    area: req.body.area,
                    designatedStop: req.body.designatedStop,
                    status: req.body.status
                }
            },
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "stop updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update status of a Menu Item
router.patch("/:id/update_status", async function (req, res) {
    try {
        updatedItem = await BusStop.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    status: req.body.status
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "Stop Status updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a Menu Item
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedItem = await BusStop.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "stop deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;