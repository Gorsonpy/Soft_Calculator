/*
 * @Author: gorsonpy
 * @Date: 2023-09-28 19:20:23
 * @LastEditors: gorsonpy
 * @LastEditTime: 2023-09-29 00:22:19
 * @FilePath: \FZU_Calculator\test\index.test.js
 * @Description: 
 */
const { JSDOM } = require('jsdom');

const jsDomIntance = new JSDOM(`
<!DOCTYPE html>
<body>

    <div class="center">
        <h1>$Gorsonpy$ 的 计算器</h1>
        <a href="https://github.com/guuibayer/simple-calculator" target="_blank"><i class="fa fa-github"></i></a>
        <form name="calculator">
            <button type="button" id="clearf" class="btn other" value="clearf" onclick="clearf();">$CE$</button>
            <button type="button" id="cbackf" class="btn other" value="backf" onclick="backf();">⌫</button>
            <input type="text" id="display">
            <br>
            <input type="button" class="btn number" value="7" onclick="get(this.value);">
            <input type="button" class="btn number" value="8" onclick="get(this.value);">
            <input type="button" class="btn number" value="9" onclick="get(this.value);">
            <input type="button" class="btn operator" value="+" onclick="get(this.value);">
            <input type="button" class="btn operator" value="(" onclick="get(this.value);">
            <input type="button" class="btn operator" value="log" onclick="get_with_left_bracket(this.value);">
            <input type="button" class="btn operator" value="tan" onclick="get_with_left_bracket(this.value);">
            <input type="button" class="btn operator" value="atan" onclick="get_with_left_bracket(this.value);">
            <br>
            <input type="button" class="btn number" value="4" onclick="get(this.value);">
            <input type="button" class="btn number" value="5" onclick="get(this.value);">
            <input type="button" class="btn number" value="6" onclick="get(this.value);">
            <input type="button" class="btn operator" value="*" onclick="get(this.value);">
            <input type="button" class="btn operator" value=")" onclick="get(this.value);">
            <button type="button" class="btn operator" value="x^y" onclick="pow();">$x^y$</button>
            <input type="button" class="btn operator" value="asin" onclick="get_with_left_bracket(this.value);">
            <input type="button" class="btn operator" value="!" onclick="get(this.value);">
            <br>
            <input type="button" class="btn number" value="1" onclick="get(this.value);">
            <input type="button" class="btn number" value="2" onclick="get(this.value);">
            <input type="button" class="btn number" value="3" onclick="get(this.value);">
            <input type="button" class="btn operator" value="-" onclick="get(this.value);">
            <input type="button" class="btn operator" value="sin" onclick="get_with_left_bracket(this.value);">
            <input type="button" class="btn operator" value="sqrt" onclick="get_with_left_bracket(this.value);">
            <input type="button" class="btn operator" value="acos" onclick="get_with_left_bracket(this.value);">
            <input type="button" class="btn operator" value="%" onclick="get(this.value);">
            <br>
            <input type="button" class="btn number" value="0" onclick="get(this.value);">
            <input type="button" class="btn operator" value="." onclick="get(this.value);">
            <input type="button" class="btn operator" value="/" onclick="get(this.value);">
            <input type="button" class="btn other" value="=" onclick="calculates();">
            <input type="button" class="btn operator" value="cos" onclick="get_with_left_bracket(this.value);">
            <button type="button" class="btn number" value="Π" onclick="get(this.value);">π</button>
            <button type="button" class="btn number" value="e" onclick="get(this.value);">$e$</button>
            <button type="button" class="btn operator" value="x^2" onclick="pow2();">$x^2$</button>
        </form>
    </div>
       <script src="./src/math.js" type="application/javascript"></script>
</body>
</html>
`)
const window = jsDomIntance.window; // window 对象
const document = window.document; // document 对象
global.document = document;

const math = require("mathjs")
// math.config({
//     number: 'BigNumber',
//     precision: 64,
// });
global.math = math
const {
    pow,
    pow2,
    get_with_left_bracket,
    clearf,
    backf,
    get,
    calculates
} = require("../src/index");
const { TextDecoderStream } = require('stream/web');


test("test add 7 + 8 = 15", () => {
    clearf();
    get(7)
    get("+")
    get(8)
    calculates()
    expect(document.getElementById("display").value).toBe("15")
})

test("test sub 1 - 2 = -1", () => {
    clearf();
    get(1)
    get("-")
    get(2)
    calculates()
    expect(document.getElementById("display").value).toBe("-1")
})

test("test mul 3 * 4 = 12", () => {
    clearf();
    get(3)
    get("*")
    get(4)
    calculates()
    expect(document.getElementById("display").value).toBe("12")
})

test("test div 9 / 9 = 1", () => {
    clearf();
    get(9)
    get("/")
    get(9)
    calculates()
    expect(document.getElementById("display").value).toBe("1")
})

test("test by zero 7 / 0 = Infinity", () => {
    clearf();
    get(7)
    get("/")
    get(0)
    calculates()
    expect(document.getElementById("display").value).toBe("Infinity")
})

test("test back 56 => 5", () => {
    clearf()
    get(5)
    get(6)
    backf()
    expect(document.getElementById("display").value).toBe("5")
})

test("get begin with errMsg", () => {
    document.getElementById("display").value = "undefined";
    get(2)
    expect(document.getElementById("display").value).toBe("2")
})


test("pow, 9 ^ 0 = 1", () => {
    clearf();
    get(9)
    pow()
    get(0)
    calculates()
    expect(document.getElementById("display").value).toBe("1")
})

test("pow2, 9 ^ 2 = 81", () => {
    clearf();
    get(9)
    pow2()
    calculates()
    expect(document.getElementById("display").value).toBe("81")
})

test("get_with_left_bracket, 5 * sqrt(4) = 10", () => {
    clearf();
    get(5)
    get("*")
    get_with_left_bracket("sqrt")
    get(4)
    get(")")
    calculates()
    expect(document.getElementById("display").value).toBe("10")
})

test("pow with errMsg, ^ 3 = ^ 3", () => {
    clearf();
    document.getElementById("display").value = "undefined";
    pow()
    get(3)
    expect(document.getElementById("display").value).toBe("^3")
})

test("pow2 with errMsg ^ 2 = ^ 2", () => {
    clearf();
    document.getElementById("display").value = "undefined";
    pow2()
    expect(document.getElementById("display").value).toBe("^2")
})

test("get_with_left_bracket with errMsg sqrt(25) = 5", () => {
    clearf();
    document.getElementById("display").value = "undefined";
    get_with_left_bracket("sqrt")
    get(2)
    get(5)
    get(")")
    calculates()
    expect(document.getElementById("display").value).toBe("5")
})

test("eval with blank str", () => {
    clearf();
    calculates()
    expect(document.getElementById("display").value).toBe("")
})

test("eval with err formula", () => {
    clearf();
    get(3)
    get("(")
    calculates()
    expect(document.getElementById("display").value).toBe("undefined")
})