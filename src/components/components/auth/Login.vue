<template>
  <div>
    <el-form
      action="shubmit"
      model="form"
      rules="rules"
      ref="form"
      label-width="80px"
      label-position="left"
    >
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
      </el-form-item>

      <div class="code-login">
        <!--a href="javascript:" class="toggle-code-login">手机验证码登陆</a-->
        <a href="javascript:" @click="redirect('FindCode')" class="forget-password">忘记密码</a>
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      form: {
        phone: "",
        pass: ""
      },
      input: "",
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("login!");
        } else {
          console.log("error login!!");
          return false;
        }
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


