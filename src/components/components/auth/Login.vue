<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="auto" label-position="left">
      <el-form-item label="账号">
        <el-input v-model="form.phone" placeholder="手机号/用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" autocomplete="off" show-password></el-input>
      </el-form-item>

      <div class="code-login">
        <a href="javascript:" @click="redirect('PasswordReset')" class="org-btn">忘记密码</a>
      </div>
      <el-button
        type="primary"
        @click="submitForm('form')"
        style="margin-top: 2rem;margin-bottom: 2rem;width:100%;"
      >登陆</el-button>
    </el-form>
    <div class="bottom">
      <span>
        没有账号？
        <a href="javascript:" @click="toggleComponent" class="toggle-register-btn">注册</a>
      </span>
    </div>
  </div>
</template>


<script>
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
        phone: [{ min: 4, max: 256, trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        jQuery.post("http://www.husteic.cn:3000/login", this.form, res => {
          console.log(res);
          if (res.code != "-1") {
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            that.$router.push({ name: "homePage" });
          } else {
            this.$message.error("登陆失败");
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


