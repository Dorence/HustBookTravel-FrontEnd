<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="auto" label-position="left">
      <el-form-item label="账号" prop="phone">
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="密码"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>

      <el-button type="text" @click="redirect('PasswordReset')" style="margin-top: 10px;">忘记密码</el-button>
      <el-button
        type="primary"
        @click="submitForm('form')"
        style="margin: 1.6rem 0 .6rem 0; width:100%;"
      >登陆</el-button>
    </el-form>
    <div class="bottom">
      <span>
        没有账号？
        <el-button type="text" @click="toggleComponent">注册</el-button>
      </span>
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
      input: "",
      rules: {
        password: [{ required: true, trigger: "blur" }],
        phone: [{ required: true, len: 11, trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        jQuery.post(remoteAddr + "login", this.form, res => {
          console.log(res);
          if (res.code === 1) {
            this.$message.success("登陆成功");
            // write cookies
            this.$cookies
              .set("BT_username", res.data.name, 7 * 24 * 3600)
              .set("BT_userid", res.data.userID, 7 * 24 * 3600);

            setTimeout(() => {
              this.redirect('homePage');
            }, 4);
          } else {
            this.$message.error("登陆失败:" + res.msg);
            this.$cookies.set("BT_username", "", 0).set("BT_userid", "", 0);
          }
        });
      });
    },
    switchComponent: function() {
      this.typeName = "FindCode";
    },
    redirect(path) {
      this.$router.push({ name: path });
    }
  },
  props: ["toggleComponent"]
};
</script>


