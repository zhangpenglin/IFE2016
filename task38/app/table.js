import './table.scss'
import React,{Component} from 'react'


class Sort extends Component{

    constructor(props){
        super(props)
    }
    ascSort(){
        this.props.actions.ascSort("数学")
    }
    descSort(){
        this.props.actions.descSort("数学")
    }
    render(){

        return (
            <div>
                <div className="triangle" onClick={this.ascSort.bind(this)}></div>
                <div className="triangle_transform"  onClick={this.descSort.bind(this)}></div>
            </div>
        )
    }
}


export default class Table extends Component{

    constructor(props){
        super(props)
    }

    render(){
        const {head,body}=this.props
        console.log(this.props)
        return(
            <table border="none">
                <thead>
                <tr>
                    {head.map((n)=>{
                        return(
                        <th>
                            {n.title}
                        {n.sort&&<Sort {...this.props} ></Sort>}
                        </th>)
                    })}
                </tr>
                </thead>
                <tbody>
                {body.map((n)=>{
                    return <tr>
                        {n.map((m)=>{
                            return <td>{m}</td>
                        })}
                    </tr>
                })}
                </tbody>
            </table>
        )
    }


}