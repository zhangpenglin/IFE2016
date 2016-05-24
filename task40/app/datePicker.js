/**
 * Created by gx on 2016/5/23.
 */
import './datePicker.scss'
import React, {Component} from 'react'

class DatePickerClass {
    constructor(year, month) {
        let thisDate = new Date()
        this.year = year || thisDate.getFullYear()
        this.month = month || thisDate.getMonth() + 1
        this.days = []
        this.getDays()
    }

    //获取某年某月展示在ui上的日期 一共42天
    getDays() {
        const ONEDAY = 86400000
        let date = new Date()
        date.setFullYear(this.year, this.month - 1, 1)
        console.log('full year' + date.toDateString())
        let day1 = date.getTime()
        console.log('get time' + day1)
        let prevDayCount = 1
        let thisDayCount = 0
        //获取上一个月的天数
        while (true) {
            date.setTime(day1 - prevDayCount * ONEDAY)
            let d = date.getDay()
            var newDate = new Date(date.getTime())
            this.days.unshift(newDate)
            console.log(newDate)
            if (d == 0 && prevDayCount != 1) {
                break
            }
            prevDayCount++
        }
        console.log(prevDayCount)
        //获取当月及下一月
        while (42 - prevDayCount - thisDayCount) {
            date.setTime(day1 + thisDayCount * ONEDAY)
            var newDate = new Date(date.getTime())
            this.days.push(newDate)
            console.log(newDate)
            thisDayCount++
        }
        this.chunk()
        console.log(this.days)
    }

    next() {
        if (this.month == 12) {
            return new DatePickerClass(this.year + 1, 1)
        } else {
            return new DatePickerClass(this.year, this.month + 1)
        }
    }

    prev() {
        if (this.month == 1) {
            return new DatePickerClass(this.year - 1, 12)
        } else {
            return new DatePickerClass(this.year, this.month - 1)
        }
    }

    chunk() {
        let chunked = [[], [], [], [], [], []]
        let chunkIndex = 0
        this.days.forEach((x, i, c)=> {
            if ((i % 7 == 0 || i == c.length) && i != 0) {
                chunkIndex++
            }
            chunked[chunkIndex].push(x)

        })
        this.days = chunked
    }

}

export default class DatePicker extends Component {

    constructor(props) {
        super(props)
        this.state={
            dp :new DatePickerClass(),
            selectedDay:null
        }

    }

    getDayClass(n) {
        const d=n.getDay()
        let className
        if(this.state.selectedDay==n){
            return 'selected'
        }
        if(n.getMonth()+1==this.state.dp.month){
            if(d==0||d==6){
                className ="weekEnd"
            }else{
                className='currentMonth'
            }
        }else{
            className='notCurrentMonth'
        }
        return className
    }

    handlePrev(){
        this.setState({
            dp:this.state.dp.prev()
        })
    }
    handleNext(){
        this.setState({
            dp:this.state.dp.next()
        })
    }

    handleSelectedDay(n,e){
        this.setState({
            selectedDay:n
        })
    }

    render() {
        const dp=this.state.dp
        return (<div>
                <div className="date"> {this.state.selectedDay?this.state.selectedDay.toLocaleDateString():""}</div>
                <div className="container">

                    <div className="header">
                        <div className="triangle-left" onClick={this.handlePrev.bind(this)}></div>
                        <div className="triangle-right" onClick={this.handleNext.bind(this)}></div>
                        {dp.year+'年'+dp.month+"月"}
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <td className="weekEnd">日</td>
                            <td>一</td>
                            <td>二</td>
                            <td>三</td>
                            <td>四</td>
                            <td>五</td>
                            <td className="weekEnd">六</td>
                        </tr>
                        </thead>
                        <tbody>
                        {dp.days.map((x)=> {
                            return (
                                <tr>
                                    {x.map((n)=> {
                                        return <td className={this.getDayClass(n)} onClick={this.handleSelectedDay.bind(this,n)}>{n.getDate()}</td>
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }


}