import React from "react";
import { useState, useEffect } from "react";
import "./info-display.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom'
import Axios from 'axios';


function InformationPage(props) {

    const [routeDisplayData, setRouteDisplayData] = useState('');
    const [testData, setTestData] = useState('');
    const history = useHistory()

    useEffect(() => {
        console.log(localStorage.getItem("UID"));
        fetch(`http://143.110.254.198:3003/assign-route/${props.area}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.message != "failed") {
                    console.log(data);
                    localStorage.setItem("boardingPoint", data.designatedStop)
                    localStorage.setItem("busRouteID", data.routeNo);
                    busRouteFind()
                    setRouteDisplayData(data)
                }
                else {
                    alert("Server Error")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    function busRouteFind() {
        fetch(`http://143.110.254.198:3003/bus-routes/${localStorage.getItem("busRouteID")}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                localStorage.setItem("routeNo", data.routeNo)
                localStorage.setItem("busIncharge", data.inchargeName)
                localStorage.setItem("inchargeNumber", data.inchargeNumber)
                setTestData(data)
            });
    }



    function saveBusPass() {
        console.log(props.name)
        console.log(props.email)
        console.log(props.rollNo)
        console.log(props.branch)
        console.log(props.section)
        console.log(props.area)
        console.log(props.boardingPoint)
        console.log(props.routeNo)

        fetch('http://143.110.254.198:3003/students/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: props.name,
                emailID: props.email,
                rollnumber: props.rollNo,
                branch: props.branch,
                section: props.section,
                busStop: localStorage.getItem("boardingPoint"),
                routeNo: localStorage.getItem("busRouteID"),
                status: "ACTIVE"
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message != "failed") {
                    console.log("ID Generated " + data._id);
                    props.setUniqueID(data._id);
                    console.log(props.uniqueID);
                    localStorage.setItem("UID", data._id);
                    history.push('/success');
                }
                else {
                    alert("Server Error")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const paymentHandler = async (e) => {
        const API_URL = 'http://143.110.254.198:3003/'
        e.preventDefault();
        const orderUrl = `${API_URL}payments/pay`;
        const response = await Axios.post(orderUrl, {
            totalBillAmt: "1"
        });
        const { data } = response;
        const options = {
            key: process.env.RAZOR_PAY_TEST_KEY,
            name: "VBIT Bus Pass",
            description: "Pay to VBIT",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const paymentId = response.razorpay_payment_id;
                    const url = `${API_URL}payments/capture/${paymentId}`;
                    const captureResponse = await Axios.post(url, {
                        totalBillAmt: "1"
                    })
                    console.log(captureResponse.data);
                    saveBusPass()
                } catch (err) {
                    console.log(err);
                }
            },
            theme: {
                color: "#8d86dc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    if (!testData) {
        return (<div>Loading......</div>)
    }
    else {
        return (<div className="information-page">
            <label className="pass-page-title">CONFIRM OPTIONS</label>
            <div className="assigned-container">
                <label><b>You have been assigned</b></label>
                <br />
                <br />
                <label><b>Route Number:</b>&nbsp;{localStorage.getItem("routeNo")} </label>
                <br />
                <label><b>Boarding Point:</b>&nbsp;{localStorage.getItem("boardingPoint")} </label>
            </div>
            <div className="pass-page-details-container info-page-table">
                <div className="pass-page-detaile-container-left">
                    <label className="pass-page-detail-attribute">Name</label>
                    <label className="pass-page-detail-attribute">Roll Number</label>
                    <label className="pass-page-detail-attribute">Branch</label>
                    <label className="pass-page-detail-attribute">Section</label>
                    <label className="pass-page-detail-attribute">Route Number</label>
                    <label className="pass-page-detail-attribute">Boarding Point</label>
                </div>
                <div className="pass-page-detaile-container-right">
                    <label className="pass-page-detail-value">{props.name}</label>
                    <label className="pass-page-detail-value">{props.rollNo}</label>
                    <label className="pass-page-detail-value">{props.branch}</label>
                    <label className="pass-page-detail-value">{props.section}</label>
                    <label className="pass-page-detail-value">{localStorage.getItem("routeNo")}</label>
                    <label className="pass-page-detail-value">{localStorage.getItem("boardingPoint")}</label>
                </div>
            </div>
            <div className="info-page-button-container">
                <button onClick={saveBusPass} className="button-2">Confirm</button>
                <Link to="/modify" className="primary-button">Modify</Link>
            </div>
        </div>)
    }





}

export default InformationPage;