import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AttendeesList from './AttendeesList.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


async function loadAttendees() {
  try {
    const response = await fetch('http://localhost:8001/api/attendees/');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      root.render(
        <React.StrictMode>
          <App attendees={data.attendees} />
        </React.StrictMode>
      )
    } else {
      console.error(response.status, response.statusText);
    }
  } catch (error) {
    console.error(error)
  }
}
loadAttendees();

reportWebVitals();
