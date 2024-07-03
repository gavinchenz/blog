---
title: tooltip
sidebar: false
prev: /accumulate/vue
next: false
---

>echarts 动态展示 tooltip

``` js 
// utils/index.js
export function autoTooltip(chart, option, duration=1500) {
      
  let app = {
    currentIndex: -1,
  };
  setInterval(function () {
    const dataLen = option.series[0].data.length;

    // 取消之前高亮的图形
    chart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: app.currentIndex,
    });
    app.currentIndex = (app.currentIndex + 1) % dataLen;
    //console.log(app.currentIndex);
    // 高亮当前图形
    chart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: app.currentIndex,
    });
    // 显示 tooltip
    chart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: app.currentIndex,
    });
  }, duration);
}
```

``` js
// main.js
import { autoTooltip } from '@/utils/index'
Vue.prototype.autoTooltip = autoTooltip
```
调用

``` js {87}
initChart(){
    const barChart = echarts.init(document.getElementById("educ-bar-chart"));
    const barOption = {
        // backgroundColor: "#05224d",
        grid: {
            top: '8%',
            left: '1%',
            right: '8%',
            bottom: '8%',
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{a}:<br />{b}: {c}'
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: '#fff'
                },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
                textStyle: {
                    color: '#fff',
                    margin: 5,
                },
            },
            axisTick: {
                show: false,
            },
            data: ['硕士', '本科', '大专', '中专', '高中', '初中', '初中以下'],
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 7,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#009dff'
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color: '#fff',
                },
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            name: '学历分布',
            type: 'bar',
            barWidth: 18,
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#fff',
                }
            },
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
                        return colorList[params.dataIndex];
                    }
                }
            },
            data: [0, 3, 6, 0, 4, 49, 3]
        }]
    };
    barOption && barChart.setOption(barOption);

    this.autoTooltip(barChart, barOption)

    window.addEventListener("resize", () => {
        barChart.resize();
    });
},
</script>
```