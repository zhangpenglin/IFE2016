document.addEventListener("DOMContentLoaded", ready)


function ready() {
    /* 数据格式演示
     var aqiSourceData = {
     "北京": {
     "2016-01-01": 10,
     "2016-01-02": 10,
     "2016-01-03": 10,
     "2016-01-04": 10
     }
     };
     */
    var chartWrap = document.querySelector(".aqi-chart-wrap")
    // 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }

    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");
        var datStr = ''
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    function getOneDate(day, from) {
        var from = from || new Date("2016-01-01");
        return getDateStr(new Date(from.setDate(from.getDate() + day)))
    }

    function getData(sourceData) {
        var weekData = {}, weekNum = 1, totalWeekValue = 0;
        var monthData = {}, monthDay = 1, totalMonthValue = 0;
        for (var i = 1; i < 92; i++) {
            var key = getOneDate(i-1)
            var value = sourceData[key]
            var month = new Date(key).getMonth() + 1
            //week
            if (i % 7 == 0) {
                weekData['第' + weekNum + '周'] = Math.ceil(totalWeekValue / 7)
                totalWeekValue = 0
                weekNum++
            } else if (i == 91) {
                weekData['第' + weekNum + '周'] = Math.ceil(totalWeekValue / (91 % 7))
                console.log('第' + weekNum + '周' + '总数' + totalWeekValue + '天数' + 91 % 7)

            }
            else {
                totalWeekValue = totalWeekValue + value;
            }

            //month

            if (!monthData.hasOwnProperty('第' + month + '月')) {
                monthDay = 1
                totalMonthValue = 0
            }

            totalMonthValue = totalMonthValue + value;
            monthData['第' + month + '月'] = Math.ceil(totalMonthValue / monthDay)
            console.log('第' + month + '月' + '总数' + totalMonthValue + '天数' + monthDay)
            monthDay++

        }
        return {
            day: sourceData,
            week: weekData,
            month: monthData
        }
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

    // 用于渲染图表的数据
    var chartData = {
    }

    // 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: -1,
        nowGraTime: "day"
    }

    /**
     * 渲染图表
     */
    function renderChart() {
        var arr = []
        var currentData=chartData[pageState.nowSelectCity][pageState.nowGraTime]
        for(var key in currentData){
            var value=currentData[key]
            var color;
            switch (true) {
                case value >= 400:
                    color = "dark"
                    break;
                case value < 400 && value >= 300:
                    color = "purple"
                    break;
                case value < 300 && value >= 200:
                    color = "red"
                    break;
                case value < 200 && value >= 100:
                    color = "blue"
                    break;
                case value < 100 && value >= 0:
                    color = "green"
                    break;
                default:
                    break;
            }
            var str = "<div class=\"" + pageState.nowGraTime + " " + color + " \" style=\"height:" + value + "px\" title=\"" + key + "\"></div>"
            arr.push(str)
        }
        chartWrap.innerHTML = arr.join("")

    }

    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange(e) {
        // 确定是否选项发生了变化
        var e = e || window.event;
        var ele = e.target
        if (ele.value == pageState.nowGraTime) return
        console.log(ele)
        // 设置对应数据
        pageState.nowGraTime = ele.value
        // 调用图表渲染函数
        renderChart()
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange(e) {
        // 确定是否选项发生了变化
        var e = e || window.event;
        var ele = e.target
        if (ele.value == pageState.nowSelectCity) return
        console.log(ele.value)
        // 设置对应数据
        pageState.nowSelectCity = ele.value
        // 调用图表渲染函数
        renderChart()
    }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        var radio = document.querySelectorAll("#form-gra-time input[type='radio']")
        radio = [].slice.call(radio)
        radio.forEach(function (item) {
            item.addEventListener('click', graTimeChange)
        })
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var citySelect = document.getElementById("city-select")
        for (var city in aqiSourceData) {
            var op=document.createElement('option');
            op.text=city
            citySelect.add(op)
        }
        console.log(aqiSourceData)
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        citySelect.addEventListener("change", citySelectChange)
    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        //
        for (var city in aqiSourceData) {
            var data = aqiSourceData[city]
            chartData[city] = getData(data)
        }
        // 处理好的数据存到 chartData 中
        pageState = {
            nowSelectCity: '北京',
            nowGraTime: "day"
        }
    }

    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm()
        initCitySelector();
        initAqiChartData();
        renderChart()

    }

    init();
}