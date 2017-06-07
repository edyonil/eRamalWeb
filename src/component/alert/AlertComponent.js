import React, {Component} from 'react';

export default class AlertComponent extends Component{
    render() {
        
        const propsClassName = 'message ' + this.props.classPropsName;
        const propsShow = (this.props.show) ? {display:'block'} : {display:'none'};

        return (
            <div className={propsClassName} style={propsShow}>
                <div className="message-body">
                    {this.props.text}
                </div>
            </div>
        );
    }
}