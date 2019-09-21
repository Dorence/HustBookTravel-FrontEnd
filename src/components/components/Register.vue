<template>
  <div>
    <!--el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"-->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="105px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item label="手机号" prop="num">
        <el-input v-model.number="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="ruleForm.idcode"></el-input>
        <a href="javascript:" class="org-btn" @click="sendIDCode()">获取短信验证码</a>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="ruleForm.schoolid"></el-input>
      </el-form-item>
      <el-form-item label="院系">
        <el-input v-model="ruleForm.faculty"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>

      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        style="margin-top: 2rem;margin-bottom: 2rem;width:100%;"
      >注册</el-button>
    </el-form>
    <div class="bottom">
      <span>
        没有账号？
        <a href="javascript:" @click="toggleComponent" class="toggle-register-btn">登陆</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (
        value === "" ||
        value.length < 8 ||
        value.length > 20 ||
        value.length == ""
      ) {
        console.log("ok");
        callback(new Error("密码位数应在8~20位之间"));
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
        idcode: "",
        username: "",
        code: "",
        schoolid: "",
        faculty: "",
        address: "",
        pass: "",
        checkPass: "",
        num: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        num: [{ validator: checkNum, trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message('register');;
        } else {
          console.log("error register!!");
          return false;
        }
      });
    },
    
    sendIDCode() {
     console.log(this.ruleForm)
      if (!this.ruleForm.num)
      {
        console.log("error!!");
      }
      else{
        this.$message("已发送验证码到您手机!")
      }
    }
  },

  props: ["toggleComponent"]
};
</script>
