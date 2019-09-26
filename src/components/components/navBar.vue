<template>
  <el-header>
    <el-menu mode="horizontal" :default-active="activeIndex">
      <el-menu-item index="1" @click="redirect('homePage')">
        <img src="../../assets/hust-minilogo.png" />
        {{ title }}
      </el-menu-item>
      <el-menu-item index="2" @click="redirect('bookList')">书单</el-menu-item>
      <el-menu-item index="3" @click="redirect('AllComments')">评论区</el-menu-item>
      <el-menu-item index="4" @click="redirect('VentWall')">意见反馈</el-menu-item>
      <el-submenu index="5">
        <template slot="title">EIC论坛</template>
        <a href="http://47.106.111.48:4567">
          <el-menu-item index="5-1">访问论坛</el-menu-item>
        </a>
        <a
          href="https://raw.githubusercontent.com/568xiaoma/EIC_App_image/master/EIC%E8%AE%BA%E5%9D%9B%20.apk"
        >
          <el-menu-item index="5-2">下载APP</el-menu-item>
        </a>
      </el-submenu>

      <el-menu-item
        v-if="userName && userName.length"
        index="6"
        @click="logout"
        style="float: right"
      >{{userName}}</el-menu-item>
      <el-menu-item v-else index="6" @click="redirect('login')" style="float: right">登录/注册</el-menu-item>
    </el-menu>
  </el-header>
</template>
<script>
export default {
  name: "navBar",
  data() {
    return {
      activeIndex: "1",
      userName: "",
      title: "主页"
    };
  },
  methods: {
    redirect(path) {
      this.$router.push({ name: path });
    },
    logout() {
      this.$confirm("退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$cookies.set("BT_username", "", 0).set("BT_userid", "", 0);
          this.userName = "";
          this.$message({
            type: "success",
            message: "退出成功！"
          });
          if (this.$route.path !== "/") {
            this.$router.push({ name: "homePage" });
          }
        })
        .catch(console.log);
    },
    processRoute() {
      this.userName = this.$cookies.get("BT_username");

      const path = this.$route.path;
      this.title = path === "/" ? "图书漂流" : "主页";
      if (path.indexOf("/book") >= 0) {
        this.activeIndex = "2";
      } else if (path.indexOf("/auth") >= 0) {
        this.activeIndex = "6";
      }
    }
  },
  mounted() {
    this.processRoute();
  },
  watch: {
    $route(to, from) {
      this.processRoute();
    }
  }
};
</script>

<style scoped>
.el-menu[role="menubar"] > .el-menu-item:first-child {
  font-size: 20px;
  color: #303133;
  line-height: 36px;
  padding: 12px 18px;
}

.el-menu[role="menubar"] > .el-menu-item:first-child:hover {
  color: #909399 !important;
}

.el-menu[role="menubar"] > .el-menu-item:first-child img {
  height: 36px;
}
</style>
