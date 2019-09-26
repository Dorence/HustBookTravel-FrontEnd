<template>
  <el-container>
    <el-aside width="200px">
      <leftBar />
    </el-aside>
    <el-container>
      <el-header style="height: 45px; line-height: unset;">
        <h1 style="font-size: 32px; margin: 2px;}">全部帖子</h1>
      </el-header>
      <el-main style="min-width: 800px;">
        <el-row :gutter="10">
          <el-col id="outside" :span="24">
            <!--评论区-->
            <div id="kernel">
              <template>
                <el-table
                  ref="filterTable"
                  stripe
                  :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                  :cell-style="{'vertical-align': 'top'}"
                  :header-row-style="{height: '40px'}"
                  :row-style="{height: '80px'}"
                >
                  <el-table-column label="最新" sortable width="120" column-key="date">
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

                  <el-table-column label="最热" width="auto" sortable column-key="like.length">
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

                  <el-table-column align="right">
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
                              :content="scope.row.content"
                            >
                              <el-link slot="reference" icon="el-icon-more" :underline="false"></el-link>
                            </el-popover>
                          </p>
                          <p v-else style="color: #aaa;">无</p>
                        </el-row>

                        <el-row style="display: flex; justify-content: space-between;">
                          <el-button
                            type="primary"
                            round
                            @click="dialogVisible1 = true, viewComment = scope.row.index"
                          >查看全部评论</el-button>
                          <el-button
                            type="primary"
                            :icon="'el-icon-star-' + (scope.row.mylike ? 'on' : 'off')"
                            circle
                            @click="onSubmitLike(scope.row._id)"
                          ></el-button>
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
              </template>
            </div>
          </el-col>
        </el-row>

        <el-dialog v-if="viewComment >= 0" :visible.sync="dialogVisible1" width="70%">
          <div v-if="tableData[viewComment].comments.length">
            <el-table
              ref="filterTable"
              :data="tableData[viewComment].comments.slice((currentPage-1) * pagesize, currentPage * pagesize)"
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
          <div v-else>暂无</div>
          <span slot="footer" class="dialog-footer">
            <el-divider></el-divider>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="total, prev, pager, next, jumper"
                :total="tableData[viewComment].comments.length"
              ></el-pagination>
            </div>
          </span>
        </el-dialog>

        <el-dialog :visible.sync="commentDialogVisible" width="75%">
          <div class="my-submit-form">
            <el-form
              class="my-right-form-inner"
              ref="form"
              label-width="auto"
              :model="form"
              :rules="rules"
            >
              <el-form-item prop="creator" :rules="rules.creator" label="推荐人/评论人">
                <el-input v-model="form.creator"></el-input>
              </el-form-item>
              <el-form-item label="书籍" :rules="rules.book">
                <el-select
                  v-model="form.bookID"
                  filterable
                  placeholder="请选择书籍(输入可查询)"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in bookList"
                    :key="item._id"
                    :label="item.bookName"
                    :value="item.bookID"
                  >
                    <span style="float: left">{{ item.bookName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.author }}</span>
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
          </div>
        </el-dialog>
      </el-main>

      <el-footer height="90px">
        <el-divider></el-divider>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            :page-sizes="[5, 10, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          ></el-pagination>
        </div>
      </el-footer>
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
      currentPage: 1, //初始页
      pagesize: 10, //每页条目数

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
      bookList: [],
      b: []
    };
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    },

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
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
      return;
    },

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
          console.log("reply", value);
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

    handleSizeChange(size) {
      console.log(this.pagesize); // 每页下拉显示数据
      this.pagesize = size;
    },

    handleCurrentChange(currentPage) {
      console.log(this.currentPage); // 点击第几页
      this.currentPage = currentPage;
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("forum post", this.form);
          jQuery.post(remoteAddr + "forum/post", this.form, res => {
            if (res && res.code === 1) {
              this.$message.success("发帖成功");
            } else {
              this.$message.error("发送失败");
            }
          });
          this.commentDialogVisible = false;
        } else {
          this.$message.error("信息错误！");
          return false;
        }
      });
    },

    onSubmitLike(postid) {
      setTimeout(() => {
        jQuery.post(
          remoteAddr + "forum/like",
          {
            postID: postid,
            liker: this.user
          },
          res => {
            if (res && res.code === 1) {
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
        } else {
          this.$message.error("获取失败");
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
          let k = {};
          for (let i = 0; i < this.bookList.length; i++) {
            k[this.bookList[i].bookID] = i;
          }
          this.b = k;
          console.log(k);
        } else {
          this.$message.error("获取失败");
        }
      },
      error: err => {
        this.$message.error("网络开小差了");
      }
    });
  },

  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 50) {
        return value.slice(0, 50) + "...";
      }
      return value;
    }
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-left: 5px;
}

.el-collapse-item__header {
  background-color: none;
  border: none;
}

.el-collapse-item__wrap {
  background-color: transparent;
}

.el-collapse {
  border-top: none;
  border-bottom: none;
}

.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: left;
  line-height: 60px;
}

#outside {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

#kernel {
  margin-top: 25px;
  margin-right: 40px;
  margin-bottom: 75px;
  margin-left: 50px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 70%;
}

.my-submit-form {
  padding-top: 2rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}

.my-right-form-inner {
  width: 60%;
}

.booktravel-content-wrap {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 4px;
}
</style>