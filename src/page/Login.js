import React, {Component} from 'react';
import FormLogin from '../component/form/login/FormLogin';
import Util from '../util/util';
import {Redirect} from 'react-router-dom';

import LoadingComponent from '../component/loading/LoadingComponent';
import AlertComponent from '../component/alert/AlertComponent';

import './login/login.css';

const styles = {
    backgroundEscuro: {
        backgroundColor: 'hsl(217, 71%, 53%)',
        height: '100%'
    },
    form: {
        border: '1px solid #1d62d1',
        padding: '30px 20px',
        borderRadius: 5,
        minHeight:300,
        minWidth: 400,
        width: '70%'
    },
    imageContainer: {
        textAlign: 'center',
        marginBottom: 30
    },
    imageLogo: {
        width: '60%'
    }
}

export default class Home extends Component
{
    classAttributeCss = {
        danger: 'is-danger',
        success: 'is-success'
    };

    state = {
        redirectToReferrer: false,
        showLoading:false,
        alert: {
            show: false,
            text: null,
            className: this.classAttributeCss.danger
        }
    };

    render = () => {
        const {from} = this.props.location.state || '/';
        const {redirectToReferrer} = this.state;
        const showLoading = this.state.showLoading;
        const alert = this.state.alert;

        return(
            <div style={styles.backgroundEscuro} className="columns">
                {redirectToReferrer && (
                    <Redirect to={from || '/dashboard'}/>
                )}
                <div style={{display:'flex', alignItems:'center'}} className="column is-half is-offset-one-quarter">
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}className="form">
                        <div style={styles.form}>
                            <div style={styles.imageContainer}>
                                <img style={styles.imageLogo} role="presentation" src="/images/atom.png" />
                            </div>
                            <div className="box er-box">
                                <LoadingComponent show={showLoading} />
                                <AlertComponent show={alert.show} classPropsName={alert.className} text={alert.text} />
                                <FormLogin
                                    onLogin={this.onLogin}>
                                </FormLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onLogin = (item) => {
        //@todo remover apos os testes
        localStorage.setItem('token', '98098908098khfksdjhklsjhf98098');
        this.setState({redirectToReferrer: true});
        try {
            this.validFormLogin(item);
        } catch (error) {
            this.setState({alert:{
                show: true,
                text: error.message,
                className: this.classAttributeCss.danger
            }});

            return;
        }

        this.setState({alert:{
            show: false
        }});

        this.setState({showLoading: true});

        let uri = Util.getUri()+'auth/login';
        //let uri = Util.getUri()+'api/ping';
        var request = new Request(uri, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(item)
        });
        fetch(request)
        .then((response) => {
            if (!response.ok) {
                return response.text().then((data) => {
                    throw new Error(data);
                })
            }
            return response.json();
        })
        .then((response) => {
            this.setState({showLoading: false});
            localStorage.setItem('token', response.token);
            this.setState({redirectToReferrer: true});
        })
        .catch((error) => {
            const data = error.message;
            const er = JSON.parse(data);
            this.setState({showLoading: false});
            this.setState({alert:{
                show: true,
                text: er.message
            }});
            
            setTimeout(() => {
                this.setState({
                    alert: {
                        show:false,
                        text:null
                    }
                })
            }, 4000);
            
        });
    }

    validFormLogin = (data) => {
        if (data.email === "") {
            throw new Error("Preencha o email");
        }
        if (data.password === "") {
            throw new Error("Preencha o password");
        }
    }


    handlerError(response) {
        console.log(response,2);
    }
}