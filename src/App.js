import React, { Component } from 'react';
import './App.css';

import NavbarComponent from './component/Navbar';
import TabelaContatoComponent from './component/TabelaContato';
import FormContatoComponent from './component/FormContato';

import LoadingComponent from './component/loading/LoadingComponent';
import AlertComponent from './component/alert/AlertComponent';
import Util from './util/util';

import firebase from 'firebase';
import ReactFireMixin from 'reactfire';

const styles = {
  container: {
    marginLeft: 0,
    marginRight: 0
  },
  conteudoFixo: {
    overflow: 'scroll',
    marginLeft: 0,
    marginRight: 0
  },
  contentCental: {
    paddingTop: '20px'
  },
  title: {
    color: '#FFF'
  }
}

export default class App extends Component {

  mixins = [ReactFireMixin];

  state = {
    data: [],
    form: {
      nome: '',
      ramal: '',
      setor: ''
    },
    alert: {
      text: null,
      className: 'is-success',
      show: false
    },
    showLoading: false
  }

  componentWillMount = () => {

    this.onInit();
    //var ref = firebase.database().ref("items");
    this.setState({showLoading:true});
    this.firebaseRef = firebase.database().ref('ramais');
    this.firebaseRef.limitToLast(25)
    .on('value', function (dataSnapshot) {
      var items = [];
      dataSnapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
      });

      this.setState({
        data: items
      });
      this.setState({showLoading:false});
    }.bind(this));
  }

  render = () => {
    const alert = this.state.alert;
    const show = this.state.showLoading;
    return (
      <div className="container padrao is-fluid content" style={styles.container}>

        <NavbarComponent history={this.props.history}></NavbarComponent>

        <div className="container is-fluid content" style={styles.container}>
          <div className="columns content">
            <div className="column is-3 sidebar">
              <h3 className="title is-primary is-4" style={styles.title}>Adicionar Contato</h3>
              <AlertComponent show={alert.show} classPropsName={alert.className} />
              <FormContatoComponent
                form={this.state.form}
                onSave={this.onSubmit}
                onUpdate={this.onUpdate}></FormContatoComponent>
            </div>

            <div className="er-box box column main" style={{...styles.conteudoFixo, ...styles.contentCental}}>
              <LoadingComponent show={show} />
              <TabelaContatoComponent
                itens={this.state.data}
                onRemove={this.onRemove}
                onEdit={this.onEdit}
                onSearch={this.onInit}>
              </TabelaContatoComponent>
            </div>

          </div>
        </div>
      </div>
    );
  }

  onInit = (filter) => {
    this.setState({showLoading: false});
    let uri = this.onMountUri();
    if (filter) {
      if (filter === '') {
        uri = this.onMountUri();
      } else {
        uri += '?filter=' + filter
      }
    };
    fetch(this.request(uri, 'GET'))
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
        this.setState({redirectToReferrer: true});
        this.setState({
          data: response.data
        })
    })
    .catch(this.handlerError);   
  }

  onSubmit = (data) => {
    this.setState({showLoading: true});
    let uri = this.onMountUri();
    //let uri = Util.getUri()+'api/ping';
    fetch(this.request(uri, 'POST', data))
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
        this.onShowMessage('Registro cadastro com sucesso', 'is-success');
    })
    .catch(this.handlerError);
  }

  onRemove = (data) => {
    this.setState({showLoading: true});
    let uri = this.onMountUri() +'/ '+data.id;
    //let uri = Util.getUri()+'api/ping';
    fetch(this.request(uri, 'DELETE'))
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
        this.onShowMessage('Registro removido com sucesso', 'is-success');
    })
    .catch(this.handlerError);
  }

  onEdit = (item) => {
    this.setState({
      form: item
    })
  }

  onUpdate = (data) => {
    this.setState({showLoading: true});
    let uri = this.onMountUri() + "/" + data.id;
    //let uri = Util.getUri()+'api/ping';
    fetch(this.request(uri, 'PUT', data))
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
        this.onShowMessage('Registro cadastro com sucesso', 'is-success');
    })
    .catch(this.handlerError);
  }

  onShowMessage = (message, className) => {
    this.setState({
      alert: {
        show: true,
        text: message,
        className: className
      }
    });
  }

  onHideMessage = () => {
    this.setState({
      alert: {
        show:false,
        text:null
      }
    });
  }

  onMountUri = () => {
    return Util.getUri()+'contatos';
  }

  handlerError = (error) => {
    const data = error.message;
    const er = JSON.parse(data);
    this.setState({showLoading: false});
    this.onShowMessage(er.message, 'is-warning');
    setTimeout(() => {
        this.onHideMessage();
    }, 4000);
  }

  request = (uri, method, data) => {
    
    const options = {
        method: method,
        mode: 'cors',
        headers: Util.mountHeader()
    }
    
    if (data) {
      options.body = JSON.stringify(data);
    };

    return new Request(uri, options);
  }

}