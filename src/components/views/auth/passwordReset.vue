<template>
  <div>
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
      <el-form-item label="验证码" prop="vercode">
        <el-input v-model="ruleForm.vercode"></el-input>
        <el-button
          type="text"
          @click="sendCaptcha"
          style="float: right;"
          :disabled="captcha.d"
        >{{captcha.t}}</el-button>
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
      captcha: {
        t: "获取短信验证码",
        time: new Date().getTime(),
        d: false
      },
      ruleForm: {
        phone: "",
        vercode: "",
        password: "",
        checkPass: ""
      },
      stdvercode:"",
      rules: {
        phone: [
          {
            pattern: /^1[0-9]{10}$/,
            trigger: "blur",
            required: true,
            message: "请输入11位手机号"
          }
        ],
        vercode: [
          {
            required: true,
            pattern: /^[0-9]{2,6}$/,
            trigger: "blur",
            message: "验证码错误"
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
    captchaTrigger() {
      let dt = new Date().getTime();
      if (dt > this.captcha.time && dt < this.captcha.time + 60 * 1000) {
        this.captcha.d = true;
        this.captcha.t =
          Math.round((this.captcha.time + 60 * 1000 - dt) / 1000) +
          "秒后重新发送";
        setTimeout(() => {
          this.captchaTrigger();
        }, 1000);
      } else {
        this.captcha.d = false;
        this.captcha.t = "获取短信验证码";
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        jQuery.post(remoteAddr + "auth/passwordReset", this.ruleForm, res => {
          console.log(res);
          if (res.code === 1) {
            this.$message({
              message: "重置成功",
              type: "success"
            });
            this.$router.push({ name: "homePage" });
          } else {
            this.$message.error("重置失败");
          }
        });
      });
    },

    sendCaptcha() {
      if (!this.ruleForm.phone || !/^1[0-9]{10}$/.test(this.ruleForm.phone)) {
        this.$message.error("手机号错误");
        console.log("error!!");
      } else {
        this.captcha.time = new Date().getTime();
        this.$cookies.set("BT_timeout", this.captcha.time, 60 * 1000);

        this.captcha.d = true;
        setTimeout(() => {
          this.captchaTrigger();
        }, 100);

        jQuery.post(
          remoteAddr + "auth/sendM",
          { phone: this.ruleForm.phone },
          res => {
            // console.log(res);
            if (res.code === 1) {
              this.$message({
                message: "已发送验证码到您手机!",
                type: "success"
              });
              this.stdvercode = res.confCode[0];
              this.rules.vercode.pattern = new RegExp(
                "^" + this.stdvercode + "$"
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
  }
};
</script>

<style scoped>
input {
  box-sizing: border-box;
  border: 0;
  outline: none;
}
</style>