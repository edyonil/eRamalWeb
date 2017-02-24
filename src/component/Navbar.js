import React, { Component } from 'react';

export default class NavbarComponent extends Component {
    render() {
        return (
            <nav className="nav">
                <div className="nav-left">
                    <a className="nav-item">
                        <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
                    </a>
                </div>

                <span className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

                <div className="nav-right nav-menu">
                    <a className="nav-item">
                        Home
                  </a>
                    <a className="nav-item">
                        Documentation
                  </a>
                    <a className="nav-item">
                        Blog
                  </a>

                    <span className="nav-item">
                        <a className="button" >
                            <span className="icon">
                                <i className="fa fa-twitter"></i>
                            </span>
                            <span>Tweet</span>
                        </a>
                        <a className="button is-primary">
                            <span className="icon">
                                <i className="fa fa-download"></i>
                            </span>
                            <span>Download</span>
                        </a>
                    </span>
                </div>
            </nav>
        );
    }
}