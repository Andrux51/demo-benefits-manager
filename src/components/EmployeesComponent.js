import React, { Component } from 'react';
import AppConstants from '../helpers/app.constants';

export default class Employees extends Component {
    calculateBenefitsCost = person => {
        person.finalBenefitsCost = person.baseBenefitsCost;
        
        if(this.isDiscountApplicable(person)) {
            person.finalBenefitsCost = person.baseBenefitsCost * ((100 - AppConstants.NAME_DISCOUNT_PERCENTAGE)/100);
        }

        return person.finalBenefitsCost;
    };

    calculateEmployeeBenefitsCost = employee => {
        employee.totalBenefitsCost = this.calculateBenefitsCost(employee);

        employee.dependents.forEach(dependent => {
            employee.totalBenefitsCost += this.calculateBenefitsCost(dependent);
        });
    };

    isDiscountApplicable = person => {
        return person.firstName.toLowerCase().startsWith('a') || person.lastName.toLowerCase().startsWith('a');
    };

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Benefits Cost</th>
                    </thead>
                    <tbody>
                        {
                            this.props.employees.map(employee => {
                                return <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.totalBenefitsCost}</td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
};