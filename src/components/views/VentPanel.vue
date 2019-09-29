<template>
  <el-container>
    <el-aside width="150px">
      <LeftBar />
    </el-aside>
    <el-main class="booktravel-ventwall-outer">
      <div class="booktravel-ventwall-title">
        活动感受
        <i class="el-icon-sunny" style="color:#F56C6C;font-size:4rem;margin-left:0.5rem;" />
      </div>
      <el-divider></el-divider>
      <div class="booktravel-ventwall-subtitle">这个活动大家觉得怎么样呢，有什么想说的和大家分享吧</div>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
import LeftBar from "@/components/components/ventPanel/LeftBar";

export default {
  name: "ventPanel",
  components: { LeftBar },
  data() {
    return {};
  }
};
</script>

<style>
.booktravel-ventwall-outer {
  align-items: center;
  display: flex !important;
  flex-direction: column;
  min-width: 600px;
}

.booktravel-ventwall-title {
  align-items: center;
  display: flex;
  font-size: 2rem;
  font-weight: bold;
  justify-content: center;
}

.booktravel-ventwall-outer .el-divider {
  margin: 4px 25%;
  width: 50%;
}

.booktravel-ventwall-subtitle {
  color: rgb(143, 143, 143);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
