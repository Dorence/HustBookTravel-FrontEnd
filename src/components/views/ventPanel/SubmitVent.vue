<template>
  <div class="booktravel-ventsubmit">
    <el-input placeholder="请输入内容" v-model="content" style="margin-top: 2rem;" clearable></el-input>
    <el-button type="primary" @click="onSubmit" style="margin: 20px 0 20rem;" disabled>立即创建</el-button>
  </div>
</template>
<script>
import { remoteAddr, randColor } from "@/config";

export default {
  name: "SubmitVent",
  data() {
    return {
      content: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      user: this.$cookies.get("BT_userid")
    };
  },
  methods: {
    redirect(pathname) {
      this.$router.push({ name: pathname });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    onSubmit() {
      let that = this;
      if (this.content == "") {
        this.$message.error("请输入反馈内容");
      } else if (this.user && this.user.length) {
        // console.log(this.dynamicTags);
        jQuery.post(
          remoteAddr + "right/Opinion/send",
          {
            index: new Date().getTime(),
            color: randColor(),
            content: this.content,
            reply: [],
            size: Math.ceil(Math.random() * 6) + 6,
            tags: JSON.stringify(this.dynamicTags)
          },
          res => {
            // console.log(res);
            if (res.code === 1) {
              this.$message.success("发表成功");
              this.tableData = res.data;
            } else {
              this.$message.error("出错了");
            }
          }
        );
      } else {
        this.$message.warning("需要登录");
      }
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.booktravel-ventsubmit {
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 3rem 2rem;
  width: 85%;
}
</style>
