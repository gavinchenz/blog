---
title: Echarts
sidebar: false
prev: /accumulate/vue
next: false
---

>单个 echarts 组件 可以使用官方给出的 window.onresize 方法，但当一个页面级组件中出现多个 echarts 组件时， window.onresize 方法就失效了，需要在每个组件中使用 window.addEventListener 来监听 resize 的变化

``` js 
// 单个使用
window.onresize = function () {
    tochart.resize()
}

// 多个组件使用
window.addEventListener('resize', function () {
       tochart.resize()
})
```

详见下面案例:
``` vue
// 父组件
<template>
    <el-row class='top-view-com' :gutter="20">
        <el-col :span="6">
            <el-card shadow="hover">
                <total-sales/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <total-orders/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <today-users/>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card shadow="hover">
                <total-users/>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import TotalSales from './total-sales.vue'
import TotalOrders from './total-orders.vue'
import TotalUsers from './total-users.vue'
import TodayUsers from './today-users.vue'
    export default {
        name: 'TopView',
        components: {
            TotalSales,
            TotalOrders,
            TotalUsers,
            TodayUsers
        }
    }
</script>
```

``` vue
// 子组件 total-orders
<template>
    <common-card title='累计订单量' value='￥ 2,157,420'>
        <template>
            <div id="total-orders-chart" :style="chartStyle"></div>
        </template>
        <template v-slot:footer>
            <span>昨日订单量&nbsp;&nbsp;</span>
            <span class='emphasis'>￥20,000,000</span>
        </template>
    </common-card>
</template>

<script>
import MiXin from './mixin'
    export default {
        name: 'TotalOrders',
        mixins: [MiXin],
        mounted () {
            const tochart = this.$echarts.init(document.getElementById('total-orders-chart'))
            tochart.setOption({
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [{
                    type: 'line',
                    data: [620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530, 220, 620],
                    areaStyle: {
                        color: 'purple'
                    },
                    lineStyle: {
                        width: 0
                    },
                    itemStyle: {
                        opacity: 0
                    },
                    smooth: true
                }],
                grid: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            })
            // window.onresize = function () {
            //     tochart.resize()
            // }
            window.addEventListener('resize', function () {
                tochart.resize()
            })
        }
    }
</script>
```