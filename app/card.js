import React, {Component} from 'react';
import './card.scss'

export default class Card extends Component {

    constructor(props) {
        super(props)
    }

    handleClick(url){
        window.location.href=url
    }

    render() {
        const {number,name,url,color}=this.props
        return (
            <div className={"card "+color} onClick={()=>{this.handleClick(url)}}>
                <div className="border"></div>
                <div className="number">
                    任务{number}
                </div>
                <div className="name">
                    {name}
                </div>
            </div>
        )
    }
}



