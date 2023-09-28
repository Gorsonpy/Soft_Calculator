/*
 * @Author: gorsonpy
 * @Date: 2023-09-27 18:14:34
 * @LastEditors: gorsonpy
<<<<<<< HEAD
 * @LastEditTime: 2023-09-28 23:30:44
=======
 * @LastEditTime: 2023-09-29 00:04:16
>>>>>>> e1f30526b997068755cb94fb2c8de3e8164b5b42
 * @FilePath: \FZU_Calculator\src\index.js
 * @Description: 
 */


// 单元测试要把math.config注释掉
//  math.config({
//      number: 'BigNumber',
//      precision: 64,
//  });

// 创建一个自定义符号表
const customSymbols = {
    Π: math.pi,
    e: math.e,
};


// 现在 Math.js

const errMsg = "undefined";
var expression = ""; //实际运算的表达式

function clearf() {
    document.getElementById("display").value = "";
    expression = "";
}
function backf() {
    str = document.getElementById("display").value;
    document.getElementById("display").value = str.slice(0, -1);
    console.log(expression);
    expression = expression.slice(0, -1);
    console.log(expression);
}
/* recebe os valores */
function get(value) {
    if (document.getElementById("display").value === errMsg) {
        document.getElementById("display").value = "";
    }
    document.getElementById("display").value += value;
    expression += value;
}
function pow() {
    if (document.getElementById("display").value === errMsg) {
        document.getElementById("display").value = "";
    }
    document.getElementById("display").value += "^";
    expression += "^";
}
function pow2() {
    if (document.getElementById("display").value === errMsg) {
        document.getElementById("display").value = "";
    }
    document.getElementById("display").value += "^2";
    expression += "^2";
}
function get_with_left_bracket(value) {
    if (document.getElementById("display").value === errMsg) {
        document.getElementById("display").value = "";
    }
    document.getElementById("display").value += value;
    document.getElementById("display").value += "(";
    expression += value;
    expression += "(";
}



/* calcula */
function calculates() {
    document.getElementById("display").value = "";
    var result = "";

    if (expression === "") {
        document.getElementById("display").value = "";
        expression = "";
    } else {
        try {
            result = math.evaluate(expression, customSymbols);
        } catch (error) {
            console.error("An error occurred while evaluating the expression: " + error);
            result = errMsg; // 设置一个错误提示
        }
        document.getElementById("display").value = result;
        expression = document.getElementById("display").value;
    }
};


module.exports = {
    pow,
    pow2,
    get_with_left_bracket,
    clearf,
    backf,
    get,
    calculates
}