import React, { Component } from 'react';

export default class TabelaContatoComponent extends Component {
    
    render = () => {

        const _this = this;
        return (
            <div className="panel">
                <header className="panel-heading">
                    Lista de contatos
                </header>
                <div className="panel-block">
                    <form onSubmit={this.onSearch} className="control has-icon">
                        <input ref='filter' className="input is-small" type="search" placeholder="Search" />
                        <span className="icon is-small">
                            <i className="fa fa-search"></i>
                        </span>
                    </form>
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
                                        <td>{item.id}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.ramalOuTelefone}</td>
                                        <td>{item.setor}</td>
                                        <td>
                                            <a className="button is-primary" onClick={() => {_this.onEdit(item)}}>
                                                <span className="icon is-small">
                                                    <i className="fa fa-pencil-square-o"></i>
                                                </span>
                                            </a> <a onClick={() => _this.onRemove(item, index)} className="button is-danger">
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

    onSearch = (event) => {
        event.preventDefault();
        this.props.onSearch(this.refs.filter.value.trim());
    }

    onRemove = (item, index) => {
        let remove = confirm('Tem certeza que deseja remover esse contato?');
        if (remove) {
            this.props.itens.splice(index, 1);
            this.props.onRemove(item);
        }
        
    }

    onEdit = (item) => {
        this.props.onEdit({
            id: item.id,
            nome: item.nome,
            ramalOuTelefone: item.ramalOuTelefone,
            setor: item.setor
        });
    }
}