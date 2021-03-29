import React from "react";
import "./application.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
function ApplicationForm(props) {

    function submit() {
        console.log(props.name)
        console.log(props.email)
        console.log(props.rollNo)
        console.log(props.branch)
        console.log(props.section)
        console.log(props.area)
    }

    return (
        <div className="application-page">
            <label className="sub-heading-text">APPLICATION FORM</label>
            <div className="form-container">
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
                    <Link to="" className="primary-button" onClick={submit}>APPLY</Link>
                </div>
            </div>
        </div>
    );
}

export default ApplicationForm