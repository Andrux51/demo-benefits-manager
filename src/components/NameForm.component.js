import React, { Component } from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

export default class NameForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: this.props.person.firstName || '',
            lastName: this.props.person.lastName || ''
        };
    }

    handleChange = e => {
        const val = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: val
        }, () => {
            this.props.onUpdate({
                firstName: this.state.firstName,
                lastName: this.state.lastName
            });
        });
    };

    render() {
        return (
            <div>
                <FormGroup>
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                        name="firstName"
                        type="text"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                        name="lastName"
                        type="text"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                    />
                </FormGroup>
            </div>
        )
    }
}
