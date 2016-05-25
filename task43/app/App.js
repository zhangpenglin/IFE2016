import React, {Component} from 'react';
import Gallery from './gallery'
export default class App extends Component {

    constructor() {
        super()
        this.state={
            images:[]
        }
    }

    handleAdd(){
        const imgCount=this.state.images.length+1
        if(imgCount==7){return}
        this.setState({
            images:this.state.images.concat(["images/"+imgCount])
        })
    }

    render() {

        return (
            <div>
                <div style={{height:'100px',width:'100px'}}></div>
                <button onClick={this.handleAdd.bind(this)}>增加图片</button>
                <Gallery images={this.state.images}></Gallery>

            </div>
        )
    }
}



