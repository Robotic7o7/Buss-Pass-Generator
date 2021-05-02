var express = require("express");
var router = express.Router();
const puppeteer = require("puppeteer");
const fs = require('fs-extra');

//import models
const Student = require("../models/student");



//get all students
router.get("/", async function (req, res) {
    try {
        const items = await Student.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get Item by id
router.get("/:id", async function (req, res) {
    try {
        const item = await Student.findById(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//check if ID is vald
router.get("/check/:id", async function (req, res) {
    try {
        const item = await Student.findById(req.params.id);
        res.status(200).json({ message: "ID found, bus pass ACTIVE", data: item });
    } catch (err) {
        res.status(500).json({ message: "ID not found, bus pass INACTIVE" });
    }
});

//new Menu Item
router.post("/new", async function (req, res) {

    try {

        const student = new Student({
            name: req.body.name,
            emailID: req.body.emailID,
            rollnumber: req.body.rollnumber,
            branch: req.body.branch,
            section: req.body.section,
            busStop: req.body.busStop,
            routeNo: req.body.routeNo,
            status: req.body.status
        });

        const savedData = await student.save();
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
router.patch("/:id/update_item", async function (req, res) {
    try {
        updatedItem = await Student.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    rollnumber: req.body.description,
                    branch: req.body.cost,
                    section: req.body.status,
                    busStop: req.body.busStop,
                    routeNo: req.body.routeNo,
                    status: req.body.status
                }
            },
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "order placed updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update status of a Menu Item
router.patch("/:id/update_status", async function (req, res) {
    try {
        updatedItem = await Student.updateOne(
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
            .json({ message: "success", additional_info: "Menu Item updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a Menu Item
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedItem = await Student.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Item deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;