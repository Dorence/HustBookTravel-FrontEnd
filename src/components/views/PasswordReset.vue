<template>
  <div class="findCode">
    <span class="find-name">重置密码</span>
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
  name: "PasswordReset",

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
        code: "",
        idcode: "",
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
         jQuery.post('http://www.husteic.cn:3000/passwordReset', this.ruleForm, function
          (res) {
            console.log(res);
            if (res.code != "-1") {
              that.$message({
                message: "登陆成功",
                type: "success"
              });
              that.$router.push({ name: "Statistics" });

              that.show = true;
              // window.document.cookie = that.form.account
            } else {
              that.$message({
                message: "登陆失败",
                type: "warning"
              });
            }
          });
        /*
        if (valid) {
          this.$message("密码已重置");
         
        } else {
          console.log("error changeCode!!");
          return false;
        }*/
      });
    },
    sendIDCode() {
      //return callback(new Error("手机号不能为空"));
      this.$message("手机号不能为空")
      console.log(this.ruleForm);
      if (!this.ruleForm.num) {
        console.log("error!!");
      } else {
        this.$message("已发送验证码到您手机!");
      }
    }
  },

  props: ["toggleComponent"]
};

/*
{"code":1,"data":[{"_id":"5d73bd120bd2fe1c2c98e91b","title":"llll","book":"PaddlePaddle","content":"rggerg","creator":"书屋古惑仔","like":[],"comments":[],"date":{"month":9,"day":7}}]}
*/
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