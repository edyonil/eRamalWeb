import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NavbarComponent from './component/Navbar';
import TabelaContatoComponent from './component/TabelaContato';
import FormContatoComponent from './component/FormContato';

import firebase from 'firebase';
import ReactFireMixin from 'reactfire';

export default class App extends Component {

  mixins = [ReactFireMixin];

  constructor() {
    super();
    this.state = {
      data: [],
      form: {}
    }
  }

  componentWillMount = () => {
    //var ref = firebase.database().ref("items");
    this.firebaseRef = firebase.database().ref('ramais');
    this.firebaseRef.limitToLast(25).on('value', function (dataSnapshot) {
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
              <img style={styles.imgStyle} src="/images/atom.png" />
              <h4 className="title is-5">Seus aplicativo de ramais</h4>
            </div>
          </div>
          <div className="column content" style={styles.columnsSemMargem}>

            <div className="container is-fluid content" style={styles.container}>

              <NavbarComponent></NavbarComponent>

              <div className="columns content">
                <div className="column is-3 sidebar">
                  <h3 className="title is-primary is-4" style={styles.title}>Adicionar Contato</h3>
                  <FormContatoComponent {...this.state} onSalvar={this.onSubmit}></FormContatoComponent>
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
    console.log(data);
    this.firebaseRef.push(data);
  }

  onRemove = (item) => {
    this.firebaseRef.child(item['.key']).remove();
  }

  onEdit = (item) => {
    this.setState({
      form: item
    });
  }

  onUpdate = (item) => {
    
  }
}


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