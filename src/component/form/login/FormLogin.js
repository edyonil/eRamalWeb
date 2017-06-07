import React, {Component} from 'react';

export default class FormLogin extends Component{
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input input-filter" ref="email" type="email" placeholder="Email" />
                        <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input input-filter" ref="password" type="password" placeholder="Password" />
                        <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control" style={{textAlign:'center'}}>
                        <button  className="button is-medium">
                        Logar
                        </button>
                    </p>
                </div>
                <div className="is-clearfix"></div>
            </form>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            email: this.refs.email.value.trim(),
            password: this.refs.password.value.trim(),
        };

        this.onLogin(data);    
        this.refs.password.value = '';
    }

    onLogin = (item) => {
        this.props.onLogin(item);
    }
}