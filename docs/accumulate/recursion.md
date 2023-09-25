---
title: js 递归
sidebar: auto
prev: /accumulate/javascript
next: false
---

## JS 递归无限级目录树
``` js
var data = [
  {
    name:'1',
    children:[
      {
        name:'1-1',
        children:[
          {name:'1-1-1',children:[]},
          {name:'1-1-2',children:[]},
          {
            name:'1-1-3',
            children:[
              {name:'1-1-3-1',children:[]},
              {name:'1-1-3-2',children:[]},
              {name:'1-1-3-3',children:[]},
            ]
          },
        ]
      },
      {name:'1-2',children:[]},
      {name:'1-3',children:[]},
    ]
  },
  {name:'2',
    children:[
      {name:'1-1',children:[]},
      {name:'1-2',children:[]},
      {name:'1-3',children:[]},
    ]
  },
  {name:'3',
    children:[
      {name:'1-1',children:[]},
      {name:'1-2',children:[]},
      {name:'1-3',children:[]},
    ]
  },
  {name:'4',
    children:[
      {name:'1-1',children:[]},
      {name:'1-2',children:[]},
      {name:'1-3',children:[]},
    ]
  },
]
```

### 两级实现方式（思路整理）
``` js
window.onload = function(){
  var _treeStr = '<ul>';
  for(var i=0; i<data.length; i++){
    _treeStr += '<li>' + data[i].name + '</li>'; //一级数据
    if(data[i].children){
      _treeStr +=  '<ul>';
      for(var j=0; j<data[i].children.length; j++){
        _treeStr += '<li>' + data[i].children[j].name + '</li>'; //二级数据
      }
      _treeStr += '</ul>';
    }
  }
  _treeStr += '</ul>';
  document.querySelector('.tree-lists').innerHtml = _treeStr;
}
```

### 运用递归，实现无限级
``` js 
window.onload = function(){
  function createTree(data){
    var _treeStr = '<ul>';
    for(var i=0; i<data.length; i++){
      _treeStr += '<li>' + data[i].name + '</li>'; //一级数据
      if(data[i].children && data[i].children.length){
        _treeStr += createTree(data[i].children);
      }
    }
    _treeStr += '</ul>';
    return _treeStr;
  }
  document.querySelector('.tree-lists').innerHtml = createTree(data);
}
```