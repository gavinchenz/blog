---
title: Element-UI
sidebar: [[toc]]
prev: /accumulate/vue
next: false
---

# 目录
[[toc]]

## [el-select 中多选回显数据后没法重新选择和更改](https://blog.csdn.net/BADAO_LIUMANG_QIZHI/article/details/107913117)
> 原因 下拉框数据是循环别的接口得来的，因为数据层次太多，render 函数没有自动更新，需手动强制刷新。
``` vue
@change="$forceUpdate()"
```
``` vue
<template>
    <el-select v-model="form.bcArray"
     placeholder="请选择班次"
     multiple
     clearable
     @change="$forceUpdate()"
     :style="{ width: '200px' }"
    >
        <el-option v-for="dict in bcalldata"
        :key="dict.bcbh" :label="dict.bcmc" :value="dict.bcbh"
        />
    </el-select>
</template>
```

## el-select 监听被删除项并做拦截处理
``` html
<el-select v-model="changeObj.type" value-key="code" multiple placeholder="请选择" style='width:100%'>
    <el-option v-for="item in changeTypes" :key="item.code" :label="item.info" :value="item"/>
</el-select>
```
``` js
watch:{
    "changeObj.type":function(nV,oV){
        this.getChangeTypeFn(nV,oV);
    }
},
data() {
    return {
        //资质变更
        isQualifi:true,
        //人员变更
        isPerson:true,
        //设备变更
        isEquip:true,
    }
},
methods: {
    getChangeTypeFn(nV,oV){
        if(nV.length > oV.length){
            this.handleChangeType();
        }else if(nV.length < oV.length){
            if(!nV.length && oV.length){
                this.handleRemove(oV[0])
                return
            }
            nV.map(nItem=>{
                oV.map(oItem=>{
                if(nItem.info !== oItem.info){
                    this.handleRemove(oItem)
                } 
                })
            })
        }
    },
    handleRemove(oItem){
        // console.log('oItem',oItem)
        this.$confirm(`该操作将不保存${oItem.info}中已修改的内容，确认取消吗?`, '温馨提示：', {
            type:'warning', 
            confirmButtonText: '继续修改',
            cancelButtonText: '确认取消',
            closeOnClickModal:false,
            closeOnPressEscape:false,
            showClose:false
        })
        .then(() => {
            this.changeObj.type.push(oItem)
            this.handleChangeType();
        })
        .catch(() => {
            this.handleChangeType();
            return
        });
    },
    handleChangeType(){
        // console.log('change')
        //资质变更
        this.isQualifi = !this.changeObj.type.some(item => item.lable == 'cred');
        //人员变更
        this.isPerson = !this.changeObj.type.some(item => item.lable == 'person');
        //设备变更
        this.isEquip = !this.changeObj.type.some(item => item.lable == 'equip');
    },
}
```

## [el-tree 横向滚动条显示不出来](https://blog.csdn.net/xiaojiaoaozhangyi/article/details/103599947)
``` css
.el-tree { 
    display: inline-block;
    min-width: 100%;
}
```
示例：
``` vue
<template>
    <el-tree
     style="display: inline-block;min-width: 100%;"
     :data="deptOptions"
     :props="defaultProps"
     :expand-on-click-node="false"
     :filter-node-method="filterNode"
     ref="tree"
     default-expand-all
     @node-click="handleNodeClick"
    />
</template>
```

## el-tree 解决默认选中不生效
``` html
<!-- 1. el-tree 标签上绑定 currentNodeKey 字段   :current-node-key="currentNodeKey" -->
<el-tree ref='tree' :data="treeData" :props="defaultProps" highlight-current default-expand-all
          check-on-click-node :current-node-key="currentNodeKey" node-key="id" @node-click="handleNodeClick">
  <span class="custom-tree-node" slot-scope="{ node, data }">
    <i v-if="data.attachkeys" style="color:green" class="el-icon-check" />
    <span style="color:red;margin:0px 2px">{{data.status==='是'?'*':''}}</span>
    <span>{{ node.label }}</span>
  </span>
</el-tree>
```

``` js
//结合 setCurrentKey() 方法，在 $nextTick 中赋值
const { id, attachkeys, children } = defaultNode;
this.$nextTick(() => {
  this.$refs.tree.setCurrentKey(id);
  this.currentNodeKey = id;
});
```

## el-form 表单单独设置或根据条件设置验证规则
``` html
<!-- model ref rules 属性必须设置 -->
<el-form class="info-form" :inline="true" ref="baseForm" :rules='rules' :model="baseForm" :disabled="!detailObj.editable">
  <!-- 单独设置 prop 属性必须设置-->
  <el-form-item prop="deptId">
    <el-select filterable v-model="baseForm.deptId" clearable placeholder="==请选择==" @change="getCompanys">
      <el-option v-for="item in projectTeams" :key="item.itemid" :label="item.name" :value="item.deptid" />
    </el-select>
  </el-form-item>
  
  <!-- 单独设置 行内设置 rules 权重更高 -->
  <el-form-item prop="companyid" :rules='rules.companyid'>
    <el-select filterable v-model="baseForm.companyid" clearable
               @change="getcompanyId(baseForm.companyname)" placeholder="==请选择==">
      <el-option v-for="item in companys" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </el-form-item>
  
  <!-- 根据条件设置 -->
  <el-form-item prop="contractno" :rules='isHide ? [{required:false}] : rules.contractno '>
    <el-input v-model="baseForm.contractno" clearable style="width:200px;" />
  </el-form-item>
</el-form>
```
``` js
data(){
  return {
    rules: {
      deptId: [
        { required: true, message: '建设单位不能为空！', trigger: 'change' },
      ],
      contractno: [
        { required: true, message: '合同报审序号不能为空！', trigger: 'blur' },
      ],
      companyid: [
        { required: true, message: '施工单位不能为空！', trigger: 'change' },
      ],
    },
  }
},
methods: {
  _Validation(){
    let flag;
    this.$refs["baseForm"].validate((valid) => {
      if (valid) {
        flag = true;
      } else {
        flag = false;
      }
    });
    return flag
  },
}
```

## 去除 el-input 边框样式
``` scss
::v-deep{
      .el-input__inner,
      .el-textarea__inner,
      .el-select > .el-input {
          border: none;
          border-radius: 0;
      }
}
```

## el-input textarea 禁止拉伸
``` scss
//textarea 禁止拉伸
::v-deep{
      .el-textarea .el-textarea__inner{
        resize: none;
      }
}

//另：普通的 textarea 可以设置样式 禁止拉伸  --  resize: none;
// {
//  resize: none;
//}
```

## el-dialog 水平垂直居中
``` scss
<style lang='scss' scoped>
::v-deep {
  .el-dialog {
    // border-radius: 8px;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
```

## [el-table 实现表头内容换行显示 +el-table 行列变动问题](https://blog.csdn.net/weixin_48286936/article/details/111314742)

### 方法1
``` html
<el-table-column
 label="心得指标/已完成人数"
 prop="learnedCompleteCount"
 align="center"
 :render-header="renderheader"
 :key="Math.random()"
>
</el-table-column>
```
methods:
``` js
//实现table表头换行显示
renderheader(h, { column, $index }) {
  return h('span', {}, [
    h('span', {}, column.label.split('/')[0]),
    h('br'),
    h('span', {}, column.label.split('/')[1])
  ]);
},
```

### 方法2
``` html
<el-table-column header-align="center" align="center" width="60">
  <template slot="header">
    <div>密度</div>
    <div>(g/cm³)</div>
  </template>
  <template slot-scope="scope">
    <span>{{ scope.row.density }}</span>
  </template>
</el-table-column>
```

## [el-table 表格翻页后 滚动条回到顶部](https://blog.csdn.net/weixin_44933530/article/details/116448967)
::: tip
- table 固定高度
- 在触发翻页事件添加 (在 table 添加 ref=‘table’)
:::
``` js
this.$nextTick(() => {
  this.$refs.table.bodyWrapper.scrollTop = 0
})
```
浏览器出现滚动条
``` js
this.$nextTick(()=>{
  window.scrollTo(0,0)
})
```

## el-table 中 上传组件绑定行数据方法
``` html
<!-- el-button 中定义一个 click 事件 将行数据 赋值给一个变量 currRow -->
<el-table-column label="操作" align="center" width="100">
  <template slot-scope="scope">
      <el-upload class="upload-text" action="" :before-upload="beforeUpload" :limit="1">
        <el-button type="text" @click='currRow=scope.row'>上传</el-button>
      </el-upload>
  </template>
</el-table-column>
```

<!-- ## [el-table 动态表头、合并行，回显过滤案例](./demo.md) -->

## el-table 里嵌套 el-form 针对表单验证提示的样式修改

<!-- ![这是图片](/assets/img/Snipaste_2022-03-25_11-19-38.png "") -->
![这是图片](/assets/img/Snipaste_2022-03-25_11-20-05.png "")

``` css
.el-table .cell .el-form-item__content .el-form-item__error{
    top: -2px;
    display: -webkit-box; /*重点，不能用block等其他，将对象作为弹性伸缩盒子模型显示*/
    -webkit-box-orient: vertical; /*从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）*/
    -webkit-line-clamp: 3; /*行数，超出三行隐藏且多余的用省略号表示...*/
    line-clamp: 3;
    word-break: break-all;
    overflow: hidden;
    max-width: 100%;
}
```

## 解决 el-table 下边及右边边框白边的问题
``` scss
.el-table--group::after, .el-table--border::after, .el-table::before{
    background-color: #2D4A7A;
}
```

## 修改 el-table 样式
``` scss
::v-deep{
    .el-table {
        border-color: transparent;
        border-bottom: 1px solid #2D4A7A!important;
        border-right: 1px solid #2D4A7A!important;
        color: #CBD9E2;
    }
    // 解决 table 下边及右边边框白边的问题 start
    .el-table--group::after, .el-table--border::after, .el-table::before{
        background-color: #2D4A7A;
    }
    // 解决 table 下边及右边边框白边的问题 end
    .el-table, .el-table__expanded-cell {
        background-color: rgba(7, 25, 45,0.3);
    }
    // 表头边框及背景
    .el-table th {
        border: 1px solid #2D4A7A;
        background-color: #0072CF;
    }
    .el-table tr {
        background-color: transparent;
    }
    .el-table td {
        border: 1px solid #2D4A7A;
        // border-right: none ;
    }
    // 表头字体颜色
    .el-table thead {
        color: #CBD9E2;
    }
    // 行数据hover 样式
    .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color:  #0A3A66;
    }
    // 滚动条样式
    // 解决 el-table 滚动条样式调整后 最右边有个方框的问题 start
    .el-table__header-wrapper > table > colgroup > col:last-child{
        width: 0 !important;
    }
    .el-table--border th.el-table__cell.gutter:last-of-type{
        display: none!important;
    }
    .el-table__body-wrapper > table{
        width: 100% !important;
    }
    // 解决 el-table 滚动条样式调整后 最右边有个方框的问题 end

    .el-table__body-wrapper::-webkit-scrollbar{
        width:4px;
        height:4px;
    }
    .el-table__body-wrapper::-webkit-scrollbar-track{
        background: #054E86;
        border-radius:2px;
    }
    .el-table__body-wrapper::-webkit-scrollbar-thumb{
        background: #02B5FF;
        border-radius:10px;
    }
    .el-table__body-wrapper::-webkit-scrollbar-thumb:hover{
        background: #02B5FF;
    }
    .el-table__body-wrapper::-webkit-scrollbar-corner{
        background: #054E86;
    }
}
```

## el-XXX 组件绑定click事件无效得问题
``` html
<!-- 当你给一个vue组件绑定事件的时候，要加上 native，如果是普通的 html 元素，就不需要 -->

<!-- vue组件 el-XXX -->
<el-row v-for="file in dir.fileList" :key="file.id">
  <el-col :span="21" @click.native="changeFile(file)">
      ......
  </el-col>
</el-row>

<!-- 普通的html元素 -->
<ul v-for="file in dir.fileList" :key="file.id">
  <li :span="21" @click="changeFile(file)">
      ......
  </li>
</ul>
```