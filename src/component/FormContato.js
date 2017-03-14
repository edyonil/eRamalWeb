import React, { Component } from 'react';


import './FormContato.css';

export default class FormContatoComponent extends Component {


    componentWillReceiveProps(nextProps) {
        this.refs.nome.value = nextProps.form.nome;
        this.refs.ramal.value = nextProps.form.ramal;
        this.refs.setor.value = nextProps.form.setor;
    }
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
        var data = {
            nome: this.refs.nome.value.trim(),
            ramal: this.refs.ramal.value.trim(),
            setor: this.refs.setor.value.trim()
        };

        if (this.props.form.id == null) {
            this.onSave(data);
        } else {
            data.id = this.props.form.id;
            this.onEdit(data);
        }
        this.refs.nome.value = '';
        this.refs.ramal.value = '';
        this.refs.setor.value = '';
        this.props.form.id = null;
    }

    onEdit = (item) => {
        this.props.onUpdate(item);
    }

    onSave = (item) => {
        this.props.onSave(item);
    }

}