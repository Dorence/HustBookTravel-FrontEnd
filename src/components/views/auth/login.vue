<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="auto" label-position="left">
      <el-form-item label="账号">
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          autocomplete="off"
          placeholder="密码"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-button class="booktravel-auth-submit" type="primary" @click="submitForm('form')">登陆</el-button>
    </el-form>
    <div class="bottom">
      <el-button type="text" icon="el-icon-circle-plus-outline" @click="redirect('register')">注册</el-button>
      <el-button
        type="text"
        icon="el-icon-unlock"
        @click="redirect('PasswordReset')"
        style="float: right;"
      >忘记密码</el-button>
    </div>
  </div>
</template>

<script>
import { remoteAddr } from "@/config";

export default {
  name: "Login",
  data() {
    return {
      form: {
        phone: "",
        password: ""
      },
      rules: {
        phone: [
          {
            required: true,
            len: 11,
            trigger: "blur",
            message: "请输入11位手机号"
          }
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      }
    };
  },
  methods: {
    redirect(path) {
      this.$router.push({ name: path });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        jQuery.post(remoteAddr + "auth/login", this.form, res => {
          // console.log(res);
          if (res.code === 1) {
            this.$message.success("登陆成功");
            // write cookies
            this.$cookies
              .set("BT_username", res.data.name, 7 * 24 * 3600)
              .set("BT_userid", res.data.userID, 7 * 24 * 3600);
            this.redirect("homePage");
          } else {
            this.$message.error("登陆失败:" + res.msg);
            this.$cookies.set("BT_username", "", 0).set("BT_userid", "", 0);
          }
        });
      });
    }
  }
};
</script>

<style></style>
