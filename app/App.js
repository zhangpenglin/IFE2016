import React, {Component} from 'react';
import Card from './card'
import './card.scss'
export default class App extends Component {

    constructor() {
        super()
        this.state = {
            tasks: [{
                name: "零基础HTML编码",
                number: "一",
                url: 'task1/index.html'
            }, {
                name: "零基础HTML及CSS编码（一）",
                number: "二",
                url: 'task2/index.html'
            }, {
                name: "三栏式布局",
                number: "三",
                url: 'task3/index.html'
            }, {
                name: "定位和居中问题",
                number: "四",
                url: 'task4/index.html'
            }, {
                name: "零基础HTML及CSS编码（二）",
                number: "五",
                url: 'task5/index.html'
            }, {
                name: "通过HTML及CSS模拟报纸排版",
                number: "六",
                url: 'task6/index.html'
            }, {
                name: "响应式网格（栅格化）布局",
                number: "八",
                url: 'task8/index.html'
            }, {
                name: "Flexbox 布局练习",
                number: "十",
                url: 'task10/index.html'
            }, {
                name: "移动Web页面布局实践",
                number: "十一",
                url: 'task11/index.html'
            }, {
                name: "学习CSS 3的新特性",
                number: "十二",
                url: 'task12/index.html'
            }, {
                name: "零基础JavaScript编码（一）",
                number: "十三",
                url: 'task13/index.html'
            }, {
                name: "零基础JavaScript编码（二）",
                number: "十四",
                url: 'task14/index.html'
            }, {
                name: "零基础JavaScript编码（三）",
                number: "十五",
                url: 'task15/index.html'
            }, {
                name: "零基础JavaScript编码（四）",
                number: "十六",
                url: 'task16/index.html'
            }, {
                name: "零基础JavaScript编码（五）",
                number: "十七",
                url: 'task17/index.html'
            }, {
                name: "基础JavaScript练习（一）",
                number: "十八",
                url: 'task18/index.html'
            }, {
                name: "基础JavaScript练习（二）",
                number: "十九",
                url: 'task19/index.html'
            }, {
                name: "基础JavaScript练习（三）",
                number: "二十",
                url: 'task20/index.html'
            }, {
                name: "基础JavaScript练习（四）",
                number: "二十一",
                url: 'task21/index.html'
            }, {
                name: "JavaScript和树（一）",
                number: "二十二",
                url: 'task22/index.html'
            }, {
                name: "JavaScript和树（二）",
                number: "二十三",
                url: 'task23/index.html'
            }, {
                name: "JavaScript和树（三）",
                number: "二十四",
                url: 'task24/index.html'
            }, {
                name: "JavaScript和树（四）",
                number: "二十五",
                url: 'task25/index.html'
            }, {
                name: "行星与飞船（一)",
                number: "二十六",
                url: 'task26/index.html'
            },{
                name: "表单（一）单个表单项的检验",
                number: "二十九",
                url: 'task29/index.html'
            }, {
                name: "听指令的小方块（一）",
                number: "三十三",
                url: 'task33/index.html'
            }, {
                name: "听指令的小方块（二）",
                number: "三十四",
                url: 'task34/index.html'
            }, {
                name: "听指令的小方块（三）",
                number: "三十五",
                url: 'task35/index.html'
            }, {
                name: "听指令的小方块（三）",
                number: "三十六",
                url: 'task36/index.html'
            }, {
                name: "UI组件之浮出层",
                number: "三十七",
                url: 'task37/build/index.html'
            }, {
                name: "UI组件之排序表格",
                number: "三十八",
                url: 'task38/build/index.html'
            }, {
                name: "UI组件之冻结行列表格",
                number: "三十九",
                url: 'task39/build/index.html'
            }, {
                name: "UI组件之日历组件（一）",
                number: "四十",
                url: 'task40/build/index.html'
            }, {
                name: "UI组件之日历组件（二）",
                number: "四十一",
                url: 'task41/build/index.html'
            }, {
                name: "UI组件之日历组件（三）",
                number: "四十二",
                url: 'task42/build/index.html'
            }, {
                name: "多功能相册之拼图布局",
                number: "四十三",
                url: 'task43/build/index.html'
            }
            ],
            colors: ["red", "purple", "orange", "green"]
        }
    }

    render() {

        return (
            <div className="container">
                {this.state.tasks.map((task, i)=> {
                    let c = i % 4
                    return (
                        <Card {...task} color={this.state.colors[c]}></Card>
                    )
                })}
            </div>
        )
    }
}



