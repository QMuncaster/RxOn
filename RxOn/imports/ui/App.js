import React, { Component } from 'react';
import PatientPage from './PatientPage.js';
import LoginPage from './LoginPage.js';
import Navbar from './Navbar';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
        <div className = "App" id = "App">
          <Navbar />
          <LoginPage />
        </div>
    )
  }
}

