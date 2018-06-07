import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import AppConstants from '../helpers/app.constants';
import EmployeeRow from './EmployeeRow.component';

export default class EmployeeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            lastUsedId: 0
        };
    }

    addEmployee = () => {
        const newEmployee = {
            // reasonable consideration for things like SSN, birth date, etc.
            // could assert SSN's to be unique, or something
            benefitsBaseCost: AppConstants.EMPLOYEE_BENEFITS_COST,
            firstName: '',
            id: +1+this.state.lastUsedId,
            lastName: '',
            payPerPeriod: AppConstants.EMPLOYEE_PAY_PER_PERIOD,
            dependents: []
        };

        this.setState(prevState => ({
            employees: [...prevState.employees, newEmployee],
            lastUsedId: newEmployee.id
        }));
    };

    render() {
        return (
            <div>
                <button
                    className="pcty-btn pcty-btn-green"
                    type="button"
                    onClick={this.addEmployee}
                >
                    Add New Employee
                </button>
                <Table bordered className="pcty-employee-table">
                    <thead>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(employee => {
                                return <EmployeeRow key={employee.id} employee={employee} />
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }

    tableStyle = {
        backgroundColor:'#eee',
        border: '1px solid #ccc',
        borderRadius: 3,
        marginLeft: 30
    }
}
