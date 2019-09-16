<template>
    <div class="register">
        <span class="hust-name">
            华中科技大学
        </span>
        <div class="tip">读书漂流</div>
        <form action="shubmit">
            <div class="phone">
                <input type="text" @blur="onBlurCheck('phone')" 
                :class="{'phone-input':true,error:errorMessage.phone.indexOf('不能为空')>-1}" 
                :placeholder="errorMessage['phone']"  v-model.trim="phone">
            </div>
            <div class="code">
                <input type="text" @blur="onBlurCheck('code')" :class="{'code-input':true,error:errorMessage.code.indexOf('不能为空')>-1}" :placeholder="errorMessage['code']" v-model.number.trim="code">
                <a href="javascript:" class="code-btn">获取短信验证码</a>
            </div>
            <div class="phone">
                <input type="text" 
                :class="{'phone-input':true,error:errorMessage.phone.indexOf('不能为空')>-1}" 
                :placeholder="errorMessage['address']"  v-model.trim="address">
            </div>
            <div class="phone">
                <input type="text" @blur="onBlurCheck('phone')" 
                :class="{'phone-input':true,error:errorMessage.phone.indexOf('不能为空')>-1}" 
                :placeholder="errorMessage['faculty']"  v-model.trim="faculty">
            </div>
            <div class="phone">
                <input type="text" @blur="onBlurCheck('phone')" 
                :class="{'phone-input':true,error:errorMessage.phone.indexOf('不能为空')>-1}" 
                :placeholder="errorMessage['studentID']"  v-model.trim="studentID">
            </div>
            
            <a href="javascript:" class="register-btn">注册</a>
            
        </form>
        <div class="bottom">
            <span>已有账号？<a href="javascript:" @click="toggleComponent" class="toggle-register-btn">登陆</a></span>
        </div>
    </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      msg: "hust",
      phone: "",
      optionArray: ["中国 +86", "美国 +1", "日本 +81"],
      selected: "中国 +86",
      code: "",
      errorMessage: {
        phone: "手机号",
        code: "验证码",
        address:"住址",
        faculty:"院系",
        studentID:"学号"
      }
    };
  },
  methods: {
    onBlurCheck(name) {
      console.log(name, "check name");
      const value = this[name];
      if (!value || value.length < 1)
        return (this.errorMessage[name] = "不能为空");
      else this.errorMessage[name] = "";
    }
  },
  props: ["toggleComponent"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  box-sizing: border-box;
  border: 0;
  outline: none;
}
.error::-webkit-input-placeholder {
  color: red;
}
a {
  text-decoration: none;
  outline: none;
}
a:hover,
a:visited,
a:link,
a:active {
  color: black;
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
  color: #472940;
  text-align: center;
  display: block;
  margin-top: 30px;
}
.tip {
  color: #472940;
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
#Prefix {
  width: 110px;
  color: black;
  height: 38px;
  line-height: 38px;
  font-size: 18px;
  text-align: left;
  box-sizing: border-box;
  border: 0;
  outline: none;
  float: left;
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
  width: 98px;
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
}
.register-org span {
  color: #8590a6;
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
