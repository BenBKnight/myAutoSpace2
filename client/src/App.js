import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from "./pages/login";
import Members from "./pages/members";
import MaintRecord from "./pages/maintRecord";
import Maintenance from "./pages/maintenance";
import Vehicles from "./pages/vehicles";
import VehicleDisplay from "./pages/vehicleDisplay";
import NewMaintenance from "./pages/newMaintenance";
import { AuthProvider } from "./utils/authContext";
import ProtectedRoute from './utils/protectedRoute';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route exact path="/" component={Login} />
              <ProtectedRoute path="/Members" component={Members} />
              <ProtectedRoute path="/MaintRecord/:id" component={MaintRecord} />
              <ProtectedRoute exact path="/Maintenance" component={Maintenance} />
              <ProtectedRoute exact path="/Vehicles" component={Vehicles} />
              <ProtectedRoute exact path="/NewMaintenance/:id" component={NewMaintenance} />
              <ProtectedRoute path="/Vehicles/:id" component={VehicleDisplay} />
            </Switch>
          </header>
        </div >
      </AuthProvider>
    </Router>
  )
}

