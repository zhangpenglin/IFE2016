(function () {

    var input = document.getElementById('nameInput')
    var button = document.getElementById('validate')
    var error = document.getElementById('error')
    var form = document.forms[0]
    button.addEventListener('click', handler)
    var validater = {
        empty: {
            error: "姓名不能为空",
            className: 'empty'
        },
        invalid: {
            error: "请输入长度为4-16的字符",
            className: 'invalid'
        },
        valid: {
            error: '格式正确',
            className: "valid"
        }
    }

    function validate(o) {
        form.className = o.className
        error.innerText = o.error
    }

    function handler() {
        var name = input.value;
        var length = getLength(name)
        switch (true) {
            case length == 0:
                validate(validater.empty)
                break;
            case length >= 4 && length <= 16:
                validate(validater.valid)
                break;
            default:
                validate(validater.invalid)
                break;
        }
    }

    function getLength(str) {
        var inputLength = 0;
        for (var i = 0; i < str.length; i++) {
            var countCode = str.charCodeAt(i);
            if (countCode >= 0 && countCode <= 128) {
                inputLength += 1;
            } else {
                inputLength += 2;
            }
        }
        return inputLength;
    }
})()