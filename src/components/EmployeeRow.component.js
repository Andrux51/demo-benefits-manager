import React, { Component } from 'react';

export default class EmployeeRow extends Component {
    render() {
        return (
            <tr className="pcty-employee-row">
                <td>{this.props.employee.firstName}</td>
                <td>{this.props.employee.lastName}</td>
                <td>{this.props.employee.dependents.length}</td>
                <td>{this.props.employee.benefitsTotalCost}</td>
                <td>{this.props.employee.payPerPeriodTotal}</td>
                <td>
                    <button className="pcty-btn no-padding"
                        onClick={this.props.openModal}
                        title="Edit Employee &amp; Dependents"
                    >
                        <img
                            src="https://emojipedia-us.s3.amazonaws.com/thumbs/60/google/119/family-man-woman-girl-boy_1f468-200d-1f469-200d-1f467-200d-1f466.png"
                            alt="family emoji"
                            height="24"
                            width="24"
                        />
                    </button>
                </td>
            </tr>
        )
    }
}
