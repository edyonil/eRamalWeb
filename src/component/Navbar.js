import React, { Component } from 'react';
import ButtonLogoutComponent from './button-logout/ButtonLogout';

const styles = {
    image: {
        width: '100px',
        maxHeight: '200px'
    },
    nav: {
        backgroundColor:'hsl(0, 0%, 96%)',
        boxShadow: '2px 0px 2px hsl(0, 0%, 48%)',
        height: 'auto'
    }
}

export default class NavbarComponent extends Component {
    render = () => {
        return (
            <nav className="nav" style={styles.nav}>
                <div className="nav-left">
                    <a className="nav-item">
                        <img style={styles.image} src="images/logo_thumbnail.svg" alt="Bulma logo" />
                    </a>
                </div>

                <span className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

                <div className="nav-right nav-menu">
                    <span className="nav-item">
                        <ButtonLogoutComponent onLogout={this.onLogout}></ButtonLogoutComponent>
                    </span>
                </div>
            </nav>
        );
    }

    onLogout = (item) => {
        if (item) {
            this.props.history.push('/login');
        }
    }
}