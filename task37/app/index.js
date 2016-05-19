import './main.scss';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal'
class App extends Component {

    constructor(){
        super()
        this.state={
            show:false
        }
        this.modal = {
            title: "这里是标题",
            content: '这里是内容'
        }
    }

    show(){
        this.setState({show:true})
    }

    hide(){
        this.setState({show:false})
    }

    confirmCallback(){
        console.log('confirm clicked')
    }
    cancelCallback(){
        console.log('cancel clicked')
    }
    render() {
        const {title,content}=this.modal;

        return (
            <div className="container">
                <button onClick={this.show.bind(this)}>显示</button>
                <Modal
                    show={this.state.show}
                    title={title}
                    content={content}
                    onClose={this.hide.bind(this)}
                    confirmCallback={this.confirmCallback}
                    cancelCallback={this.cancelCallback}
                >

                </Modal>
            </div>
        )
    }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);

