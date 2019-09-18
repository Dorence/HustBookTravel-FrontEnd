<template>
    <div>
     <img class="img"
        src="https://edu-image.nosdn.127.net/AB21F44284F716116FCC5A24B375699B.jpg?imageView&amp;thumbnail=510y288&amp;quality=100"
        width="100%"
        height="audo"
        alt="图片"
      />
    </div>
    <!-- <div id="avtivityImg">
      <img class="img"
        src="https://edu-image.nosdn.127.net/AB21F44284F716116FCC5A24B375699B.jpg?imageView&amp;thumbnail=510y288&amp;quality=100"
        width="50%"
        height="250"
        style="float:left"
        alt="图片"
      />
    </div>
    <div class="activity-intro">
      <div style="text-align:center;">读书漂流</div>
      <div class="activity-intro" style="text-align:center;">贾靖杰好帅贾靖杰好帅贾靖杰好帅
        贾靖杰好帅贾靖杰好帅贾靖杰好帅贾靖杰好帅</div>
      <div style="text-align:right;">—— 读书漂流举办方</div>
    </div>
    <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane class="title" name="first">
      <span slot="label" class="test"><i class="el-icon-date"></i>活动介绍</span>
      这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>这个活动666<br>
      </el-tab-pane>
    <el-tab-pane class="title" name="second">
      <span slot="label" class="test"><i class="el-icon-notebook-2"></i>注意事项</span>
      666
      </el-tab-pane>
  </el-tabs>
    </div>
    <!-- <el-card class="box-card">
        <div slot="header" class="clearfix" style="font-weight: bold;font-size: 1.2rem;text-align:center;">
          <span>读书漂流</span>
        </div>
        <div class="text item">
          <span style="font-weight: bold;">部门全称：</span>
        </div>
        <div class="text item">
          <span style="font-weight: bold;">部长姓名：</span>
        </div>
        <div class="text item">
          <span style="font-weight: bold;">部门招新群：</span>
        </div>
        <div class="text item">
          <span style="font-weight: bold;">部长QQ：</span>
        </div>
        <div class="text item">
          <span style="font-weight: bold;">一句话部门：</span>
        </div>
    </el-card>-->
</template>
<script>
export default {
  name: "HomePage",
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
};
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
/* /* .box-card {
  width: 480px;
  margin: 2rem;
} 
.activity-intro{
    height: 200;
    background-color: #F5F8F4; 
    padding: 30px 30px 20px;
    margin-bottom: 48px;
    color: #333333;
} */
</style>
