import React, {Component} from 'react';

export default class ButtonLogoutComponent extends Component {
    render = () => {
        return (
            <a onClick={this.onLogout} className="button is-primary">
                <span className="icon">
                    <i className="fa fa-power-off"></i>
                </span>
                <span>Sair</span>
            </a>
        );
    }

    onLogout = () => {
        localStorage.clear();
        this.props.onLogout(true);
    }
}