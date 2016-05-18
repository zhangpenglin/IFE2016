import './main.scss';
import React,{Component} from 'react';

export default class Modal extends Component{

    constructor(props){
        super(props)
        this.state={
            show:props.show
        }
    }

    maskClick(e){
        this.props.onClose(e)
    }

    componentWillReceiveProps(props){
        if(this.state.show!=props.show){
            this.setState({show:props.show})
        }

    }

    render(){
        if(!this.state.show) return null
        const {title,content}=this.props
        return(
            <div className="modalMask" onClick={this.maskClick.bind(this)}>
                <div className="modal">
                    <div className="title">{title}</div>
                    <div className="content">{content}</div>
                </div>
            </div>
        )
    }
}
