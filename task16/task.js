document.addEventListener("DOMContentLoaded", ready)


/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
function ready() {

  var aqiData = {};
  var aqiTable = document.getElementById("aqi-table")
  var cityInput = document.getElementById("aqi-city-input")
  var valueInput = document.getElementById("aqi-value-input")


  function trim(str) {　　
    return str.replace(/(^\s*)|(\s*$)/g, "");　　
  }

  /**
   * 从用户输入中获取数据，向aqiData中增加一条数据
   * 然后渲染aqi-list列表，增加新增的数据
   */
  function addAqiData() {
    var city = trim(cityInput.value)
    var value = trim(valueInput.value)
      //空字符判断
    if (city == "" || value == "") {
      alert("输入不得为空!")
      return;
    }
    //重复判断
    if (aqiData.hasOwnProperty(city)) {
      alert(city + "已存在!")
      return;
    }
    //
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
      alert("城市名必须为中英文字符！")
      return;
    }

    if (!value.match(/^\d+$/)) {
      alert("空气质量指数必须为整数！")
      return;
    }
    aqiData[city] = value;

  }

  /**
   * 渲染aqi-table表格
   */
  function renderAqiList() {
    var arr = ["<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"]
    for (var city in aqiData) {
      var str = "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>"
      arr.push(str)
    }
    aqiTable.innerHTML = arr.join("")
  }

  /**
   * 点击add-btn时的处理逻辑
   * 获取用户输入，更新数据，并进行页面呈现的更新
   */
  function addBtnHandle() {
    addAqiData();
    renderAqiList();
  }

  /**
   * 点击各个删除按钮的时候的处理逻辑
   * 获取哪个城市数据被删，删除数据，更新表格显示
   */
  function delBtnHandle(delBtn) {
    // do sth.
    var ele = delBtn.parentElement.parentElement
    var city = ele.querySelector("td").innerText
    delete aqiData[city]
    renderAqiList();
  }

  function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn = document.getElementById("add-btn")
    addBtn.addEventListener("click", addBtnHandle)
      // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

    aqiTable.addEventListener("click", function(e) {
      var e = e || window.event;
      var tar = event.target
      if (tar && tar.nodeName.toUpperCase() == "BUTTON") {
        delBtnHandle(tar)
      }
    })
  }

  init();
}