import React, { Component } from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable.component';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src="https://www.paylocity.com/wp-content/themes/paylocity/library/images/footer-logo.png" className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to your Benefits Center</h1>
                </header>
                <p className="App-intro">
                    Use the table below to add and manage employees and their dependents.
                </p>
                <EmployeeTable />
            </div>
        );
    }
}

export default App;
