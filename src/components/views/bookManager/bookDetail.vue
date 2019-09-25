<template>
  <el-main>
    <el-container direction="vertical">
      <el-row :gutter="8">
        <el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8" style="text-align: center;">
          <el-image fit="scale-down" :src="bookDetail.img" />
        </el-col>
        <el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16">
          <el-card class="booktravel-detail-card">
            <div class="clearfix" slot="header">
              <span style="font-size: 1rem;font-weight: bold;">书籍信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="dialogFormVisible = true"
              >立即借阅</el-button>
              <el-button type="primary" @click="dialogReturnVisible = true">还书</el-button>
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">编号：</span>
              {{bookDetail.index}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">书名：</span>
              {{bookDetail.name}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">作者：</span>
              {{bookDetail.author}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">出版社：</span>
              {{bookDetail.public}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">页数：</span>
              {{bookDetail.pages}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">是否有剩余：</span>
              {{bookDetail.process}}
            </div>
            <div class="item my-bookdetail-two-line">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">描述：</span>
              {{bookDetail.desc}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">分类：</span>
              <el-tag
                style="margin-right: 0.2rem;"
                type="success"
                v-for="it in bookDetail.tag"
                v-bind:key="it"
              >{{it}}</el-tag>
            </div>
          </el-card>
        </el-col>

        <!-- borrow book -->
        <el-dialog title="借用确认" :visible.sync="dialogFormVisible">
          <p>
            <strong>姓名</strong>:&nbsp;小萌新
          </p>
          <p>
            <strong>所借书籍</strong>
            :&nbsp;{{bookDetail.name}}
            <br />
            <strong>书籍地点</strong>:&nbsp;启明书屋
          </p>
          <el-upload
            list-type="picture-card"
            action="#"
            :file-list="fileList"
            :on-change="handleBorrowChange"
            :on-preview="handlePictureCardPreview"
            :multiple="false"
            :limit="1"
            :show-file-list="true"
            :auto-upload="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">{{borrowTips[borrowTipState]}}</div>
          </el-upload>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>

        <!-- return book -->
        <!-- <el-dialog title="归还确认" :visible.sync="dialogReturnVisible">
          <p>
            <strong>姓名</strong>:&nbsp;小萌新
            <br />
            <strong>所借书籍</strong>
            :&nbsp;{{bookDetail.name}}
          </p>
          <el-form ref="formReturn" :model="formReturn" label-width="80px">
            <el-form-item label="归还地点">
              <el-select v-model="formReturn.location" placeholder="请选择归还地点">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-upload
            list-type="picture-card"
            action
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :multiple="false"
            :limit="1"
            :show-file-list="false"
            
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4M</div>
          </el-upload>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogReturnVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogReturnVisible = false">确 定</el-button>
          </div>
        </el-dialog>-->
      </el-row>

      <el-row>
        <div class="booktravel-comment-subtitle">评论</div>
        <div v-if="bookDetail.comment.length">
          <div class="booktravel-comment" v-for="it in bookDetail.comment" v-bind:key="it.index">
            <div class="my-bookdetail-comment-row">
              <el-image :src="it.headImg" class="my-bookdetail-comment-headImg" />
              <div class="my-bookdetail-comment-col">
                <div class="my-bookdetail-comment-name">{{it.name}}</div>
                <div class="my-bookdetail-comment-time">{{it.time}}</div>
              </div>
            </div>
            <div class="my-bookdetail-comment-content">{{it.content}}</div>
          </div>
        </div>
        <div v-else>
          <h4>暂无</h4>
        </div>
      </el-row>
    </el-container>
  </el-main>
</template>
<script>
import { remoteAddr } from "@/config";
import qrcode from "@/qrcode/vue-qrcode";

export default {
  name: "",
  data() {
    return {
      dialogFormVisible: false,
      dialogReturnVisible: false,
      imageUrl: "",
      fileList: [],
      formReturn: {
        location: ""
      },
      borrowTips: ["只能上传jpg/png文件，且不超过4M", "wrong", "ok"],
      borrowTipState: 0,

      comment: "",
      bookDetail: {
        name: "大手笔是怎样的练成的",
        img: "../../../static/book-cover.jpg",
        author: "刘羿",
        public: "人民出版社",
        desc:
          "此处主要讲述了一段斗罗大陆上的爱情故事，一只十万年魂兽化身为人形。此处主要讲述了一段斗罗大陆上的爱情故事，一只十万年魂兽化身为人形。",
        process: "是",
        pages: 195,
        index: "46513548465146566",
        tag: ["文学", "搞笑", "漫画", "青春", "热血", "激情"],
        comment: []
      },
      bookId: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log("handleAvatarSuccess");
      this.imageUrl = URL.createObjectURL(file.raw);
      // return false;
    },
    handleBorrowChange(file, fileList) {
      console.log("handleBorrowChange", file, fileList);
    },

    handlePictureCardPreview(file) {
      console.log("handlePictureCardPreview");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload(file) {
      console.log("beforeAvatarUpload");
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt4M = file.size / 1024 / 1024 < 4;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 4MB!");
      }

      /*if (isJPG && isLt4M) {
        let reads = new FileReader();
        console.log("file", file);
        reads.readAsDataURL(file);
        console.log("ready", reads);

        let that = this;

        reads.onload = function(e) {
          // console.log("done", this);
          // document.getElementById("im").src = this.result;
          qrcode.decode(this.result);
          qrcode.callback = function(imgMsg) {
            console.log("imgMsg:", imgMsg);
            // alert(imgMsg);
            that.borrowTips[3] = this.result;
            that.borrowTipState = 3;
          };
        };
      }*/

      return isJPG && isLt4M;
    },

    openReturn() {
      this.$prompt("请输入评论内容", "提示", {
        confirmButtonText: "发送",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "回复内容不能为空",
        inputPlaceholder: "评论"
      })
        .then(({ value }) => {
          console.log("reply", value);
          if (value.length) {
            let tm = new Date();
            jQuery.post(
              remoteAddr + "book/return",
              {
                bookId: this.bookId,
                user: "user" /** @todo */,
                place: "western",
                time: {
                  year: tm.getFullYear(),
                  month: tm.getMonth() + 1,
                  day: tm.getDate(),
                  clock: tm.getHours()
                }
              },
              response => {
                if (response && response.code === 1) {
                  this.$message.success("评论成功！");
                } else {
                  this.$message.error("发送失败");
                }
              }
            );
          }
        })
        .catch(console.error);
    }
  },
  mounted() {
    console.log(this.$route.query);
    this.bookId = this.$route.query.bookid;
    if (!this.bookId) {
      this.$route.push({ name: "bookList" });
    }
    jQuery.ajax({
      url: remoteAddr + "right/checkSingleBook",
      type: "GET",
      data: { _id: this.bookId },
      dataType: "json",
      success: res => {
        console.log("res", res);
        if (res.data.length) {
          this.bookList = res.data;
        } else {
          this.$message.error("获取失败");
        }
      },
      error: err => {
        this.$message.error("网络开小差了");
      }
    });
  }
};
</script>

<style scoped>
.booktravel-booklist-info .el-image {
  width: 100%;
  min-height: 120px;
}

.booktravel-detail-card {
  font-size: 0.8rem;
}

.booktravel-comment-subtitle {
  border-bottom: 1px rgb(0, 0, 0) solid;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 2rem;
  padding-bottom: 0.2rem;
}

.booktravel-comment {
  margin-bottom: 0.5rem;
  margin-left: 1rem;
}

.my-bookdetail-comment-container {
  margin-left: 5rem;
}

.my-bookdetail-comment-headImg {
  width: 4rem;
  height: 4rem;
  border-radius: 10rem;
  margin: 0.5rem;
}

.my-bookdetail-comment-col {
  display: flex;
  flex-direction: column;
}

.my-bookdetail-comment-row {
  display: flex;
  flex-direction: row;
  height: 5rem;
  align-items: center;
}

.my-bookdetail-comment-name {
  font-size: 1rem;
  font-weight: bold;
}

.my-bookdetail-comment-time {
  font-size: 0.8rem;
  color: rgb(182, 182, 182);
}

.my-bookdetail-comment-content {
  margin-left: 5rem;
  font-size: 0.8rem;
}

.my-lable-red {
  display: inline-block;
  font-weight: bold;
  font-size: 1.1rem;
  color: rgb(243, 45, 45);
  width: 1rem;
}

.my-bookdetail-two-line {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}

.my-bookdetail-row {
  display: flex;
  flex-direction: row;
}

.item {
  margin-bottom: 11px;
}
</style>
