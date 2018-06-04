import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EmployeeTable from './components/EmployeeTable.component';
import DependentModal from './components/DependentModal.component';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dependentModalShown: false,
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to your Benefits Center</h1>
                </header>
                <p className="App-intro">
                    <EmployeeTable />
                </p>
                {this.state.dependentModalShown &&
                    <DependentModal />
                }
            </div>
        );
    }
}

export default App;
