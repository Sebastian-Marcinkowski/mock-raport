import React from "react";
import './Modal.css'

export default function Modal() {
    const [raportForm, setRaportForm] = React.useState({
        working: false,
        message: null,
        name: '',
        formatR: 'xlsx',
        email: '',
        scheduleType: 0,
        scheduleDate: null,
        scheduleTime: null,
        scheduleDay: null
    });

//  list of values for schedule label text
    const scheduleLabel = ['', 'Date', 'Everyday at', 'Every'];

//  API call to my domain
    const apiURL = 'https://smarcinkowski.pw/drfapi/post';
//  API call to provided endpoint
    //const apiURL = 'https://jsonplaceholder.typicode.com/posts';
//  API call for localhost tests
    //const apiURL = 'http://127.0.0.1:8000/drfapi/post';

//  Function handling every change of every input
    function handleChange(event) {
        const { name, value } = event.target;
        setRaportForm(prevData => {
            return {
                ...prevData,
                [name]: name === 'scheduleType' ? Number(value) : value
            }
        });
    }

//  Function handling form submit
    function handleSubmit (event) {
        event.preventDefault();
        setRaportForm(prevData => {
            return {
                ...prevData,
                working: true,
                message: 'Sending mock raport, please wait'
            }
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: raportForm.name,
                formatR: raportForm.formatR,
                email: raportForm.email,
                scheduleType: raportForm.scheduleType,
                scheduleDate: raportForm.scheduleType === 1 ? raportForm.scheduleDate : null,
                scheduleTime: raportForm.scheduleType !== 0 ? raportForm.scheduleTime : null,
                scheduleDay: raportForm.scheduleType === 3 ? raportForm.scheduleDay : null
            })
        };

        const postData = async () => {
            fetch(apiURL, requestOptions)
                .then(response => response.json())
                .then(data => {
                    let msg = '';
                    if (data && data.id) {
                        msg = "Mock raposrt post succesfull, object's id: " + data.id;
                    } else {
                        msg = "Mock post post invalid";
                    }
                    setRaportForm(prevData => {
                        return {
                            ...prevData,
                            message: msg,
                            working: false
                        }
                    });
                })
                .catch(error => {
                    setRaportForm(prevData => {
                        return {
                            ...prevData,
                            message: 'We have some error' + error.message,
                            working: false
                        }
                    });
                })
        }
        postData();
    }

    const handleCancel = () => {
        //We are canceling modal window
    }

    return (
        <>
            <div className="modal-wrapper" data-testid="outer-window">
                <div className="modal-window" data-testid="modal-window">
                    <div className="modal-title" data-testid="modal-title">
                        Export raport
                    </div>
                    <form name="raportForm" onSubmit={handleSubmit} data-testid="modal-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Raport name</label>
                            <input
                                className="form-input"
                                id="name"
                                name="name"
                                data-testid="name"
                                maxLength={128}
                                onChange={handleChange}
                                type="text">
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="formatR">Format</label>
                            <div className="format-radio">
                                <div>
                                    <input
                                        type="radio"
                                        id="formatR"
                                        name="formatR"
                                        data-testid="formatR1"
                                        checked={raportForm.formatR === 'xlsx'}
                                        onChange={handleChange}
                                        value="xlsx">
                                    </input>
                                    <label>xlsx</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="formatR"
                                        name="formatR"
                                        data-testid="formatR2"
                                        checked={raportForm.formatR === 'csv'}
                                        onChange={handleChange}
                                        value="csv">
                                    </input>
                                    <label>csv</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">E-mail to</label>
                            <input
                                className="form-input"
                                id="email"
                                name="email"
                                data-testid="email"
                                maxLength={128}
                                onChange={handleChange}
                                type="email">
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="scheduleType">Schedule</label>
                            <div className="schedule-radio">
                                <div>
                                    <input
                                        type="radio"
                                        id="scheduleType"
                                        name="scheduleType"
                                        data-testid="type-zero"
                                        checked={raportForm.scheduleType === 0}
                                        onChange={handleChange}
                                        value="0">
                                    </input>
                                    <label>No Repeat</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="scheduleType"
                                        name="scheduleType"
                                        data-testid="type-one"
                                        checked={raportForm.scheduleType === 1}
                                        onChange={handleChange}
                                        value="1">
                                    </input>
                                    <label>Specific Date</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="scheduleType"
                                        name="scheduleType"
                                        data-testid="type-two"
                                        checked={raportForm.scheduleType === 2}
                                        onChange={handleChange}
                                        value="2">
                                    </input>
                                    <label>Daily</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="scheduleType"
                                        name="scheduleType"
                                        data-testid="type-three"
                                        checked={raportForm.scheduleType === 3}
                                        onChange={handleChange}
                                        value="3">
                                    </input>
                                    <label>Weekly</label>
                                </div>
                            </div>
                        </div>
                        {raportForm.scheduleType !== 0 && <div className="form-group" data-testid="schedule-inputs">
                            <label data-testid="schedule-label" className="schedule-label" htmlFor="date"> {scheduleLabel[raportForm.scheduleType]} </label>
                            <div className="schedule-group">
                                {raportForm.scheduleType === 1 && <input
                                    id="scheduleDate"
                                    name="scheduleDate"
                                    type="date"
                                    data-testid="date-input"
                                    onChange={handleChange}
                                    className="schedule-input">
                                </input>}
                                {raportForm.scheduleType === 3 && <select
                                    name="scheduleDay"
                                    onChange={handleChange}
                                    data-testid="day-input"
                                    id="scheduleDay"
                                    className="schedule-input">
                                    <option value="mon">Monday</option>
                                    <option value="tue">Tuesday</option>
                                    <option value="Wen">Wensday</option>
                                    <option value="thu">Thursday</option>
                                    <option value="fri">Friday</option>
                                    <option value="sat">Saturday</option>
                                    <option value="sun">Sunday</option>
                                </select>}
                                {raportForm.scheduleType !== 2 && <span className="schedule-span" data-testid="schedule-span"> at </span>}
                                <input
                                    id="scheduleTime"
                                    name="scheduleTime"
                                    data-testid="time-input"
                                    onChange={handleChange}
                                    type="time"
                                    className="schedule-input">
                                </input>
                            </div>
                        </div>}
                        <hr></hr>
                        {raportForm.message && <div className="form-message" data-testid="message-div">
                            {raportForm.message}
                        </div>}
                        <button
                            name="submit"
                            id="submit"
                            data-testid="submit"
                            disabled={raportForm.working}
                            className="btn-primary" type="submit">OK
                        </button>
                        <button
                            name="cancel"
                            id="cancel"
                            data-testid="cancel"
                            disabled={raportForm.working}
                            className="btn-default"
                            type="button" onClick={handleCancel}>Cancel
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
