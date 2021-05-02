import react from "react";
import "./pass.css";
import { useState, useEffect } from "react";
import uniqueid from "../application-page/application";
var QRCode = require('qrcode.react');


function PassPage(props) {

    const [studentData, setStudentData] = useState('');
    const [routeID, setRouteID] = useState('');
    const [route, setRoute] = useState('');

    //FETCH STUDENT INFO FOR QR CODE GENERATION

    useEffect(() => {
        console.log(localStorage.getItem("UID"));
        fetch(`https://rohanchristopher.tech/api/buspass/${localStorage.getItem("UID")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.message != "failed") {
                    console.log(data);
                    setStudentData(data);
                    setRouteID(data.routeNo);
                }
                else {
                    alert("Server Error")
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    //FETCH BUS ROUTE INFO FROM ID

    // useEffect(() => {
    //     console.log(localStorage.getItem("UID"));
    //     fetch(`http://localhost:3003/bus-routes/${routeID}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.message != "failed") {
    //                 console.log(data);
    //                 setRoute(data.routeNo);
    //             }
    //             else {
    //                 alert("Server Error")
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }, [])

    var url = `https://rohanchristopher.tech/api/buspass/students/check/${localStorage.getItem("UID")}`

    console.log(url)

    return (

        <div className="pass-page">
            <label className="pass-page-title">VBIT BUS PASS</label>
            <QRCode className="qrcode" value={url} />
            <label>Scan QR Code</label>
            <label className="pass-page-sub-title">Student Details</label>
            <div className="pass-page-details-container">
                <div className="pass-page-detaile-container-left">
                    <label className="pass-page-detail-attribute">NAME</label>
                    <label className="pass-page-detail-attribute">ROLL NUMBER</label>
                    <label className="pass-page-detail-attribute">BRANCH</label>
                    <label className="pass-page-detail-attribute">SECTION</label>
                    <label className="pass-page-detail-attribute">ROUTE NUMBER</label>
                    <label className="pass-page-detail-attribute">BUS INCHARGE</label>
                    <label className="pass-page-detail-attribute">CONTACT</label>
                    <label className="pass-page-detail-attribute">BOARDING POINT</label>
                </div>
                <div className="pass-page-detaile-container-right">
                    <label className="pass-page-detail-value">{studentData.name}</label>
                    <label className="pass-page-detail-value">{studentData.rollnumber}</label>
                    <label className="pass-page-detail-value">{studentData.branch}</label>
                    <label className="pass-page-detail-value">{studentData.section}</label>
                    <label className="pass-page-detail-value">test</label>
                    <label className="pass-page-detail-value">test</label>
                    <label className="pass-page-detail-value">test</label>
                    <label className="pass-page-detail-value">{studentData.busStop}</label>
                </div>
            </div>
            <div className="pass-page-download-button-container">
                <button className="pass-page-download-button">Download E-PASS</button>
            </div>
        </div >

    )

}

export default PassPage;