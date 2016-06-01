import React, {Component} from 'react';
import Card from './card'
import './card.scss'
export default class App extends Component {

    constructor() {
        super()
        this.state = {
            tasks: [
                {
                    name: "dsf",
                    number: "一",
                    url: 'task1/index.html'
                },{
                    name: "dsf",
                    number: "一",
                    url: 'task1/index.html'
                },{
                    name: "dsf",
                    number: "一",
                    url: 'task1/index.html'
                },{
                    name: "dsf",
                    number: "一",
                    url: 'task1/index.html'
                }
            ],
            colors:["red","purple","orange","green"]
        }
    }

    render() {

        return (
            <div className="container">
                {this.state.tasks.map((task,i)=> {
                    let c=i%4
                    return (
                        <Card {...task} color={this.state.colors[c]}></Card>
                    )
                })}
            </div>
        )
    }
}



