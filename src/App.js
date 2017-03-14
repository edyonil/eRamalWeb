import React, { Component } from 'react';
import './App.css';

import NavbarComponent from './component/Navbar';
import TabelaContatoComponent from './component/TabelaContato';
import FormContatoComponent from './component/FormContato';

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
  columnsSemMargem: {
    paddingTop: 0
  },
  title: {
    color: '#FFF'
  },
  imgStyle: {
    width: '75%'
  }

}

export default class App extends Component {

  mixins = [ReactFireMixin];

  constructor() {
    super();
    this.state = {
      data: [],
      form: {
        nome: '',
        ramal: '',
        setor: ''
      }
    }
  }

  componentWillMount = () => {
    //var ref = firebase.database().ref("items");
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
    }.bind(this));
  }

  render() {
    return (
      <div className="container padrao is-fluid content" style={styles.container}>
        <div className="columns content">
          <div className="column is-2 hero is-dark" style={styles.conteudoFixo}>
            <div className="logo">
              <img role="presentation" style={styles.imgStyle} src="/images/atom.png" />
              <h4 className="title is-5">Seu aplicativo de ramais</h4>
            </div>
          </div>
          <div className="column content" style={styles.columnsSemMargem}>

            <div className="container is-fluid content" style={styles.container}>

              <NavbarComponent></NavbarComponent>

              <div className="columns content">
                <div className="column is-3 sidebar">
                  <h3 className="title is-primary is-4" style={styles.title}>Adicionar Contato</h3>
                  <FormContatoComponent
                    form={this.state.form}
                    onSave={this.onSubmit}
                    onUpdate={this.onUpdate}></FormContatoComponent>
                </div>
                <div className="column main" style={styles.conteudoFixo}>
                  <TabelaContatoComponent
                    itens={this.state.data}
                    onRemove={this.onRemove}
                    onEdit={this.onEdit}
                  >
                  </TabelaContatoComponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSubmit = (data) => {
    this.firebaseRef.push(data);
  }

  onRemove = (item) => {
    this.firebaseRef.child(item['.key']).remove();
  }

  onEdit = (item) => {
    this.setState({
      form: item
    })
  }

  onUpdate = (item) => {
    this.firebaseRef.child(item.id).update(item);
    this.setState({
      form: {
        nome: '',
        ramal: '',
        setor: '',
        id: null
      }
    });
  }
}