import Nav from './Nav';
import AttendeesList from './AttendeesList.js';
import LocationForm from './LocationForm.js';
import ConferenceForm from './ConferenceForm.js'
import AttendConferenceForm from './AttendConferenceForm.js';
import PresentationForm from './PresentationForm.js'
import {createBrowserRouter, BrowserRouter, RouterProvider, Routes, Route} from 'react-router-dom'

function App(props) {
  if (props.attendees === undefined){
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className='container'>
        <Routes>
          <Route path='/' element={<AttendeesList attendees = {props.attendees}/>} />
          <Route path='new-location' element={<LocationForm />} />
          <Route path='new-conference' element={<ConferenceForm />} />
          <Route path='attend-conference' element={<AttendConferenceForm />} />
          <Route path='new-presentation' element={<PresentationForm />} />
          <Route/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
