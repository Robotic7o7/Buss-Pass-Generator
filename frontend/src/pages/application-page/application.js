import React from "react";
import { useState, useEffect } from "react";
import "./application.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom'
import Axios from "axios";
function ApplicationForm(props) {

    const history = useHistory()
    const uniqueid = React.createContext("0");



    /*function submit() {
        // console.log(props.name)
        // console.log(props.email)
        // console.log(props.rollNo)
        // console.log(props.branch)
        // console.log(props.section)
        // console.log(props.area)

        fetch('https://rohanchristopher.tech/api/buspass/students/new', {
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
                busStop: "Malkajgiri",
                routeNo: "608e550e821faa0908c360ad",
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
                    history.push('/pass');
                }
                else {
                    alert("Server Error")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }*/

    return (
        <div className="application-page">
            <label className="sub-heading-text">APPLICATION FORM</label>
            <div className="form-container" id="form-container">
                <div className="form-row">
                    <label className="form-label">NAME:</label>
                    <input className="form-input-field" onChange={e => { e.preventDefault(); props.setName(e.target.value) }}></input>
                </div>
                <div className="form-row">
                    <label className="form-label">EMAIL:</label>
                    <input className="form-input-field" onChange={e => { e.preventDefault(); props.setEmail(e.target.value) }}></input>
                </div>
                <div className="form-row">
                    <label className="form-label">ROLL NUMBER:</label>
                    <input className="form-input-field" onChange={e => { e.preventDefault(); props.setRollNo(e.target.value) }}></input>
                </div>
                <div className="form-row">
                    <label className="form-label">BRANCH:</label>
                    <input className="form-input-field" onChange={e => { e.preventDefault(); props.setBranch(e.target.value) }}></input>
                </div>
                <div className="form-row">
                    <label className="form-label">SECTION:</label>
                    <input className="form-input-field" onChange={e => { e.preventDefault(); props.setSection(e.target.value) }}></input>
                </div>
                <div className="form-row">
                    <label className="form-label">AREA:</label>
                    <input className="form-input-field" onChange={e => { e.preventDefault(); props.setArea(e.target.value) }}></input>
                </div>
                <div className="submit-button-container">
                    <Link to="/confirm" className="primary-button">APPLY</Link>
                </div>
            </div>
            {/* <div className="redirect-button-container" id="redirect-container">
                <Link to="/pass" className="primary-button">Generate Pass</Link>
            </div> */}
        </div>

    );
}

export default ApplicationForm
