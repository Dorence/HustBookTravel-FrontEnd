<template>
  <div class="my-vent-submit">
    <div class="my-vent-submit-title">
      活动感受
      <i class="el-icon-sunny" style="color:#F56C6C;font-size:4rem;margin-left:0.5rem;" />
    </div>
    <div class="my-vent-submit-line"></div>
    <div class="my-vent-submit-subtitle">这个活动大家觉得怎么样呢，有什么想说的和大家分享吧</div>
    <el-input
      placeholder="请输入内容"
      style="margin-top: 2rem;margin-bottom: 2rem;"
      v-model="content"
      clearable
    ></el-input>
    <el-button type="primary" @click="onSubmit" style="margin-top: 2rem;margin-bottom: 20rem;">立即创建</el-button>
  </div>
</template>
<script>
import { remoteAddr } from "@/config";

const colors = [
  "#d87c7c",
  "#919e8b",
  "#d7ab82",
  "#6e7074",
  "#61a0a8",
  "#efa18d",
  "#787464",
  "#cc7e63",
  "#724e58",
  "#4b565b"
];

export default {
  name: "SubmitVent",
  data() {
    return {
      content: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
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
      this.$nextTick(_ => {
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
      var that = this;
      if (that.content == "") {
        this.$message({
          message: "请输入反馈内容",
          type: "warning"
        });
      } else {
        var myDate = new Date();
        console.log(that.dynamicTags);
        jQuery.post(
          remoteAddr + "right/Opinion/send",
          {
            index: myDate.getTime(),
            size: Math.ceil(Math.random() * 6) + 6,
            color: colors[Math.ceil(Math.random() * colors.length) - 1],
            content: that.content,
            reply: [],
            tags: JSON.stringify(that.dynamicTags)
          },
          function(res) {
            console.log(res);
            that.$message({
              message: "发表成功",
              type: "success"
            });
            that.tableData = res.data;
          }
        );
      }
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.my-vent-submit {
  padding: 3rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.my-vent-submit-line {
  border-top: 1px rgb(182, 182, 182) solid;
  width: 4rem;
}

.my-vent-submit-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.my-vent-submit-subtitle {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: rgb(143, 143, 143);
}

.my-vent-submit-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
