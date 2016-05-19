import './main.scss';
import React, {Component} from 'react';

export default class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: props.show
        }
    }

    maskClick(e) {
        if (e.target != this.refs['mask']) return
        this.props.onClose(e)
    }

    confirmClick(e) {
        this.setState({show: false})
        this.props.confirmCallback(e)
    }

    cancelClick(e) {
        this.setState({show: false})
        this.props.cancelCallback(e)

    }

    componentWillReceiveProps(props) {
        if (this.state.show != props.show) {
            this.setState({show: props.show})
        }

    }


    render() {
        if (!this.state.show) return null
        const {title, content}=this.props
        return (
            <div className="modalMask" onClick={this.maskClick.bind(this)} ref="mask">
                <div className="modal">
                    <div className="title">{title}</div>
                    <div className="content">
                        <div className="text"></div>
                        {content}
                        <div className="buttons">
                            <button className="confirm" onClick={this.confirmClick.bind(this)}>确定</button>
                            <button className="cancel" onClick={this.cancelClick.bind(this)}>取消</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
