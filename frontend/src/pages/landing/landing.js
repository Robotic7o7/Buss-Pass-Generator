import React from "react";
import "./landing.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
function Landing() {
    return (
        <div className="landing">
            <div className="land-text-container">
                <label className="heading-text">BPGen</label>
                <label className="sub-heading-text">Buss Pass Generator</label>
                <div className="button-container">
                    <Link to="/apply" className="primary-button">Start</Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;