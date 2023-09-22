---
title: vue
sidebar: [[toc]]
prev: /accumulate/javascript
next: false
---

# 目录
[[toc]]

## 一些值得借鉴的外链
- [:gift_heart: 使用 async await 封装 axios](https://www.jianshu.com/p/4168efdc172b)
- [:gift_heart: vue-axios interceptors(拦截器)实际应用](https://www.jianshu.com/p/ff8541e0976a)
- [:gift_heart: vuex 最简单、最详细的入门文档](https://segmentfault.com/a/1190000009404727)
- [:gift_heart: 10个Vue开发技巧](https://mp.weixin.qq.com/s/_W-0JoGtaJPXDjF6Mx6u4Q)
- [:gift_heart: Vue.js巧妙运用修饰符](https://mp.weixin.qq.com/s/EKmNajAY5Cg-5Y4n-JxqOQ)


## 常用组件库
- [:gift_heart: vue-count-to  --简单好用的一个数字滚动插件](https://www.npmjs.com/package/vue-count-to)[:point_right: 教程](https://www.jianshu.com/p/1d53ea7d4ee0)
- [:gift_heart: NProgress](https://github.com/rstacruz/nprogress)[:point_right: 官网](https://ricostacruz.com/nprogress/)
## 解决 vue 中使用 scss 时，依赖 node-sass 和 sass-loader 的版本问题
- node-v     16.11.1
``` node
npm install sass-loader@10.2.0 node-sass@6.0.1 --save-dev
```
- node-v     16.11.1 以下版本
``` node 
npm install sass-loader@7.3.1 node-sass@4.14.1 --save-dev
```

## 使用 data- 实现事件代理
``` html
<template>
  <div class='wrapper' @click='onClick'>
    <ul>
      <li v-for='(item,index) in items' 
       :key='index' 
       :data-index='index'>
       {{item}}
      </li>  
    </ul>
  </div>
</template>
```
``` js
<script>
export default {
  data(){
    return {
      items:['项目1','项目2','项目3'],
    }
  },
  methods:{
    onClick(e){
      const index = parseInt(e.target.getAttribute('data-index'));
      console.log('index',index)    
    }
  }
}
</script>
```
## Vue 使用 NProgress
``` git
$ npm install --save nprogress 
$ 或者
$ yarn add nprogress
```
使用
``` js
//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  //NProgress.done(); 
})

router.afterEach(() => {
  NProgress.done()
})
```

## vue 动态路由
``` js
//router.js
import Vue from 'vue';
import VueRouter from "vue-router";
import { getRouters } from '@/utils/http';
import store from '@/store'
Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        component:()=> import('@/components/Login.vue')
    }
]

const router = new VueRouter({
    linkActiveClass:'selected',
    routes
})

router.beforeEach(async(to, from, next)=>{
    /*
    **  法一：不带缓存
    **  动态生成路由数据
    **  addRoutes();
    **  next();
    */

    //法二：带缓存
    if(store && store.state.asyncRouters.length == 0){
        //vuex中,无路由数据 发送请求
        const res = await getRouters();
        //添加动态路由数据
        // [res.data] 因为后台返回了一个对象,若为数组：res.data;
        const data = routesData([res.data]);
        //缓存
        store.dispatch('setAsyncRouters',[res.data]);
        //动态添加路由
        router.addRoutes(data);
        next({...to});
    }else{
        next();
    }
})

// 法一：不带缓存
// function addRoutes(){
//     getRouters().then(res=>{
//         //调用拼接路由函数
//         const data = routesData(res.data);
//         //动态添加路由
//         router.addRoutes(data)
//     })
// }

//拼接数据(路由)
function routesData(result){
    result.forEach(item=>{
        if(item.component === 'layout'){
            routes.push({
                path:item.path,
                //name:item.name,
                redirect:item.redirect,
                component:()=> import(`@/Layout`),
                children:getChildren(item.children)
            })
        }else{
            routes.push({
                path:item.path,
                //name:item.name,
                redirect:item.redirect,
                component:()=> import(`@/views/${item.component}`),
                children:getChildren(item.children)
            })
        }
    })
    return routes;
}

//处理子路由
function getChildren(result){
    if(result && result.length){
        const children = [];
        result.forEach(item=>{
            children.push({
                path:item.path,
                //name:item.name,
                redirect:item.redirect || '',
                component:()=> import(`@/views/${item.component}`),
                children:getChildren(item.children)
            })
        })
        return children;
    }
    return [];
}

export default router;
```

``` js
//store.js
import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        asyncRouters:[]
    },
    getters:{
        getAsyncRouters:state=> state.asyncRouters,
    },
    mutations:{
        setAsyncRouters(state, data){
            state.asyncRouters = data;
        }
    },
    actions:{
        setAsyncRouters({commit}, data){
            commit('setAsyncRouters', data)
        }
    },
    modules:{

    }
})
```
## this.$set 的基本使用
this.$set(你要改变的数组/对象，你要改变的位置/key，你要改成什么value)
``` js
this.$set(this.arr, 0, "OBKoro1"); // 改变数组
this.$set(this.obj, "c", "OBKoro1"); // 改变对象
```

## v-for循环绑定对象
``` js
data() {
    return{
     obj: {
        ob: "OB",
        koro1: "Koro1"
      },
      model: {
        ob: "默认ob",
        koro1: "默认koro1"
      }   
    }
},
```
``` html
<!-- input 就跟数据绑定在一起了，那两个默认数据也会在 input 中显示 -->
<div v-for="(value,key) in obj">
   <input type="text" v-model="model[key]">
</div>
```
## intersection-observer 监听某元素是否在可视区域内
``` git
npm i intersection-observer
```
用法：
``` js
const header = document.querySelector('.box')
const observer = new IntersectionObserver((mutations) => {
  let status = mutations[0].isIntersecting
  console.log('是否可见'，status )
})
observer.observe(header )
```
``` js
function waterfallFlow (f_el, i_el,) {

    const box = document.querySelector(f_el)
    const innerItem = document.querySelector(i_el)
    // 列数 = 向下取整（box 宽度 / innerItem 宽度）
    // const rows = 5
    let rows = Math.floor(box.innerWidth / innerItem.width)

    // 监听页面大小变化 
    // timer 防抖
    let timer = null
    window.addEventListener('resize',() => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            rows = Math.floor(box.innerWidth / innerItem.width)
        }, 1000)
    })
    
    const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    
    const num = Math.ceil(arr.length / rows)
    
    let result = arr.map((item, index, array) => {
        if (index < rows) {
            return array.slice(index * num, (index + 1) * num)
        } else {
            return false
        }
    })
    
    result = result.filter(item => item)

}
```

## [canvas绘制验证码](./verification-code.md)

## [vue之实例属性](./instance-properties.md)