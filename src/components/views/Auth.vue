<template>
  <div class="login">
    <span class="hust-name">{{title}}</span>
    <div class="tip">{{tip}}</div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Auth",
  data() {
    return { title: "华中科技大学", tip: "图书漂流" };
  },
  methods: {
    route() {
      let id = this.$cookies.get("BT_userid");
      id = id && id.length;
      const path = this.$route.path;

      if (path === "/auth/reset") {
        this.title = "";
        this.tip = "密码重置";
      } else if (path === "/auth/register") {
        if (id) {
          this.$router.push({ name: "homePage" });
        }
        this.title = "图书漂流";
        this.tip = "注册";
      } else {
        if (id) {
          this.$router.push({ name: "homePage" });
        }
        this.title = "图书漂流";
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
element.style {
  margin-top: 2rem;
  margin-bottom: 20rem;
  width: 100%;
}
input {
  box-sizing: border-box;
  border: 0;
  outline: none;
}
.error::-webkit-input-placeholder {
  color: red;
}

.icon-yanjing-xiexian,
.icon-yanjing {
  font-size: 24px;
  color: #999;
  float: right;
  line-height: 48px;
}

.login {
  width: 432px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(26, 26, 26, 0.4);
  border-radius: 5px;
  box-sizing: border-box;
  margin: auto;
  margin-top: 1rem;
  padding-top: 4px;
}

.register {
  width: 432px;
  background: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
}
.hust-name {
  font-size: 40px;
  color: rgb(0, 0, 0);
  text-align: center;
  display: block;
  margin-top: 30px;
}
.tip {
  color: rgb(0, 0, 0);
  text-align: center;
  font-size: 22px;
  margin-top: 15px;
}
form {
  padding: 0 40px 36px;
  margin-top: 30px;
}
.phone {
  height: 48px;
  border-bottom: 1px solid gray;
  padding-top: 5px;
}
.code-login {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  text-align: left;
  color: #175199;
}
.toggle-code-login {
  line-height: 48px;
  float: left;
}
.forget-password {
  float: right;
}

.sot-line {
  height: 22px;
  width: 1px;
  float: left;
  background: #ebebeb;
  margin: 12px 12px 0;
}
.phone-input {
  color: black;
  height: 38px;
  line-height: 38px;
  padding-right: 10px;
  width: calc(100% - 30px);
  font-size: 18px;
  text-align: left;
  box-sizing: border-box;
  border: 0;
  outline: none;
  margin-left: 5px;
  padding-left: 10px;
  overflow: hidden;
}
.code-btn {
  color: #175199;
  line-height: 48px;
  margin-left: 5px;
  float: right;
  text-align: right;
}
.souce {
  color: #175199;
  line-height: 48px;
  text-align: right;
  font-size: 14px;
  cursor: pointer;
}
.code {
  height: 48px;
  padding-top: 5px;
  font-size: 14px;
  border-bottom: 1px solid gray;
}
.code-input {
  color: black;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  text-align: left;
  box-sizing: border-box;
  border: 0;
}
a.login-btn {
  background-color: #0084ff;
  color: #ffffff;
  margin-top: 14px;
  height: 36px;
  line-height: 36px;
  width: 100%;
  display: inline-block;
  text-align: center;
}
a.register-btn {
  background-color: #0084ff;
  color: #ffffff;
  margin-top: 14px;
  height: 36px;
  line-height: 36px;
  width: 100%;
  display: inline-block;
  text-align: center;
}
.register-org {
  width: 100%;
  margin-top: 18px;
  font-size: 14px;
  text-align: center;
}
.register-org span {
  color: #8590a6;
}
a.other-login-btn {
  color: #175199;
}
a.org-btn {
  color: #175199;
  float: right;
}
a.toggle-register-btn {
  color: #175199;
}
.bottom {
  text-align: center;
  height: 60px;
  line-height: 60px;
  background-color: #f6f6f6;
  border-top: 1px solid #ebebeb;
  font-size: 16px;
}
</style>
