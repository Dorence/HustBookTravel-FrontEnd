<template>
  <el-container>
    <el-aside width="200px">
      <leftBar />
    </el-aside>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="12" :offset="2">我的帖子</el-col>
        </el-row>
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
                  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :cell-style="{'vertical-align': 'top'}"
                  :header-row-style="{height: '40px'}"
                  :row-style="{height: '80px'}"
                >
                  <el-table-column label="最新" sortable width="auto" column-key="time">
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
                        >日期： {{scope.row.date.month}}-{{scope.row.date.day}}</span>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column label="最热" width="auto" sortable column-key="hot">
                    <template slot-scope="scope">
                      <p style="line-height: 1.6rem;">
                        <strong>书名</strong>
                        ：{{scope.row.book}}
                        <br />
                        <strong>出版社</strong>
                        ：{{scope.row.press}}
                        <br />
                        <strong>作者</strong>
                        ：{{scope.row.author}}
                        <br />
                        <strong>推荐人</strong>
                        ：{{scope.row.creator}}
                      </p>
                    </template>
                  </el-table-column>

                  <el-table-column prop="category" width="auto" align="left">
                    <template slot-scope="scope">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="推荐理由" name="1">
                          <div>{{scope.row.content}}</div>
                        </el-collapse-item>
                      </el-collapse>
                    </template>
                  </el-table-column>

                  <el-table-column align="right">
                    <template slot="header">管理</template>

                    <template slot-scope="scope">
                      <el-container direction="vertical">
                        <el-row style="display: flex; justify-content: space-between;">
                          <el-button type="text" @click="dialogVisible1 = true">查看全部评论</el-button>
                          <el-button
                            type="primary"
                            :icon="'el-icon-star-' + (scope.row.mylike ? 'on' : 'off')"
                            circle
                          >{{scope.row.like.length}}</el-button>
                          <el-button type="primary" round @click="openReply(scope.row._id)">评论</el-button>

                          <el-dialog :visible.sync="dialogVisible1" width="70%">
                            <div v-if="scope.row.comments.length">
                              <el-table
                                ref="filterTable"
                                :data="scope.row.comments.slice((currentPage-1) * pagesize, currentPage * pagesize)"
                                :header-row-style="{height: '40px'}"
                                :row-style="{height: '80px'}"
                              >
                                <el-table-column label="全部评论" width="auto">
                                  <template slot-scope="inner">
                                    <div>{{inner.row.content}} @ {{inner.row.discussor}}</div>
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
                                  :total="commentData.length"
                                ></el-pagination>
                              </div>
                            </span>
                          </el-dialog>
                        </el-row>
                      </el-container>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </el-col>
        </el-row>
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

export default {
  name: "MyComments",
  components: { leftBar },
  data() {
    return {
      dialogVisible1: false,
      form: {
        creator: "",
        book: "",
        content: ""
      },
      currentPage: 1, //初始页
      pagesize: 10, //每页条目数
      rules: {
        book: [{ required: true, message: "书籍不能为空" }],
        content: [{ required: true, message: "推荐理由不能为空" }],
        creator: [{ required: true, message: "推荐人名不能为空" }]
      },
      tableData: []
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        return [1, 2];
      }
    },


    openReply(postId) {
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
              remoteAddr + "forum/replyComment",
              {
                commentID: postId,
                content: value,
                replier: "user"
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
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    }
  },
  mounted() {
    jQuery
      .ajax({
        url: "http://www.husteic.cn:3000/forum/checkPersonalPost",
        type: "get",
        data: {},
        dataType: "json"
      })
      .then(res => {
        console.log(res);
        if (res.code === 1) {
          this.tableData = res.data;
        } else {
          this.$message.error("加载失败");
        }
      })
      .catch(err => {
        console.error(err);
        this.$message.error("网络开小差了");
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

.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 10px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
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
</style>
