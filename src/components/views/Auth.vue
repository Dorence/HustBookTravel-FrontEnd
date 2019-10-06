<template>
  <div class="booktravel-auth">
    <span class="booktravel-auth-brand">{{title}}</span>
    <div class="booktravel-auth-tip">{{tip}}</div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return { title: "图书漂流", tip: "图书漂流" };
  },
  methods: {
    route() {
      let id = this.$cookies.get("BT_userid");
      id = id && id.length;
      const path = this.$route.path;

      if (path === "/auth/reset") {
        this.tip = "密码重置";
      } else if (path === "/auth/register") {
        if (id) {
          this.$router.push({ name: "homePage" });
        }
        this.tip = "注册";
      } else {
        if (id) {
          this.$router.push({ name: "homePage" });
        }
        this.tip = "登录";
      }
    }
  },
  mounted() {
    this.route();
  },
  watch: {
    $route(to, from) {
      this.route();
    }
  }
};
</script>

<style>
.booktravel-auth {
  border-radius: 15px;
  box-shadow: 4px 8px 10px rgba(26, 26, 26, 0.25);
  box-sizing: border-box;
  margin: 1rem auto;
  padding-top: 2px;
  width: 432px;
}

.booktravel-auth-brand {
  color: #000;
  display: block;
  font-size: 32px;
  margin-top: 25px;
  text-align: center;
}

.booktravel-auth-tip {
  color: #000;
  font-size: 24px;
  margin-top: 11px;
  text-align: center;
}

.booktravel-auth form {
  padding: 0 40px 36px;
  margin-top: 30px;
}

.booktravel-auth form .booktravel-auth-submit{
  margin: 1.6rem 0 .6rem 0; width:100%;
}

.bottom {
  background-color: #f6f6f6;
  border-top: 1px solid #ebebeb;
  padding: 6px 40px;
}

.bottom .el-button {
  font-size: 16px;
}
</style>
