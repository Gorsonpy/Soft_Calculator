# FZU_Calculator
### 0.页面及功能展示

[源代码地址](https://github.com/Gorsonpy/Soft_Calculator)
![在这里插入图片描述](https://img-blog.csdnimg.cn/da08bfbcebe149aaac1f369e738f10d6.gif#pic_center)

### 1. PSP表格
| PSP                                     | Personal Software Process Stages        | 预估耗时（分钟） | 实际耗时（分钟） |
| :-------------------------------------- | :-------------------------------------- | :--------------- | :--------------- |
| Planning                                | 计划                                    | 60               | 60               |
| • Estimate                              | • 估计这个任务需要多少时间              | 15               | 15               |
| Development                             | 开发                                    | 700              | 700              |
| • Analysis                              | • 需求分析 (包括学习新技术）            | 100              | 100              |
| • Design Spec                           | • 生成设计文档                          | 60               | 60               |
| • Design Review                         | • 设计复审                              | 30               | 30               |
| • Coding Standard                       | • 代码规范 (为目前的开发制定合适的规范) | 30               | 30               |
| • Design                                | • 具体设计                              | 60               | 60               |
| • Coding                                | • 具体编码                              | 300              | 300              |
| • Code Review                           | • 代码复审                              | 45               | 45               |
| • Test                                  | • 测试（自我测试，修改代码，提交修改）  | 60               | 60               |
| Reporting                               | 报告                                    | 90               | 90               |
| • Test Repor                            | • 测试报告                              | 30               | 30               |
| • Size Measurement                      | • 计算工作量                            | 15               | 15               |
| • Postmortem & Process Improvement Plan | • 事后总结, 并提出过程改进计划          | 45               | 45               |
|                                         | 合计                                    | 850              | 850              |
### 2.解题思路描述
1. 数据结构课上说过，运算式的表达本质是一个栈的过程。因为一个表达式往往会含有非常多的匹配情况（加上三角函数、阶乘等尤其如此，优先级、合不合法等很难判断清楚），所以在一个短暂的工期内想自己实现出一个不出纰漏、完美的轮子是很困难且几乎不可能的。所以后端计算的逻辑有必要用现成的计算库。
2. 语言的选择，一开始我选用的Go+Fyne图形库的方案。然而因为Go本身GUI的基础薄弱，Fyne库提供的页面也很差强人意。后遂考虑HTML+CSS+JS的方案。中途有考虑过要不要用Go-webview2，把计算逻辑移到Go来做。发现实现较为困难，且有些大材小用，遂放弃。
3. 原先没学过JS，但听说过精度很差，需要寻找一个精度比较高的计算库来完成计算。

### 3.设计实现过程
写一个Toy计算器并不是很大的工程，**核心思路其实就是创建两个字符串，一个字符串作为显示给用户看的字符串，一个字符串作为最后扔给JS计算库计算的字符串。**
```js
var expression = ""; //实际运算的表达式
```
1. 整体的HTML结构是一个表单：
```html
<div class="center">
        <h1>$Gorsonpy$ 的 计算器</h1>
        <a href="https://github.com/guuibayer/simple-calculator" target="_blank"><i class="fa fa-github"></i></a>
        <form name="calculator">
            <button type="button" id="clear" class="btn other" value="clear" onclick="clear();">$CE$</button>
            <button type="button" id="clear" class="btn other" value="BACK" onclick="back();">⌫</button>
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
            <input type="button" class="btn operator" value="!" 
...
```

2. 按钮关联一些函数:
```js
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
        ...
```

3. 按下等号的时候计算:
```js
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
                expression = "";
            }
        };
```
### 4.程序性能改进
主要是选一个好轮子。因为性能的瓶颈一定是在于正则匹配和解析表达式。自己去胡乱优化也不会有什么效果。我选用的是Math.js库而非原生的eval()，因为原生的eval()算的不准，而且会有安全问题，因为eval总是试图解析字符串内容，无论其是否具有危害。
```js
math.config({
            number: 'BigNumber',
            precision: 64,
        });
```
下面是一个$0.1 + 0.2 = ?$的问题，对比一下：
原生的eval：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2530ed72e9ed4ceebe6ecf336434ee45.png)
math. evaluate:
![在这里插入图片描述](https://img-blog.csdnimg.cn/f4fcd10d96a64ece9e4fc14046652502.png)
### 5.异常处理
就是在math.evaluate解析的时候catch异常，并赋予用户一个提示信息.此外，对于除0，溢出等情况，evaluate自动会给出一个infinity。
```js
try {
	result = math.evaluate(expression, customSymbols);
} catch (error) {
	console.error("An error occurred while evaluating the expression: " + error);
    result = errMsg; // 设置一个错误提示 
}
```
### 6.单元测试展示
在单元测试这里我遇到了一些困难，主要是JS的这个引文件功能实在太bug了？会遇到各种各样难以明说的错误。因为要做单元测试用Jest框架，就要把之前内嵌在html的js文件分离出来，然而这样又会有新的问题，就是js之间互相引用的问题。经过一番折腾我得出一个折中的办法，要做单元测试的时候把文件分离出来做单元测试，要运行的话把js代码贴回去。
因为我的代码很短，所以单元测试很快就做好了：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2ef876b76c5b479099b7091a972f105a.png)
```js
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
...
```


### 7.心路历程和收获
&ensp;&ensp;为了设计一个比较美观的前端页面，我去学习了HTML+CSS+JS这前端三件套。体验到了前端的魅力所在。我学习了如何让自己的代码变得用户友好，能够考虑到各种错误情况并给予用户错误信息，而不是程序崩溃，同时学习了如何对代码做好单元测试。

