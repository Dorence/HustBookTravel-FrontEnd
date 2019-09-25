<template>
  <el-main>
    <el-container direction="vertical">
      <el-row :gutter="8">
        <el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="8" style="text-align: center;">
          <el-image fit="scale-down" :src="book.img" lazy />
        </el-col>
        <el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16">
          <el-card class="booktravel-detail-card">
            <div class="clearfix" slot="header">
              <strong style="font-size: 1.6rem;">书籍信息</strong>
              <span v-if="username && username.length">
                <el-button
                  v-if="bookstate === 0"
                  type="primary"
                  size="medium"
                  @click="dialogBorrowVisible = true"
                  style="float: right;"
                >立即借阅</el-button>
                <span v-else-if="bookstate === 1" style="color: #aaa;">已借出</span>
                <el-button
                  v-else-if="bookstate === 2"
                  type="primary"
                  size="medium"
                  @click="dialogReturnVisible = true"
                  style="float: right"
                >还书</el-button>
              </span>
              <span v-else style="color: #aaa;">登录才能借书哦。</span>
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">书名：</span>
              {{book.bookName}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">作者：</span>
              {{book.author}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">出版社：</span>
              {{book.publish}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">页数：</span>
              {{book.page}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">是否有剩余：</span>
              {{book.status ? "是" : "否"}}
            </div>
            <div class="item my-bookdetail-quad-line">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">描述：</span>
              {{book.desc}}
            </div>
            <div class="item">
              <span class="my-lable-red">#</span>
              <span style="font-weight:bold;">分类：</span>
              <div v-if="book && book.tag && book.tag.length">
                <el-tag
                  style="margin-right: 0.2rem;"
                  type="success"
                  v-for="it in book.tag"
                  v-bind:key="it"
                >{{it}}</el-tag>
              </div>
              <span v-else style="color: #aaa;">暂无</span>
            </div>
          </el-card>
        </el-col>

        <!-- borrow book -->
        <el-dialog title="借用确认" :visible.sync="dialogBorrowVisible">
          <p>
            <strong>姓名</strong>
            :&nbsp;{{username}}
            <br />
            <strong>所借书籍</strong>
            :&nbsp;{{book.bookName}}
            <br />
            <strong>书籍地点</strong>
            :&nbsp;{{book.location}}
          </p>
          <el-upload
            list-type="picture-card"
            action="#"
            :multiple="false"
            :limit="1"
            :show-file-list="true"
            :auto-upload="false"
            :on-preview="handleBorrowPreview"
            :on-remove="handleBorrowRemove"
            :on-success="handleBorrowSuccess"
            :on-error="handleBorrowError"
            :on-progress="handleBorrowProgress"
            :on-change="handleBorrowChange"
            :before-upload="handleBorrowBeforeUpload"
            :before-remove="handleBorrowBeforeRemove"
            :on-exceed="handleBorrowExceed"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">{{borrowTips[borrowTipState]}}</div>
          </el-upload>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogBorrowVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitBorrow">确 定</el-button>
          </div>
        </el-dialog>

        <!-- return book -->
        <!-- <el-dialog title="归还确认" :visible.sync="dialogReturnVisible">
          <p>
            <strong>姓名</strong>:&nbsp;小萌新
            <br />
            <strong>所借书籍</strong>
            :&nbsp;{{book.name}}
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
        <div v-if="book && book.comment && book.comment.length">
          <div class="booktravel-comment" v-for="it in book.comment" v-bind:key="it.index">
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
import qrcode from "@/qrcode/vue-qrcode-small";

export default {
  name: "",
  data() {
    return {
      dialogBorrowVisible: false,
      dialogReturnVisible: false,
      username: "",

      formReturn: {
        location: ""
      },
      borrowTips: [
        "只能上传jpg/png文件，且不超过4M",
        "二维码错误",
        "二维码正确"
      ],
      borrowTipState: 0,
      qrresult: "",

      comment: "",
      book: {},
      bookid: "",
      bookstate: -1
    };
  },
  methods: {
    /** borrow events */
    handleBorrowPreview(file) {
      console.log("handlePictureCardPreview");
    },
    handleBorrowRemove(file, filelist) {
      console.log("handleBorrowRemove", file, filelist);
      this.borrowTipState = 0;
    },
    handleBorrowSuccess(res, file, filelist) {
      console.log("handleBorrowSuccess", res, file, filelist);
    },
    handleBorrowError(err, file, filelist) {
      console.log("handleBorrowError", err, file, filelist);
      this.borrowTipState = 0;
    },
    handleBorrowProgress(e, file, filelist) {
      console.log("handleBorrowProgress", e, file, filelist);
    },
    handleBorrowChange(file, filelist) {
      console.log("handleBorrowChange", file, filelist);
      let that = this;
      qrcode.decode(file.url);
      qrcode.callback = function(msg) {
        console.log("qrcode decode:", msg);
        that.qrresult = msg;
        if (msg === that.bookid) {
          that.borrowTipState = 2;
        } else {
          that.borrowTipState = 1;
        }
      };
    },
    handleBorrowBeforeUpload(file) {
      console.log("beforeAvatarUpload", file);
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 4MB!");
      }
      return isJPG && isLt4M;
    },
    handleBorrowBeforeRemove(file, filelist) {
      console.log("handleBorrowBeforeRemove", file, filelist);
    },
    handleBorrowExceed(files, filelist) {
      console.log("handleBorrowExceed", files, filelist);
      this.$message.warning("只能上传一张图片，请删除前一张！");
    },
    submitBorrow() {
      if (this.borrowTipState === 2 && this.qrresult === this.bookid) {
        jQuery.ajax({
          url: remoteAddr + "library/book/borrow",
          type: "POST",
          data: {
            userID: this.$cookies.get("BT_userid"),
            bookID: this.bookid
          },
          dataType: "json",
          success: res => {
            console.log("res", res);
            if (res.code === 1) {
              this.$message.success("操作成功");
              this.bookstate = 2;
            } else {
              this.$message.error("获取失败:" + res.msg);
            }
          },
          error: err => {
            this.$message.error("网络开小差了");
          }
        });
      }
      this.dialogBorrowVisible = false;
    }
  },
  mounted() {
    // console.log(this.$route.query);
    this.bookid = this.$route.query.bookid;
    if (!this.bookid) {
      this.$route.push({ name: "bookList" });
    }

    this.username = this.$cookies.get("BT_username");

    jQuery.ajax({
      url: remoteAddr + "library/admin/checkSingleBook",
      type: "POST",
      data: { jry: this.bookid },
      dataType: "json",
      success: res => {
        console.log("res", res);
        if (res.code === 1) {
          this.book = res.data;

          if (this.username && this.username.length) {
            jQuery.ajax({
              url: remoteAddr + "library/book/checkCondition",
              type: "POST",
              data: {
                _id: this.$cookies.get("BT_userid"),
                bookID: this.bookid
              },
              dataType: "json",
              success: res => {
                console.log("res", res);
                if (res.code >= 0) {
                  this.bookstate = res.code;
                } else {
                  this.$message.error("获取失败:" + res.msg);
                }
              },
              error: err => {
                this.$message.error("网络开小差了");
              }
            });
          }
        } else {
          this.$message.error("获取失败:" + res.msg);
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

.my-bookdetail-quad-line {
  -webkit-line-clamp: 4;
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
