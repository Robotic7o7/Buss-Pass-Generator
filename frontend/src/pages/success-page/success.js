import React from 'react';
import { useState, useEffect } from "react";
import "./success.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom'

function SuccessScreen() {

    useEffect(() => {
        var timeout = setTimeout(displayButton, 10000);
    }, [])

    function displayButton() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("button-box").style.display = "grid";

    }

    return (<div className="success-screen">
        <div className="success-message-box">
            <img src="/logo192.png" className="success-message-icon" />
            <label className="success-message-title">Payment Successful</label>
            <label className="success-message-sub-title">Your pass is being generated</label>
            <div class="lds-ellipsis" id="loader"><div></div><div></div><div></div><div></div></div>
            <div className="submit-button-container success-container" id="button-box">
                <Link to="/pass" className="success-button">View</Link>
            </div>
        </div>
    </div>)
}

export default SuccessScreen;