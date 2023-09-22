---
title: css
sidebar: [[toc]]
prev: /accumulate/
next: /accumulate/javascript
---
# 目录
[[toc]]

## 一些不错的外链
- [:gift_heart: 42个来自《 CSS世界》中的实用技巧](https://mp.weixin.qq.com/s/eD0QM7gzjR89329lab_99g)
- [:gift_heart: 20个 CSS 快速提升技巧](https://mp.weixin.qq.com/s/v_NpdaOvplb7haGFEZYCpg)
- [:gift_heart: 十几个CSS高级常见技巧汇总](https://mp.weixin.qq.com/s/WkCjMAsQ5gS80XrAGHkUzg)
- [:gift_heart: 19 个实用的 CSS 技巧！](https://mp.weixin.qq.com/s/jlKYW6TfUyLXrPnZp3ZHIA)

## 单行和多行文本超出省略号
单行文本超出省略号

``` css
.single-line {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
}
```

多行文本超出省略号

``` css
.multi-line {
    display: -webkit-box; /*重点，不能用block等其他，将对象作为弹性伸缩盒子模型显示*/
    -webkit-box-orient: vertical; /*从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）*/
    -webkit-line-clamp: 3; /*行数，超出三行隐藏且多余的用省略号表示...*/
    line-clamp: 3;
    word-break: break-all;
    overflow: hidden;
    max-width: 100%;
}
```

## 禁止选中指定的文本

``` css
.no-selected {
  -webkit-user-select: none; /*Chrome/ Safari/ Opear新版本*/
  -moz-user-select: none; /*Foxfire */
  -ms-user-select: none; /*Internet Explorer/ Edge*/
  -o-user-select: none; /*Opear老版本*/
  -khtml-user-select: none; /* Konqueror */
  -webkit-touch-callout: none; /* iOS Safari */
  user-select: none;  
}
```

## calc 的使用注意
注意：减号两边一定要打空格，不然会失效
``` css
height:calc(100% - 20px);
```

## rem 的大小
实际 px 除以 10 就可以得到 rem 的大小
``` css
html {font-size:62.5%};  /* =10px */
body {font-size:1.4rem};  /* =14px */
h1 {font-size:2.4rem};  /* =24px */
```

## 盒模型从html开始继承
``` css
html {    
    box-sizing: border-box;  
}    
*, *:before, *:after {    
    box-sizing: inherit;  
}
```

## body上加入 line-height
``` css
body {
    line-height: 1.5;
}
```

## 文字少时居中，多时靠左
但是要注意，当p的内容为英文单词组成的时候，如果单词过长，而不是“pppppppppppppppppppppppppppppp”这样的，一次会被视为一个单位而造成超过div的尺寸。
如果你想要英文字符也有中文字符的效果的话，在p使用“ word-break：break-all”。
``` html
<div class="box">
    <p class="content"></p>
</div>
```
``` css
<style>
    .box {
        text-align: center;
    }
    .content {
        display: inline-block;
        text-align: left;
    }
</style>
```

## 文字模糊效果 毛玻璃效果
``` css
<style>
    // 文字模糊效果
    .text {
        color: transparent;
        text-shadow: #111 0 0 5px;
    }
    // 毛玻璃效果
    .div {
        filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }
</style>
```

## 去除 input[type=number] 的默认样式
去掉默认箭头样式、禁用滚轮事件
``` css
<style>
input[type=number] {
    -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
```

## img 禁止手机保存图片
``` html
 <img :src="imgSrc" alt="" class="bg-img">
```
``` css
.bg-img {
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
```

## 利用伪类扩大点击范围
``` html
<span class='span'>click me <span>
```
``` css
.span{
  position:relative;
}

.span::before{
  content:'';
  position:absolute;
  top:-15px;
  left:-15px;
  bottom:-15px;
  right:-15px;
}
```

## css3 实现三角形（上下左右）
``` html
<div class="kailong"></div>
```
1.向上
``` css
.kailong{
  width:0;
  height:0;
  border-right:10px solid transparent;
  border-left:10px solid transparent;
  border-bottom:10px solid red;
}
```
2.向下
``` css
.kailong{
  width:0;
  height:0;
  border-right:10px solid transparent;
  border-left:10px solid transparent;
  border-top:10px solid red;
}
```
3.向左
``` css
.kailong{
    width:0;
    height:0;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-right:10px solid red;
}
```
4.向右
``` css
.kailong{
    width:0;
    height:0;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-left:10px solid red;
}
```
## 绘制小箭头
``` css
.box {
  padding: 15px;
  background-color: #ffffff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow {
  display: inline-block;
  margin-right: 10px;
  width: 0;
  height: 0;
  /* Base Style */
  border: 16px solid;
  border-color: transparent #cddc39 transparent transparent;
  position: relative;
}

.arrow::after {
  content: "";
  position: absolute;
  right: -20px;
  top: -16px;
  border: 16px solid;
  border-color: transparent #fff transparent transparent;
}
/*下*/
.arrow.bottom {
  transform: rotate(270deg);
}
/*上*/
.arrow.top {
  transform: rotate(90deg);
}
/*左*/
.arrow.left {
  transform: rotate(180deg);
}
/*右*/
.arrow.right {
  transform: rotate(0deg);
}
```

## [CSS修改滚动条的样式](https://www.cnblogs.com/wjw1014/p/13564175.html)

有一些相应的参数，可以根据自己的需要设置：
- ::-webkit-scrollbar 滚动条整体部分
- ::-webkit-scrollbar-thumb 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
- ::-webkit-scrollbar-track 滚动条的轨道（里面装有Thumb）
- ::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
- ::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
- ::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
- ::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
### 1.修改浏览器默认的滚动条样式
``` css
    /* 整个滚动条 */
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
 
    /* 滚动条有滑块的轨道部分 */
    ::-webkit-scrollbar-track-piece {
      background-color: transparent;
      border-radius: 5px;
    }
 
    /* 滚动条滑块(竖向:vertical 横向:horizontal) */
    ::-webkit-scrollbar-thumb {
      cursor: pointer;
      background-color:#f2f2f2;
      border-radius: 5px;
    }
 
    /* 滚动条滑块hover */
    ::-webkit-scrollbar-thumb:hover {
      background-color: #999999;
    }
 
    /* 同时有垂直和水平滚动条时交汇的部分 */
    ::-webkit-scrollbar-corner {
      display: block;    /* 修复交汇时出现的白块 */
    }
```
### 2.修改某个div的滚动条
``` css
/*修改某个div的滚动条样式*/
div::-webkit-scrollbar{
  width:5px;
  height:5px;
}
div::-webkit-scrollbar-track{
  background: #fff;
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #c1c1c1;
  border-radius:10px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #a8a8a8;
}
div::-webkit-scrollbar-corner{
  background: #f1f1f1;
}
```

## 两栏布局实现瀑布流
``` css
<style scoped> 
  .waterfall-container {
    /*分几列*/
    column-count: 2;
    /*列间距，可有可无，默认30px*/
    /*column-gap: 0;*/
  }

  .waterfall-item {
    /*不留白，不知道什么意思可以取消这个样式试试*/
    break-inside: avoid;
  }
</style>
```
::: warning
这个列表显示顺序是 左边 123右边456，不符合正常展示逻辑；
可以使用js对数据进行预处理；
大致逻辑如下：
:::
``` js
const oldList = [1, 2, 3, 4, 5, 6, 7]

// 使用reduce函数接受一个初始值{ 0: [], 1: [], length: 2 },
// 初始值包含两个空数组，和一个数组长度(Array.from方法要求将对象转数组时对象内要有这个属性) 
// 在reduce函数内根据索引做余2判断，因为分两列，余0的加入第一个数组，余1的加入第二个数组 
// 最后reduce返回遍历完的对象 {0:[1,3,5,7],1:[2,4,6],length:2}
// 使用Array.from({0:[1,3,5,7],1:[2,4,6],length:2}) 得到 数组 [[1,3,5,7],[2,4,6]]
// 解构数组 使用concat合并，完事
const newList = [].concat(...(Array.from(oldList.reduce((total, cur, index) => {
  total[index % 2].push(cur)
  return total
}, { 0: [], 1: [], length: 2 }))))

console.log(newList)
```
这样处理一下就可以 让列表展示顺序变为 左边 1， 3， 5， 7 右边 2， 4， 6

## [纯CSS导航栏下划线跟随效果](https://mp.weixin.qq.com/s/EF3IjuQJWmliGPrOfC29tQ)

``` html 
<ul>
  <li>不可思议的CSS</li>
  <li>导航栏</li>
  <li>光标小下划线跟随</li>
  <li>PURE CSS</li>
  <li>Nav Underline</li>
</ul>
```
``` css 
ul,li{
    list-style: none;
}
ul{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
li {
    padding:0 10px;
    position: relative;
    cursor: pointer;
}
li::before {
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    width: 0;
    height: 100%;
    border-bottom: 2px solid #000;
    transition: 0.2s all linear;
}

li:hover::before {
    width: 100%;
    left: 0;
}

li:hover ~ li::before {
    left: 0;
}
```

## Grid布局IE模式下的兼容写法 
``` html
<div class='box'>
    <p class='item item1'>
    <p class='item item2'>
    <p class='item item2'>
</div>
```
``` css
.box{
    width: 100%;
    height: 100%;
    display: -ms-grid; /* ie 下要加 -ms- 前缀 */
    display: grid;
    -ms-grid-columns: (33.33%)[3];  /*  ie 下不支持repeat，必须用这种写法 (百分比或 1fr )[length] */
    grid-template-columns: repeat(3,33.33%);
    -ms-grid-rows: 1fr; /* ie 下不支持 auto */
    grid-template-rows: auto;
}

/* IE没有自动流动的网格元素，需要为每个网格元素分配一个特定的网格位置 */

.item1{
  -ms-grid-column: 1;
}

.item2{
  -ms-grid-column: 2;
}

.item3{
  -ms-grid-column: 3;
}
``` 

## 解决父元素设置 flex:1 后子元素 height 失效问题
``` scss
/* 圣杯布局种，header 高度 75px footer 高度 40  */
.header{
  width:100%;
  height: 75px;
}
.parents{
      flex:1;
      width:100%;
      .child {
        width:100%;
        height: calc(100vh - 115px);
        overflow-y: auto;
      }
}
.footer{
  width:100%;
  height: 40px;
}
```