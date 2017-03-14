import React, { Component } from 'react';

export default class TabelaContatoComponent extends Component {
    
    render() {

        const _this = this;
        return (
            <div className="panel">
                <header className="panel-heading">
                    Lista de contatos
                </header>
                <div className="panel-block">
                    <p className="control has-icon">
                        <input className="input is-small" type="text" placeholder="Search" />
                        <span className="icon is-small">
                            <i className="fa fa-search"></i>
                        </span>
                    </p>
                </div>
                <div className="panel-block panel-block-tabela">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Ramal/Telefone</th>
                                <th>Setor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {_this.props.itens.map(function (item, index) {
                                return (
                                    <tr key={index}>
                                        <td>{item['.key']}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.ramal}</td>
                                        <td>{item.setor}</td>
                                        <td>
                                            <a className="button is-primary" onClick={() => {_this.onEdit(item)}}>
                                                <span className="icon is-small">
                                                    <i className="fa fa-pencil-square-o"></i>
                                                </span>
                                            </a> <a onClick={() => _this.onRemove(item)} className="button is-danger">
                                                <span className="icon is-small">
                                                    <i className="fa fa-trash"></i>
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    onRemove = (item) => {
        this.props.onRemove(item);
    }

    onEdit = (item) => {
        this.props.onEdit({
            id: item['.key'],
            nome: item.nome,
            ramal: item.ramal,
            setor: item.setor
        });
    }
}