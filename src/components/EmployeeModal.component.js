import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AppConstants from '../helpers/app.constants';

import NameForm from './NameForm.component';

export default class EmployeeModal extends Component {
    constructor(props) {
        super(props);

        const newEmployee = {
            benefitsBaseCost: AppConstants.EMPLOYEE_BENEFITS_COST,
            benefitsTotalCost: 0, // value will be calculated
            firstName: '',
            id: Date.now(), // arbitrary but effectively unique
            lastName: '',
            payPerPeriodBase: AppConstants.EMPLOYEE_PAY_PER_PERIOD,
            payPerPeriodTotal: 0, // value will be calculated
            dependents: []
        };

        this.state = {
            employee: this.props.employee || newEmployee
        };
    }

    addDependent = () => {
        const newDependent = {
            benefitsBaseCost: AppConstants.DEPENDENT_BENEFITS_COST,
            firstName: '',
            lastName: ''
        };

        this.setState(prevState => ({
            employee: {
                ...this.state.employee,
                dependents: [...this.state.employee.dependents, newDependent]
            }
        }));
    };

    calculateBenefitsCost = person => {
        return this.isDiscountApplicable(person)
            ? person.benefitsBaseCost * ((100 - AppConstants.NAME_DISCOUNT_PERCENTAGE)/100)
            : person.benefitsBaseCost;
    };

    calculateEmployeeBenefitsCost = () => {
        let employeeBenefitsCost = this.calculateBenefitsCost(this.state.employee);

        this.state.employee.dependents.forEach(dependent => {
            employeeBenefitsCost += this.calculateBenefitsCost(dependent);
        });

        return employeeBenefitsCost;
    };

    calculatePayPeriodAmount = benefitsTotalCost => {
        const cost = (benefitsTotalCost / AppConstants.EMPLOYEE_PAYCHECKS_PER_YEAR).toFixed(2);

        return this.state.employee.payPerPeriodBase - cost;
    };

    isDiscountApplicable = person => {
        return person.firstName.toLowerCase().startsWith('a') || person.lastName.toLowerCase().startsWith('a');
    };

    saveEmployee = () => {
        const benefitsTotalCost = this.calculateEmployeeBenefitsCost();

        this.setState(prevState => ({
            employee: {
                ...this.state.employee,
                benefitsTotalCost: benefitsTotalCost,
                payPerPeriodTotal: this.calculatePayPeriodAmount(benefitsTotalCost)
            }
        }), () => {
            this.props.onSave(this.state.employee);
        });
    }

    updateEmployee = employee => {
        this.setState(() => ({
            employee: {
                ...this.state.employee,
                ...employee
            }
        }));
    };

    updateDependent = (dependent, i) => {
        const employee = Object.assign({}, this.state.employee);

        employee.dependents[i] = Object.assign({}, employee.dependents[i], dependent);

        this.setState(() => ({
            employee: employee
        }));
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose} onExited={this.props.onExit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add/Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="pcty-flex-container">
                        <NameForm
                            person={this.state.employee}
                            onUpdate={this.updateEmployee}
                        />
                        <div className="pcty-vertical-divider">&zwj;</div>
                        <div>
                            {/* TODO: next release, add ability to remove a dependent */}
                            <Button className="btn-success" onClick={this.addDependent}>Add Dependent</Button>
                            {
                                this.state.employee.dependents.map((dependent, i) => {
                                    return <NameForm key={i}
                                        person={dependent}
                                        onUpdate={dep => this.updateDependent(dep, i)}
                                    />
                                })
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn-primary"
                        onClick={this.saveEmployee}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={this.props.onClose}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}