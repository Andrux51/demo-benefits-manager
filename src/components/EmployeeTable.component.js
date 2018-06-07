import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import AppConstants from '../helpers/app.constants';
import EmployeeModal from './EmployeeModal.component';
import EmployeeRow from './EmployeeRow.component';

export default class EmployeeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            modalMounted: false,
            selectedEmployee: null,
            showModal: false,
        };
    }

    saveEmployee = employee => {
        const existing = this.state.employees.find(obj => {
            return obj.id === employee.id;
        });

        if(!existing) {
            this.setState(prevState => ({
                employees: [...prevState.employees, employee],
                showModal: false
            }));
        } else {
            const employees = this.state.employees.map(obj => {
                return obj.id === employee.id ? employee : obj;
            });

            this.setState(prevState => ({
                employees: employees,
                showModal: false
            }));
        }
    };

    closeModal = e => {
        this.setState(() => ({
            showModal: false
        }));
    };

    // "hack" necessary to get react-bootstrap modal to unmount after animating out
    exitModal = e => {
        this.setState(() => ({
            modalMounted: false
        }));
    }

    openModal = employee => {
        let selected;

        if(employee) {
            selected = this.state.employees.find(obj => {
                return obj.id === employee.id;
            });
        }

        this.setState(() => ({
            modalMounted: true,
            selectedEmployee: selected,
            showModal: true
        }));
    };

    render() {
        return (
            <div>
                <button
                    className="pcty-btn pcty-btn-green"
                    onClick={this.openModal}
                    type="button"
                >
                    Add New Employee
                </button>
                <Table bordered className="pcty-employee-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Dependents</th>
                            <th>Benefits Cost (Annual)</th>
                            <th>Pay Per Period ({AppConstants.EMPLOYEE_PAYCHECKS_PER_YEAR}/year)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(employee => {
                                return <EmployeeRow key={employee.id}
                                    calculate={() => this.calculateEmployeeBenefitsCost(employee)}
                                    employee={employee}
                                    openModal={() => this.openModal(employee)}
                                />
                            })
                        }
                    </tbody>
                </Table>

                {this.state.modalMounted &&
                    <EmployeeModal
                        employee={this.state.selectedEmployee}
                        onClose={this.closeModal}
                        onExit={this.exitModal}
                        onSave={this.saveEmployee}
                        show={this.state.showModal}
                    />
                }
            </div>
        )
    }
}
