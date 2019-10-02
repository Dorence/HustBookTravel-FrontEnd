<template>
  <el-container>
    <el-aside width="150px">
      <leftBar />
    </el-aside>
    <el-container style="padding: 10px 1rem;">
      <el-header>
        <h1 style="font-size: 30px; margin: 5px 0;">全部帖子</h1>
      </el-header>
      <el-main class="booktravel-mainbox">
        <!--评论区-->
        <el-table :data="showTableData" stripe :row-style="{minHeight: '150px'}">
          <el-table-column label="最新" width="120" sortable sort-by="[date, index]">
            <template slot-scope="scope">
              <div>
                <el-image
                  fit="fill"
                  style="width: 100px; height: 100px;"
                  :src="scope.row.picture"
                  lazy
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <span
                  style="color: #999; font-size: 85%;"
                >日期： {{scope.row.date.getMonth() + 1}}-{{scope.row.date.getDate()}}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="最热" width="auto" sortable sort-by="[like.length, index]">
            <template slot-scope="scope">
              <p v-if="b[scope.row.bookID] >= 0" style="line-height: 1.6rem;">
                <strong>书名</strong>
                ：{{bookList[b[scope.row.bookID]].bookName}}
                <br />
                <strong>出版社</strong>
                ：{{bookList[b[scope.row.bookID]].publish}}
                <br />
                <strong>作者</strong>
                ：{{bookList[b[scope.row.bookID]].author}}
                <br />
                <strong>推荐人</strong>
                ：{{scope.row.creator}}
              </p>
            </template>
          </el-table-column>

          <el-table-column width="300" align="right" fixed="right">
            <template slot="header">
              <el-button
                type="primary"
                @click="commentDialogVisible = true"
                :disabled="!user || !user.length"
              >发帖</el-button>
            </template>

            <template slot-scope="scope">
              <el-container direction="vertical">
                <el-row style="width: 100%; text-align: left;">
                  <h3>推荐理由/评论内容</h3>
                  <p v-if="scope.row.content" style="display: flex; align-items: center;">
                    <span class="booktravel-content-wrap">{{scope.row.content}}</span>
                    <el-popover
                      placement="left"
                      width="600"
                      trigger="click"
                      :content="scope.row.content + '（'+ scope.row.like.length + ' 赞）'"
                    >
                      <el-button
                        icon="el-icon-more"
                        type="default"
                        size="mini"
                        slot="reference"
                        circle
                        style="padding: 1.6px;"
                      ></el-button>
                    </el-popover>
                  </p>
                  <p v-else style="color: #aaa;">无</p>
                </el-row>

                <el-row style="display: flex; justify-content: space-between;">
                  <el-button
                    type="primary"
                    :icon="'el-icon-star-' + (scope.row.mylike ? 'on' : 'off')"
                    circle
                    @click="onSubmitLike(scope.row._id, scope.row.index)"
                  ></el-button>
                  <el-button
                    type="primary"
                    round
                    @click="dialogVisible1 = true, viewComment = scope.row.index"
                  >查看全部评论</el-button>
                  <el-button
                    type="primary"
                    round
                    @click="openReply(scope.row._id)"
                    :disabled="!user || !user.length"
                  >评论</el-button>
                </el-row>
              </el-container>
            </template>
          </el-table-column>
        </el-table>

        <!-- 发帖 -->
        <el-dialog :visible.sync="commentDialogVisible" width="76%">
          <h2 style="padding: 0 36px;">推荐/评论</h2>
          <el-form ref="form" label-width="auto" :model="form" :rules="rules">
            <el-form-item prop="creator" :rules="rules.creator" label="推荐人/评论人">
              <el-input v-model="form.creator" placeholder="推荐人/评论人"></el-input>
            </el-form-item>
            <el-form-item label="书籍" :rules="rules.book">
              <el-select
                v-model="form.bookID"
                filterable
                placeholder="请选择书籍(输入可查询)"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in bookList"
                  :key="item._id"
                  :label="item.bookName"
                  :value="item.bookID"
                >
                  <span style="float: left">{{ item.bookName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px;">{{ item.author }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="content" :rules="rules.content" label="推荐/评论">
              <el-input
                type="textarea"
                rows="4"
                v-model="form.content"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="commentDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="onSubmit('form')">发 帖</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-main>

      <el-footer height="90px">
        <el-divider></el-divider>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage + 1"
          :page-size="pagesize"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </el-footer>

      <!-- 查看评论 -->
      <el-dialog v-if="viewComment >= 0" :visible.sync="dialogVisible1" width="70%">
        <div v-if="tableData[viewComment].comments.length">
          <el-table
            ref="filterTable"
            :data="tableData[viewComment].comments.slice(commentPage * commentPageSize, (commentPage + 1) * commentPageSize)"
            :header-row-style="{height: '40px'}"
            :row-style="{height: '80px'}"
          >
            <el-table-column label="全部评论" width="auto">
              <template slot-scope="inner">
                <div>
                  <strong style="color: #777;">{{inner.row.replier}}</strong>
                  <br />
                  {{inner.row.content}}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else>还没有评论</div>
        <el-pagination
          slot="footer"
          layout="total, prev, pager, next"
          :current-page="commentPage + 1"
          :page-size="commentPageSize"
          :total="tableData[viewComment].comments.length"
          @current-change="handleCommentPage"
          @size-change="handleCommentSize"
          style="text-align:center;"
        ></el-pagination>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import leftBar from "@/components/components/comment/leftBar";
import { remoteAddr } from "@/config";

export default {
  name: "AllComments",
  components: { leftBar },
  data() {
    return {
      dialogVisible1: false,
      commentDialogVisible: false,
      currentPage: 0, //初始页
      pagesize: 10, //每页条目数
      commentPage: 0,
      commentPageSize: 10,

      user: this.$cookies.get("BT_userid"),
      viewComment: -1,

      form: {
        userID: this.$cookies.get("BT_userid"),
        creator: this.$cookies.get("BT_username"),
        bookID: "",
        content: ""
      },
      rules: {
        bookID: [{ required: true, len: 8, message: "书籍不能为空" }],
        content: [{ required: true, min: 5, message: "推荐理由不少于5字" }],
        creator: [{ required: true, message: "推荐人名不能为空" }]
      },

      tableData: [],
      showTableData: [],
      bookList: [],
      b: []
    };
  },

  methods: {
    /** 帖子分页事件 */
    handleSizeChange(size) {
      this.pagesize = size;
      this.handelShowTableData();
    },

    handleCurrentChange(page) {
      this.currentPage = page - 1;
      this.handelShowTableData();
    },

    handelShowTableData() {
      /** @notice must user a tmp variable to trigger data change */
      let tmp = [];
      for (let i = 0; i < this.pagesize; i++) {
        if (this.currentPage * this.pagesize + i < this.tableData.length) {
          tmp[i] = this.tableData[this.currentPage * this.pagesize + i];
        }
      }
      this.showTableData = tmp;
    },

    /** 评论分页事件 */
    handleCommentSize(size) {
      this.commentPageSize = size;
    },

    handleCommentPage(page) {
      this.commentPage = page - 1;
    },

    updateLike() {
      let t = this.tableData;
      for (let it of t) {
        let b = false;
        if (it.like && it.like.length) {
          for (let i = 0; i < it.like.length; i++) {
            if (this.user === it.like[i]) {
              b = true;
              break;
            }
          }
        }
        it.mylike = b;
      }
    },

    /** 评论prompt, 发送评论 */
    openReply(postId) {
      const that = this;
      this.$prompt("请输入评论内容", "提示", {
        confirmButtonText: "发送",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "回复内容不能为空",
        inputPlaceholder: "评论"
      })
        .then(({ value }) => {
          if (value.length) {
            jQuery.post(
              remoteAddr + "forum/discuss",
              {
                postID: postId,
                content: value,
                replier: that.$cookies.get("BT_username"),
                userID: that.user
              },
              response => {
                if (response && response.code === 1) {
                  that.$message.success("评论成功！");
                } else {
                  that.$message.error("发送失败");
                }
              }
            );
          }
        })
        .catch(console.error);
    },

    /** 发帖 */
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log("forum post", this.form);
          // wait for 200ms
          setTimeout(() => {
            jQuery.post(remoteAddr + "forum/post", this.form, res => {
              if (res && res.code === 1) {
                this.$message.success("发帖成功");
              } else {
                this.$message.error("发送失败");
              }
            });
          }, 200);
          this.commentDialogVisible = false;
        } else {
          this.$message.error("信息错误！");
          return false;
        }
      });
    },

    /** 点赞 */
    onSubmitLike(postid, idx) {
      // wait for 200ms
      setTimeout(() => {
        jQuery.post(
          remoteAddr + "forum/like",
          {
            postID: postid,
            liker: this.user
          },
          res => {
            if (res && res.code === 1) {
              this.tableData[idx].like = res.data.like;
              this.tableData[idx].mylike = true;
              this.handelShowTableData();
              this.$message.success("点赞成功");
            } else {
              this.$message.error("点赞失败");
            }
          }
        );
      }, 200);
    }
  },

  mounted() {
    /* get all posts */
    jQuery
      .ajax({
        url: remoteAddr + "forum/checkAllPost",
        type: "GET",
        dataType: "json"
      })
      .then(res => {
        console.log("res post", res);
        if (res.code === 1) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].date = new Date(res.data[i].date);
            res.data[i].index = i;
          }
          this.tableData = res.data;
          this.updateLike();
          this.handelShowTableData();
        } else {
          this.$message.error("加载失败");
        }
      })
      .catch(err => {
        this.$message.error("网络开小差了");
        console.error(err);
      });

    /* get all books */
    jQuery.ajax({
      url: remoteAddr + "library/checkAllBook",
      type: "GET",
      dataType: "json",
      success: result => {
        console.log("res book", result);
        if (result.data.length) {
          this.bookList = result.data;
          let tmp = {};
          for (let i = 0; i < this.bookList.length; i++) {
            tmp[this.bookList[i].bookID] = i;
          }
          this.b = tmp;
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
.booktravel-mainbox {
  box-shadow: 0.1rem 0.4rem 16px 10px rgba(0, 0, 0, 0.1);
  margin: 8px 2rem;
  min-width: 700px;
}

.booktravel-content-wrap {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 4px;
}

.el-button + .el-button {
  margin-left: 5px;
}
</style>