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


function InformationPage(props) {

    const [routeDisplayData, setRouteDisplayData] = useState('');

    useEffect(() => {
        console.log(localStorage.getItem("UID"));
        fetch("https://rohanchristopher.tech/api/buspass/assign-route/test", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.message != "failed") {
                    console.log(data);
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


    if (!routeDisplayData) {
        return (<div>Loading......</div>)
    }
    else {
        return (<div className="information-page">
            <label className="pass-page-title">CONFIRM OPTIONS</label>
            <div className="assigned-container">
                <label><b>You have been assigned</b></label>
                <br />
                <br />
                <label><b>Route Number:</b>&nbsp;{routeDisplayData.routeNo} </label>
                <br />
                <label><b>Boarding Point:</b>&nbsp;{routeDisplayData.boardingPoint} </label>
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
                    <label className="pass-page-detail-value">{routeDisplayData.routeNo}</label>
                    <label className="pass-page-detail-value">{routeDisplayData.boardingPoint}</label>
                </div>
            </div>
            <div className="info-page-button-container">
                <Link to="/success" className="primary-button">Confirm</Link>
                <Link to="/confirm" className="primary-button">Modify</Link>
            </div>
        </div>)
    }





}

export default InformationPage;