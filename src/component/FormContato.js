import React, { Component } from 'react';

import './FormContato.css';

export default class FormContatoComponent extends Component {
    render = () => {
        if (this.props.form.id != null) {
            this.refs.nome.value = this.props.form.nome;
            this.refs.ramalOuTelefone.value = this.props.form.ramalOuTelefone;
            this.refs.setor.value = this.props.form.setor;
        };
        const edit = this.props.edit;
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <label htmlFor="nome" className="label">Nome</label>
                <div className="control">
                    <input type="text" className="input is-medium" id="nome" ref="nome" placeholder="Digite o nome " />
                </div>
                <label htmlFor="ramal" className="label">Ramal/Telefone</label>
                <div className="control">
                    <input id="ramal" type="text" className="input is-medium" ref="ramalOuTelefone" placeholder="Digite o ramal " />
                </div>
                <label htmlFor="setor" className="label">Setor</label>
                <div className="control">
                    <input id="setor" type="text" className="input is-medium" ref="setor" placeholder="Digite o setor " />
                </div>
                <div className="block">
                    
                    {edit &&
                        <a onClick={this.clearRefs} className="button is-danger is-medium" style={{marginLeft: '20px'}}>
                            <span className="icon is-small">
                                <i className="fa fa-close"></i>
                            </span>
                            <span>Cancelar</span>
                        </a>
                    }
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
            ramalOuTelefone: this.refs.ramalOuTelefone.value.trim(),
            setor: this.refs.setor.value.trim()
        };

        if (this.props.form.id == null) {
            this.props.onSave(data);
        } else {
            data.id = this.props.form.id;
            this.props.onUpdate(data);
        }
        this.refs.nome.focus();
        this.clearRefs()
    }

    clearRefs = (event) => {
        this.refs.nome.value = '';
        this.refs.ramalOuTelefone.value = '';
        this.refs.setor.value = '';
        this.props.form.id = null;
        this.props.onCancel(false);
    }

}