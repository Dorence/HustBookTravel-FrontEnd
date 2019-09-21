<template>
  <div class="my-bookdetail">
    <div class="my-bookdetail-row">
      <el-image 
        slot="reference"
        :src="bookDetail.img"
        class="my-bookdetail-image"
        fit="scale-down"/>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 1rem;font-weight: bold;">借阅情况</span>
        </div>
        <div class="item">
          <span class="my-lable-red">#</span>
          <span style="font-weight:bold;">书名：</span>
          {{bookDetail.name}}
        </div>
        <div class="item">
          <span class="my-lable-red">#</span>
          <span style="font-weight:bold;">已借阅：</span>
          {{bookDetail.process}}
        </div>
        <div class="item">
          <span class="my-lable-red">#</span>
          <span style="font-weight:bold;">最早还书日期：</span>
          {{bookDetail.date}}
        </div>
        <div class="item">
          <span class="my-lable-red">#</span>
          <span style="font-weight:bold;">扫码借阅:</span>
        </div>
        <div class="item">
          <el-image 
            slot="reference"
            :src="bookDetail.code"
            class="my-bookdetail-code"
            fit="scale-down"/>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
      return {
        comment: '',
        bookDetail:{
          name: "大手笔是怎样的练成的",
          img: "http://img60.ddimg.cn/digital/product/92/93/1900569293_ii_cover.jpg?version=c75cd16d-f14d-491f-a857-afb24adec001555",
          desc: "此处主要讲述了一段斗罗大陆上的爱情故事，一只十万年魂兽化身为人形。此处主要讲述了一段斗罗大陆上的爱情故事，一只十万年魂兽化身为人形。",
          process: "7/8",
          date:"12月12日",
          code:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568699787602&di=54576bc504f18706adcc786f9b3593b5&imgtype=0&src=http%3A%2F%2Fimage.thepaper.cn%2Fwww%2Fimage%2F8%2F856%2F505.jpg"
        },
      };
    },
  methods: {
  }   
}
 </script>

<style>

.my-bookdetail{
  display: flex;
  flex-direction: column;
}
.my-bookdetail-subtitle{
  font-size: 1.2rem;
  font-weight: bold;
  width: 50rem;
  border-bottom: 1px rgb(0, 0, 0) solid;
  padding-bottom: 0.2rem;
  margin-bottom: 1rem;
}
.my-lable-red{
  display: inline-block;
  font-weight: bold;
  font-size: 1.1rem;
  color: rgb(243, 45, 45);
  width: 1rem;
}
.my-bookdetail-image{
  width: 23rem;
  height: 25rem;
  margin: 3rem;
}
.my-bookdetail-code{
  width:5rem;
  height:5rem;
  margin:3rem;
}
.box-card{
  font-size: 1rem;
  width: 25rem;
  margin: 3rem;
}
.my-bookdetail-row{
  display: flex;
  flex-direction: row;
}
.item {
  margin-bottom: 11px;
}
</style>