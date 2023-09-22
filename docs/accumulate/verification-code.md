---
title: 验证码
sidebar: auto
prev: /accumulate/vue
next: false
---

##  canvas绘制验证码
### 原生版
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body{text-align: center}
        canvas{border:1px solid greenyellow}
    </style>
</head>
<body>
        <h1>canvas绘制验证码</h1>
        <canvas width="120" height="40" id="c1">
        </canvas>
        <script>
            //1.新建一个函数产生随机数
            function rn(min,max){
                return  parseInt(Math.random()*(max-min)+min);
            }
            //2.新建一个函数产生随机颜色
            function rc(min,max){
                var r=rn(min,max);
                var g=rn(min,max);
                var b=rn(min,max);
                return `rgb(${r},${g},${b})`;
            }
            //3.填充背景颜色,颜色要浅一点
            var w=120;
            var h=40;
            var c1 = document.getElementById("c1");
            var ctx=c1.getContext("2d");
            ctx.fillStyle=rc(180,230);
            ctx.fillRect(0,0,w,h);
            //4.随机产生字符串
            var pool="ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890";
            for(var i=0;i<4;i++){
                var c=pool[rn(0,pool.length)];//随机的字
                console.log('c',c)
                var fs=rn(18,40);//字体的大小
                var deg=rn(-30,30);//字体的旋转角度
                ctx.font=fs+'px Simhei';
                ctx.textBaseline="top";
                ctx.fillStyle=rc(80,150);
                ctx.save();
                ctx.translate(30*i+15,15);
                ctx.rotate(deg*Math.PI/180);
                ctx.fillText(c,-15+5,-15);
                ctx.restore();
            }
            //5.随机产生5条干扰线,干扰线的颜色要浅一点
            for(var i=0;i<5;i++){
                ctx.beginPath();
                ctx.moveTo(rn(0,w),rn(0,h));
                ctx.lineTo(rn(0,w),rn(0,h));
                ctx.strokeStyle=rc(180,230);
                ctx.closePath();
                ctx.stroke();
            }
            //6.随机产生40个干扰的小点
            for(var i=0;i<40;i++){
                ctx.beginPath();
                ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
                ctx.closePath();
                ctx.fillStyle=rc(150,200);
                ctx.fill();
            }
        </script>
</body>
</html>
```
### vue组件版
``` vue
<template>
    <div class="custom-code" :style='styleObject' @click="clickMe">
        <canvas v-show="myCode" :width="width" :height="height" id="canvas-code"></canvas>
        <div v-show="!myCode" class="no-code">点击获取验证码</div>
    </div>
</template>

<script>
    export default {
        props:{
            width:{
                type: Number,
                default: 120
            },
            height:{
                type: Number,
                default: 40
            },
            code:{
                type: [String, Number],
                default:''
            }
        },
        computed: {
            styleObject () { 
                let style = {};          
                style.width = `${this.width}px`; 
                style.height = `${this.height}px`; 
                return style; 
            },
            myCode() {
                return this.code ? this.code : ''
            } 
        },
        watch: {
            myCode ( nV ) {
                if (nV) {
                    this.initCodeFn()
                }
            },
        },
        mounted() {
            if (this.myCode) {
                this.initCodeFn()
            }
        },
        methods:{
            initCodeFn() {
                const w = this.width;
                const h = this.height;
                const canvasCode = document.getElementById("canvas-code");
                const ctx = canvasCode.getContext("2d");
                // 填充背景颜色,颜色要浅一点
                ctx.fillStyle = this._randomColor(180, 230);
                ctx.fillRect(0, 0, w, h);

                const codeArr = this.code.toString().split('')
                codeArr.map((item,index) => {
                    const fontsize = this._randomNumber(18, 40); // 字体的大小
                    const deg = this._randomNumber(-30,30); // 字体的旋转角度
                    ctx.font = fontsize + 'px Simhei';
                    ctx.textBaseline = "top";
                    ctx.fillStyle = this._randomColor(80,150);
                    ctx.save();
                    ctx.translate( 30 * index + 15, 15);
                    ctx.rotate( deg * Math.PI / 180 );
                    ctx.fillText( item, -15+5, -15 );
                    ctx.restore();
                })

                // 随机产生5条干扰线,干扰线的颜色要浅一点
                for( let i = 0; i < 5; i++ ){
                    ctx.beginPath();
                    ctx.moveTo(this._randomNumber(0,w),this._randomNumber(0,h));
                    ctx.lineTo(this._randomNumber(0,w),this._randomNumber(0,h));
                    ctx.strokeStyle = this._randomColor(180, 230);
                    ctx.closePath();
                    ctx.stroke();
                }

                // 随机产生40个干扰的小点
                for( let i = 0; i < 40; i++ ){
                    ctx.beginPath();
                    ctx.arc(
                        this._randomNumber(0, w),
                        this._randomNumber(0, h),
                        1,
                        0,
                        2 * Math.PI 
                    );
                    ctx.closePath();
                    ctx.fillStyle = this._randomColor(150,200);
                    ctx.fill();
                }

            },
            // 产生一个随机数
            _randomNumber(min, max){
                return  parseInt( Math.random() * (max - min) + min );
            },
            // 产生一个随机颜色
            _randomColor(min,max){
                const r = this._randomNumber(min,max);
                const g = this._randomNumber(min,max);
                const b = this._randomNumber(min,max);
                return `rgb(${r},${g},${b})`;
            },
            clickMe() {
                this.$emit('getCode')
            }
        }
    }
</script>

<style lang="scss" scoped>
.custom-code{
    cursor: pointer;
    .no-code{
        width:100%;
        height:100%;
        text-align:center;
        line-height:2.8;
        font-size:14px;
        color:#666;
        border: 1px solid #333;
    }
}
</style>
```
### 调用示例
``` vue
<template>
  <div class="code">
    <h1>This is an code page</h1>
    <CustomCode :code="code" @getCode="getCode"></CustomCode>
  </div>
</template>

<script>
import CustomCode from '../components/CustomCode.vue'
export default {
  components: {
    CustomCode
  },
  data() {
    return {
      code: ''
    }
  },
  methods: {
    getCode() {
      function rn(min,max){
          return  parseInt(Math.random()*(max-min)+min);
      }
      //4.随机产生字符串
      const pool = "ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890";
      let str =''
      for(let i=0;i<4;i++){
          const c = pool[rn(0,pool.length)];//随机的字
          str += c
      }
      console.log('str',str)
      this.code = str
    }
  }
}
</script>
```