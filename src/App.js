import React, { Component } from 'react';
import './App.css';

import NavbarComponent from './component/Navbar';
import TabelaContatoComponent from './component/TabelaContato';
import FormContatoComponent from './component/FormContato';

import LoadingComponent from './component/loading/LoadingComponent';
import AlertComponent from './component/alert/AlertComponent';
import Util from './util/util';

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

  state = {
    data: [],
    form: {
      nome: '',
      ramalOuTelefone: '',
      setor: ''
    },
    alert: {
      text: null,
      className: 'is-success',
      show: false
    },
    showLoading: false,
    edit: false
  }

  componentWillMount = () => {
    this.onInit();
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
              <AlertComponent text={alert.text} show={alert.show} classPropsName={alert.className} />
              <FormContatoComponent
                edit={this.state.edit}
                onCancel={this.onCancel}
                form={this.state.form}
                onSave={this.onSubmit}
                onUpdate={this.onUpdate}>
              </FormContatoComponent>
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
    this.setState({showLoading: true});
    let uri = this.onMountUri();
    if (filter) {
      if (filter === '') {
        uri = this.onMountUri();
      } else {
        uri += '?filtro=' + filter
      }
    };
    fetch(this.request(uri, 'GET'))
    .then((response) => {
        if (response.status === 400) {
          alert(response.statusText);
          this.props.history.push('/login');
          throw new Error(response.statusText);
        }
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
          data: response.itens
        });
        setTimeout(() => {
          this.onHideMessage();
        }, 4000);
    })
    .catch(this.handlerError);   
  }

  /**
   * Salvar
   * @memberof App
   */
  onSubmit = (data) => {

    let item = this.state.data;    
    this.setState({showLoading: true});
    let uri = this.onMountUri();
    //let uri = Util.getUri()+'api/ping';
    //this.data.push(data);
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
        item.push(response);
        this.setState({
          data: item,
          showLoading: false,
          redirectToReferrer: true
        })
        this.onShowMessage('Registro cadastro com sucesso', 'is-success');
        setTimeout(() => {
          this.onHideMessage();
        }, 4000);
    })
    .catch(this.handlerError);
  }

  /**
   * Remover
   * @memberof App
   */
  onRemove = (data) => {
    let uri = this.onMountUri() + '/' + data.id;
    this.setState({showLoading: true});
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
        this.setState({redirectToReferrer: true, showLoading: false});
        this.onShowMessage('Registro removido com sucesso', 'is-success');
        setTimeout(() => {
          this.onHideMessage();
        }, 4000);
    })
    .catch(this.handlerError);
  }

  onEdit = (item) => {
    this.setState({
      form: item,
      edit: true
    })
  }

  onUpdate = (data) => {
    let itens = this.state.data;
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
        itens.map(function(item) {
          if (item.id === data.id) {
            item.nome = data.nome;
            item.setor = data.setor;
            item.ramalOuTelefone = data.ramalOuTelefone;
          }
          return item;
        });
        this.setState({
          data: itens,
          showLoading: false,
          redirectToReferrer: true,
          edit: false
        });
        this.onShowMessage('Registro cadastro com sucesso', 'is-success');
        setTimeout(() => {
          this.onHideMessage();
        }, 4000);
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

  onCancel = (edit) => {
    this.setState({
      edit: edit
    })
  }

  request = (uri, method, data) => {
    
    const options = {
        method: method,
        mode: 'cors',
        headers: Util.mountHeader()
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    };

    return new Request(uri, options);
  }

}