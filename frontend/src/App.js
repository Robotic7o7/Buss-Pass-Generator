import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Landing from './pages/landing/landing';
import ApplicationForm from './pages/application-page/application';



function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [branch, setBranch] = useState('');
  const [section, setSection] = useState('');
  const [area, setArea] = useState('');
  const [routeNo, setRouteNo] = useState('');

  return (
    <>
      <Router>
        <Switch>
          <Route path='/apply'>
            <ApplicationForm
              name={name}
              email={email}
              rollNo={rollNo}
              branch={branch}
              section={section}
              area={area}
              setName={setName}
              setEmail={setEmail}
              setRollNo={setRollNo}
              setBranch={setBranch}
              setSection={setSection}
              setArea={setArea}
              setRouteNo={setRouteNo}
            />
          </Route>
          <Route absolute path='/'>
            <Landing />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;