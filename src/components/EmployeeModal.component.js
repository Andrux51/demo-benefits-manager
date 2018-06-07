import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AppConstants from '../helpers/app.constants';

export default class EmployeeModal extends Component {
    constructor(props) {
        super(props);

        const newEmployee = {
            // reasonable consideration for things like SSN, birth date, etc.
            // could assert SSN's to be unique, or something
            benefitsBaseCost: AppConstants.EMPLOYEE_BENEFITS_COST,
            benefitsTotalCost: '',
            firstName: '',
            lastName: '',
            payPerPeriod: AppConstants.EMPLOYEE_PAY_PER_PERIOD,
            dependents: []
        };

        this.state = {
            employee: this.props.employee || newEmployee
        };
    }

    updateEmployee = employee => {
        this.setState(() => ({
            employee: employee
        }));
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add/Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <EmployeeForm /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-primary" onClick={() => this.props.onSave(this.state.employee)}>Save</Button>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}