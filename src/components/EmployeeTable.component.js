import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import EmployeeRow from './EmployeeRow.component';
import EmployeeModal from './EmployeeModal.component';

export default class EmployeeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            lastUsedId: 0,
            showModal: false,
        };
    }

    addEmployee = employee => {
        this.setState(prevState => ({
            employees: [...prevState.employees, employee],
            lastUsedId: employee.id
        }));
    };

    closeModal = e => {
        this.setState(() => ({
            showModal: false
        }));
    };

    openModal = employee => {
        this.setState(() => ({
            showModal: true
        }));
    };

    render() {
        return (
            <div>
                <button
                    className="pcty-btn pcty-btn-green"
                    type="button"
                    onClick={() => this.openModal()}
                >
                    Add New Employee
                </button>
                <Table bordered className="pcty-employee-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Benefits Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map((employee, i) => {
                                return <EmployeeRow key={i} employee={employee} openModal={() => this.openModal(employee)} />
                            })
                        }
                    </tbody>
                </Table>

                <EmployeeModal
                    onClose={this.closeModal}
                    onSave={this.addEmployee}
                    show={this.state.showModal}
                />
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
