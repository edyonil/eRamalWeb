import React, {Component} from 'react';

export default class LoadingComponent extends Component{
    render() {
        const show = (this.props.show === true) ? {display:'block'} : {display: 'none'};
        return (
            <div className="loading" style={show}>
                <span className="icon">
                    <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                </span>
            </div>
        );
    }
}