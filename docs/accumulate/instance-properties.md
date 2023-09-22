---
title: vue 实例属性
sidebar: false
prev: /accumulate/vue
next: false
---

::: tip
js模块中定义的变量，不是全局变量，它的作用域是当前模块内的。如果一定要设置一个全局变量，可以给window全局对象设置属性
:::

## 内置属性
每个组件实例（this）,都有以下内置属性：
- **$root**  --获取当前组件所属的根组件实例
- **$parent**  --获取当前组件所属的父组件实例
- **$el**  --获取当前组件实例
- **$children**  --获取当前组件所属的子组件实例 **[array]，它不保证顺序，也不是响应式的**
- **$options**  --初始化当前组件选项，**需要自定义 property 时很有用**

``` vue
<script>
export default {
  name:'home',
  myList:[ 1, 2, 3 ]
  data(){
    return {
       msg:''   
    }
  },
  mounted(){
    consolel.log(this.$options.name) // home
    console.log(this.$options.myList) // [ 1, 2, 3 ]
  }
}
</script>
```

- **$props**  --获取从父组件通过 props 传值所定义的属性  **它是响应式的->单向数据流**
- **$attrs**  --1.获取在当前组件上自定义的属性 **(除 props、class、style 外), 它也不是响应式的 使用时需谨慎**

``` vue
// 父组件
<template>
  <div>
    <my-header 
     class='my-header' style='margin:0;padding:0' 
     id='my_header' isOpen='open' :disabled='disabled' :aaa='1'>
    </my-header>
  </div>
</template>
<script>
  import MyHeader form '@/components/my-header.vue'
  export default {
    components:{ MyHeader },
    data(){
      return {
        disabled: true
      }
    }
  }
</script>
```

``` vue
// 子组件 -- my-header
<template>
  <div>
    <h2>my-header</h2>
    <div>{{$props}}</div>
    <div>{{$props.disabled}}</div>
    <div>{{$attrs}}</div>
    <div>{{$attrs.isOpen}}</div>
  </div>
</template>
<script>
  export default {
    props:{ 
      disabled:Boolean
    }
  }
</script>
```

``` js
// 页面效果
my-header
{ "disabled"：true }
true
{ "id": "my_header", "isOPen": "open", "aaa": '1' }
open
```

- **$attrs**  --2.将当前组件内定义的所有（data对象、methods对象），**除 props、style、class 外**的属性和方法都传递给内部子组件
``` vue
<template>
  <child-component v-bind='$attrs'>
    将非props传递的所有属性与方法传递给其内部
  </child-component>
</template>
```
::: tip
- 这类"属性透传"常常用于包装高阶组件时往内部传递属性，常用于爷孙组件之间传参。
- 比如：我们在扩展a组件时创建了组件b组件，然后在c组件中使用b，此时传递给c的属性中只有props里面声明的属性是给b使用的，其他的都是a需要的，此时就可以利用 v-bind="attrs"透传下去
- $attrs本身不是响应式的，除非访问的属性本身是响应式对象
:::

- **$refs**  --获取到当前组件内通过 ref 定义的所有 dom 元素或组件实例 **{Object}**
``` vue
<template>
  <div>
    <h2 ref='h2'></h2>
    <my-header ref='myheader'></my-header>
  </div>
</template>
<script>
  import MyHeader form '@/components/my-header.vue'
  export default {
    components:{ MyHeader },
    mounted(){
      consolel.log(this.$refs) // { a: h2, b: VueComponent{ $el:'myheader', ... }}
      console.log(this.$refs.a) // h2 dom 元素
      console.log(this.$refs.myheader) // VueComponent{ $el:'myheader', ... }}
    }
  }
</script>
```

- **$data**  --与当前组件内定义的data对象一致
``` vue
<script>
  export default {
    data:{ 
      foo: true
    },
    mounted(){
      consolel.log(this.$data.foo) // true
      console.log(this.foo) // true
    }
  }
</script>
```
- **$listeners**  --包含了父作用域中的 **(不含 .native 修饰器的) v-on 事件监听器**。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
::: tip
所谓 $listeners 其实就相当于一个中间件，当出现多级组件嵌套时，孙组件想传递数据给爷组件，那么就需要在父组件中给孙组件设置 v-on="$listeners"，然后通过 $emit方式及 自定义事件 @ 监听孙组件传递过来的数据。
:::

```vue
// 孙组件
<template>
  <div @click="dosomethings"></div>
</template>
<script>
  export default {
    name:'child',
    data:{ 
      foo: true
    },
    methods:{
      dosomethings() {
        this.$emit('doSome',true)
      }
    }
  }
</script>
```

``` vue 
// 父组件
<template>
  <div>
    <child v-on="$listeners"></child>
  </div>
</template>
<script>
  import child form './child.vue'
  export default {
    components:{child},
    name:'Parent',
  }
</script>
```

``` vue
// 爷组件
<template>
  <div>
    <parent @doSome='dosomethings'></parent>
  </div>
</template>
<script>
  import parent form './parent.vue'
  export default {
    components:{parent},
    methods:{
      dosomethings(bool) {
        console.log('bool',bool) // true
      }
    }
  }
</script>
```
- **$slots**
- **$scopedSlots**
