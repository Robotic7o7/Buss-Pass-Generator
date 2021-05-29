var express = require("express");
var router = express.Router();

//import models
const BusRoute = require("../models/busRoute");



//get all students
router.get("/", async function (req, res) {
    try {
        const items = await BusRoute.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get Item by id
router.get("/:id", async function (req, res) {
    try {
        const item = await BusRoute.findById(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new Menu Item
router.post("/new", async function (req, res) {

    try {

        const busRoute = new BusRoute({
            routeNo: req.body.routeNo,
            inchargeName: req.body.inchargeName,
            inchargeNumber: req.body.inchargeNumber,
            startPoint: req.body.startPoint,
            availableSeats: req.body.availableSeats,
            status: req.body.status
        });

        const savedData = await busRoute.save();
        console.log(savedData);
        res
            .status(200)
            .json({ message: "success", _id: savedData._id });
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
});


//update a bus Route
router.patch("/:id/update_route", async function (req, res) {
    try {
        updatedItem = await BusRoute.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    routeNo: req.body.routeNo,
                    inchargeName: req.body.inchargeName,
                    inchargeNumber: req.body.inchargeNumber,
                    startPoint: req.body.startPoint,
                    status: req.body.status
                }
            },
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "Route updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//update a bus Route
router.patch("/:id/update_incharge", async function (req, res) {
    try {
        updatedItem = await BusRoute.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    inchargeName: req.body.inchargeName,
                    inchargeNumber: req.body.inchargeNumber,
                }
            },
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "Route Incharge Updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//update a bus Route Seats
router.patch("/:id/update_seats", async function (req, res) {
    try {
        updatedItem = await BusRoute.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    availableSeats: req.body.availableSeats
                }
            },
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "Seats Updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});



//update status of a Route
router.patch("/:id/update_status", async function (req, res) {
    try {
        updatedItem = await BusRoute.updateOne(
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
            .json({ message: "success", additional_info: "Route Status updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a bus route
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedItem = await BusRoute.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Bus Route deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;