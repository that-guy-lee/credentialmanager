import React from 'react';
// react router dom components imported
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// local components imported
import Homepage from './components/pages/Homepage';
import ProtectedRoutes from './components/route/ProtectedRoutes';
import Dashboard from './components/pages/Dashboard';
/**
 * React router dom components used for navigation
 * @returns Application components depending on permissions and endpoints
 */
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
