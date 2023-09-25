---
title: js
sidebar: [[toc]]
prev: /accumulate/css
next: /accumulate/vue
---
# 目录
[[toc]]

## 一些不错的外链
- [:gift_heart: 每个 JavaScript 工程师都应懂的33个概念](https://mp.weixin.qq.com/s/DQMeY6Iu7kG2WPHb2R9rRw)
- [:gift_heart: ES6 中 Promise 方法总结](https://mp.weixin.qq.com/s/1cbG6D1mWbLtUmwu2OIjQA)
- [:gift_heart: 15个必须知道的 JavaScript 数组方法](https://mp.weixin.qq.com/s/oPGPZXmkjOVc6xbTZLLUAw)


## [常用的MIME类型](./mime.md)
## [js 关闭浏览器窗口的实现方式](./browser.md)

## [JS递归无限级目录树](./recursion.md)
## 在数组中查询某个元素的下标
``` js
_findIndex(list,item){
  return list.findIndex(i =>{
    return i.id === item.id;
  })
}
```

## splice 方法新增、删除数组的元素
::: tip
数组的 splice 的方法会改变原数组，返回的是删除后的数组元素
:::

### 增加
``` js
// arr.splice(数组的索引,个数,插入的数据); 比如
var arr = ['1','2','3','4'];
arr.splice(1,0,'新增');
console.log(arr); // 结果：["1", "新增", "2", "3", "4"]
// 第一个1表示从arr[1],开始，0是删除0个数据，'新增' 表示往数组新增的元素
```

### 删除
``` js
// arr.splice('数组下标，从第几个元素开始'，'个数')
var arr = ['1','2','3','4'];
arr.splice(1,1); // 删除只有2个参数，
console.log(arr); // 结果：["1", "3", "4"]
```

### 总结
``` js
//  arr.splice(index,howmany,item1…)
//  index:必须，规定从哪里开始添加或删除元素，只能是数字
//  howmany：必须，规定应该删除多少元素。必须是数字，但可以是 “0”。
//           如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素
//  item1…：可选，要添加到数组的新元素
```

## 弱密码集合
``` js
//true 存在 应验证不通过 false 验证通过
export function isPassPsw(str) {
    const pwdUnSecurity = [
        "123456", "123456789", "111111", "5201314", "12345678", "123123", "password",
        "1314520", "123321", "7758521", "1234567", "5211314", "666666", "520520", "woaini",
        "520131", "11111111", "888888", "hotmail.com", "112233", "123654", "654321",
        "1234567890", "a123456", "88888888", "163.com", "000000", "yahoo.com.cn", "sohu.com",
        "yahoo.cn", "111222tianya", "163.COM", "tom.com", "139.com", "wangyut2", "pp.com",
        "yahoo.com", "147258369", "123123123", "147258", "987654321", "100200", "zxcvbnm",
        "123456a", "521521", "7758258", "111222", "110110", "1314521", "a321654", "00000000",
        "q123456", "123123123", "aaaaaa", "a123456789", "qq123456", "11112222", "woaini1314",
        "a123123", "a111111", "a5201314", "z123456", "liuchang", "a000000", "asd123",
        "88888888", "1234567890", "woaini520", "147258369", "123456789a",
        "woaini123", "q1q1q1q1", "a12345678", "qwe123", "123456q", "121212", "asdasd", "999999",
        "1111111", "123698745", "137900", "159357", "iloveyou", "222222", "31415926",
        "9958123", "woaini521", "18n28n24a5", "abc123", "123qwe", "dearbook",
        "00000000", "123123123", "1234567890", "88888888", "111111111", "147258369", "987654321",
        "aaaaaaaa", "1111111111", "66666666", "a123456789", "11223344", "1qaz2wsx", "xiazhili",
        "789456123", "87654321", "qqqqqqqq", "000000000", "qwertyuiop", "qq123456",
        "iloveyou", "31415926", "12344321", "0000000000", "asdfghjkl", "1q2w3e4r", "123456abc",
        "0123456789", "123654789", "12121212", "qazwsxedc", "abcd1234", "12341234", "110110110",
        "asdasdasd", "22222222", "123321123", "abc123456", "a12345678", "123456123",
        "a1234567", "1234qwer", "qwertyui", "123456789a", "qq.com", "369369",
        "ohwe1zvq", "xiekai1121", "19860210", "1984130", "81251310", "502058", "162534",
        "690929", "601445", "1814325", "as1230", "zz123456", "280213676", "198773", "4861111",
        "328658", "19890608", "198428", "880126", "6516415", "111213", "195561", "780525",
        "6586123", "caonima99", "168816", "123654987", "qq776491", "hahabaobao", "198541",
        "540707", "leqing123", "5403693", "123123", "RAND#a#8", "hotmail.com", "112233",
        "123654", "654321", "1234567890", "a123456"
    ];
    return pwdUnSecurity.includes(str);
}
```
应用示例
``` vue
<script>
import { isPassPsw } from '@/utils/index'
export default { 
  data() {
    const validatePass = (rule, value, callback) => {
        //密码中必须包含大小写 字母、数字、特称字符，至少8个字符，最多30个字符；
        const pwdRegex =  new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}');
        const isPassGex = pwdRegex.test(value)
        if (value === '') {
            callback(new Error('请输入密码'));
        } else if(value.toString().length <= 12 ){
            callback(new Error('密码长度必须大于12位！'));
        } else if(value.toString().length > 30 ){
            callback(new Error('密码长度必须小于等于30位！'));
        }  else if(!!isPassPsw(value)){
            callback(new Error('密码太简单，请重新组合！'));
        } else if(!isPassGex){
            callback(new Error('密码必须为大小写字母/数字/特殊符号的组合！'));
        }else{
            callback();
        }
    };
    return {
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      },
    }
  },
}
</script>
```

## JS 数组去重
``` js
//二维数据去重        
function unique(arr) {
  let obj = {}
  return arr.filter((item, index) => {
    // 防止key重复
    let newItem = item + JSON.stringify(item)
    return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
  })
}
```

## switch 
``` js
switch (value) {
    case '1':
    case '2':
    case '3':
        console.log('今天张三没有学习');
        break;
    case '4':
        console.log('今天王五没有学习');
        break;
    default:
        console.log('今天大家都有学习');
        break;
}
```

## get 请求入参对象解析
``` js
// 准备要发送的数据
const query = {
  sKey:"小米10pro"
}

// 解析query数据
function queryParse(query){
    let queryText = "";
    for(let key in query){
        queryText += `${key}=${query[key]}&`;
  }
    return '?' + queryText.slice(0,-1);
}
// '?sKey=小米10pro'
```

## 前端页面 window.print() 实现局部打印
> - 近期在做一个需要局部打印页面考试成绩的功能，总体来说有两个思路:
> 1. dom替换
> 2. 新窗口打印
> - dom 替换会导致事件失效，如果重新加载的话又会影响到体验；而新窗口缺因为样式问题也不好解决，都不满足项目的需求，于是把自己的方法贴上来:

``` vue
<template>
  <div id="printcontent"> //给需要打印的区域一个id
    <div @click="report">打印</div>  
  </div>
</template>
<script>
  export default {
    methods: {
      report(){
        let printDiv = document.createElement('div')//创建一个新的div
        printDiv.innerHTML = document.getElementById("printcontent").innerHTML//把要打印的内容放到一个新的div里
        printDiv.style.position = 'fixed'//div宽高设置100%；position设为fixed或者absolute占满屏幕，把当前页面内容全部覆盖住
        printDiv.style.left = '0'
        printDiv.style.top = '0'
        printDiv.style.width = '100%'
        printDiv.style.height = '100%'
        printDiv.style.zIndex = '100000'
        printDiv.style.background = '#fff'
        printDiv.style.overflow = 'auto'
        document.body.appendChild(printDiv)//在body中添加创建的新结点
        window.print()
        document.body.removeChild(printDiv)//打印成功后删除创建的这个节点
      }
    }
  }
</script>
<style lang="stylus" scoped>
@page {   //css @page 设置 纸张方向
  size: a4 //定义为a4纸
  margin: 0mm 0mm //页面的边距，主要是用来去掉页眉页脚的
}
</style>
```

代码很简单，把要打印的内容放到一个新的div里，div 宽高设置 100%；position 设为 fixed 或者 absolute 占满屏幕，把当前页面内容全部覆盖住，调用 window.print() 之后再把该 div 删除。这样既会使本来的样式生效，也不会有替换 dom 产生的各种问题。

## js tree 递归根据 id 找父节点、子节点，对象等
### 数据结构
``` js
{
    "msg": "操作成功",
    "code": 200,
    "data": [
        {
            "id": 0,
            "parentId": -1,
            "fileType": null,
            "folderName": "根目录文件夹",
            "createBy": null,
            "remark": null,
            "children": [
                {
                    "id": 1,
                    "parentId": 0,
                    "fileType": null,
                    "folderName": "测试文件夹level1",
                    "createBy": 0,
                    "remark": "",
                    "children": [
                        {
                            "id": 28,
                            "parentId": 1,
                            "fileType": null,
                            "folderName": "测试文件夹level2",
                            "createBy": 1,
                            "remark": null,
                            "children": [
                                {
                                    "id": 29,
                                    "parentId": 28,
                                    "fileType": null,
                                    "folderName": "测试文件夹level3",
                                    "createBy": 1,
                                    "remark": null,
                                    "children": [
                                        
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```
### 1. 根据id查询id所对应的对象
``` js
/*
*@param  需要遍历的数组
*@param  查询所需要的id
*/
function getObjById(list,id){
    //判断list是否是数组
    if(!list instanceof Array){
      return  null
    }
     
    //遍历数组
    for(let i in list){
        let item = list[i]
        if(item.id === id) {
            return item
        }else{
            //查不到继续遍历
            if(item.children){
                let value = getObjById(item.children, id)
                //查询到直接返回
                if(value){
                    return value
                }
            }
        }
    } 
}
```

### 2. 根据id查询本节点和所有父级节点
``` js
//根据id查询该节点和所有父级节点
function getParentsById(list,id){
    for (let i in list) {
        if (list[i].id === id) {
            //查询到就返回该数组对象
            return [list[i]]
        }

        if (list[i].children) {
            let node = getParentsById(list[i].children, id)
            if (node !== undefined) {
                //查询到把父节点连起来
                return node.concat(list[i])
            }
        }
    }    
}
```

### 3. 根据id查询该节点和所有子节点
``` js
//根据id查询该节点和所有父级节点
function getParentsById(list, id){
    for (let i in list) {
        if (list[i].id === id) {
            //查询到就返回该数组对象
            return [list[i]]
        }

        if (list[i].children) {
            let node = getParentsById(list[i].children, id)
            if (node !== undefined) {
                //查询到把父节点连起来
                return node.concat(list[i])
            }
        }
    }    
}

// list 为已查询到的节点children数组，returnvalue为返回值（不必填）
function getChildren (list, returnValue = []) {
    for(let i in list){
        //把元素都存入returnValue
        returnValue.push(list[i])
        if (list[i].children) {
            getChildren(list[i].children, returnValue)
        }
    }
    return returnValue
}
    
//age:
let obj = getObjById( treeList,"1")
if(obj && obj.children){
    let childrenList = getChildren(obj.children)
    console.log(childrenList)
} else {
    console.log("没有该节点或者没有子元素")
}
```