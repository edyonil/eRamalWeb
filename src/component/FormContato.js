import React, { Component } from 'react';


import './FormContato.css';

export default class FormContatoComponent extends Component {

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="nome" className="label">Nome</label>
                <div className="control">
                    <input type="text" className="input is-medium" id="nome" ref="nome" placeholder="Digite o nome " />
                </div>
                <label htmlFor="ramal" className="label">Ramal/Telefone</label>
                <div className="control">
                    <input id="ramal" type="text" className="input is-medium" ref="ramal" placeholder="Digite o ramal " />
                </div>
                <label htmlFor="setor" className="label">Setor</label>
                <div className="control">
                    <input id="setor" type="text" className="input is-medium" ref="setor" placeholder="Digite o setor " />
                </div>
                <div className="block">
                    <button className="button is-primary is-medium is-inverted">
                        <span className="icon is-small">
                            <i className="fa fa-check"></i>
                        </span>
                        <span>Salvar</span>
                    </button>
                </div>
            </form>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var nome = this.refs.nome.value.trim();
        var ramal = this.refs.ramal.value.trim();
        var setor = this.refs.setor.value.trim();
        this.props.onSalvar(
            {
                nome: nome,
                ramal: ramal,
                setor: setor
            }
        );
        this.refs.nome.value = '';
        this.refs.ramal.value = '';
        this.refs.setor.value = '';
    }

}