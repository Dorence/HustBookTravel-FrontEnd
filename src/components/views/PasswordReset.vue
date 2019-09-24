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
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="varcode">
        <el-input v-model="ruleForm.varcode"></el-input>
        <el-button type="text" @click="sendCaptcha" style="float: right;">获取短信验证码</el-button>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
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
import { remoteAddr } from "@/config";

export default {
  name: "PasswordReset",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: "",
        varcode: "",
        password: "",
        checkPass: ""
      },
      rules: {
        phone: [
          {
            pattern: /^1[0-9]{10}$/,
            trigger: "blur",
            required: true,
            message: "请输入11位手机号"
          }
        ],
        varcode: [
          {
            required: true,
            pattern: /^[0-9]{4}$/,
            trigger: "blur",
            message: "请输入4位验证码"
          }
        ],
        password: [
          {
            required: true,
            pattern: /^[a-zA-z0-9,\.@_\-\*\+]{8,32}$/,
            trigger: "blur",
            message: "密码为8-32位"
          }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        jQuery.post(remoteAddr + "passwordReset", this.ruleForm, res => {
          console.log(res);
          if (res.code != "-1") {
            this.$message({
              message: "重置成功",
              type: "success"
            });
            this.$router.push({ name: "homePage" });
          } else {
            this.$message.error("重置成功");
          }
        });
      });
    },
    sendCaptcha() {
      if (!this.ruleForm.phone || !/^1[0-9]{10}$/.test(this.ruleForm.phone)) {
        this.$message("手机号错误");
        console.log("error!!");
      } else {
        jQuery.post(
          remoteAddr + "sendM",
          { phone: this.ruleForm.phone },
          res => {
            // console.log(res);
            if (res.code === 1) {
              this.$message({
                message: "已发送验证码到您手机!",
                type: "success"
              });
              this.rules.varcode.pattern = new RegExp(
                "^" + res.confCode[0] + "$"
              );
            } else {
              this.$message({
                message: "发送失败",
                type: "warning"
              });
            }
          }
        );
      }
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