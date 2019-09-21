<template>
  <div class="findCode">
    <span class="find-name">找回密码</span>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="ruleForm.idcode"></el-input>
        <a href="javascript:" class="code-btn">获取短信验证码</a>
      </el-form-item>

      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        style="margin-top: 2rem;margin-bottom: 2rem;width:100%;"
      >重置密码</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        code: "",
        idcode: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("changeCode!");
        } else {
          console.log("error changeCode!!");
          return false;
        }
      });
    }
  },
  props: ["toggleComponent"]
};
</script>

<style scoped>
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
.findCode {
  width: 432px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
  margin: auto;
}
.find-name {
  font-size: 40px;
  color: rgb(0, 0, 0);
  text-align: center;
  display: block;
  margin-top: 30px;
  font-weight: bold；;
}
</style>