import React, { Component } from 'react';
import DependentRow from './DependentRow.component';

export default class DependentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
    }

    handleClick = e => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }));
    }

    render() {
        return (
            <div>
                <button className="pcty-btn-collapse" onClick={this.handleClick}>{this.state.collapsed ? `+` : `-`}</button>
                <span>Dependents</span>
                    {!this.state.collapsed &&
                        <table class="pcty-dependent-table">
                            <thead>
                                <th>Dependent ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </thead>
                            <tbody>
                                {
                                    this.props.dependents.map(dependent => {
                                        return <DependentRow key={dependent.id} dependent={dependent} />
                                    })
                                }
                            </tbody>
                        </table>
                    }
            </div>
        )
    }
}
