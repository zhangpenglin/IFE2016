import './table.scss'
import React,{Component} from 'react'


class Sort extends Component{

    constructor(props){
        super(props)
    }

    render(){

        return (
            <div>
                <div className="triangle" onClick={this.props.ascSort}></div>
                <div className="triangle_transform"  onClick={this.props.descSort}></div>
            </div>
        )
    }
}


export default class Table extends Component{

    constructor(props){
        super(props)
    }

    ascSort(index){
        this.props.actions.ascSort(index)
    }
    descSort(index){
        this.props.actions.descSort(index)
    }

    render(){
        const {head,body}=this.props
        return(
            <table border="none">
                <thead>
                <tr>
                    {head.map((n,k)=>{
                        return(
                        <th>
                            {n.get('title')}
                        {n.get("sort")&&<Sort ascSort={this.ascSort.bind(this,k)} descSort={this.descSort.bind(this,k)}></Sort>}
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