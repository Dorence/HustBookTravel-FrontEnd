<template>
  <el-container>
    <!--el-header>评论区</el-header-->

    <!--el-divider></el-divider-->
    <el-aside width="200px">
      <div>
        <el-col class="my-left-bar">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-menu-item @click="redirect('AllComments')">
              <i class="el-icon-menu"></i>
              <span slot="title" class="name">全部帖子</span>
            </el-menu-item>
            <el-menu-item @click="redirect('MyComments')">
              <i class="el-icon-menu"></i>
              <span slot="title" class="name">我的帖子</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="12" :offset="2">全部帖子</el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col id="outside" :span="23" :offset="1">
            <!--评论区-->
            <div id="kernel">
              <template>
                <el-table
                  ref="filterTable"
                  :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  header-row-style="height:40px"
                  row-style="height:80px"
                  stripe
                  :cell-style="{'vertical-align':'top'}"
                >
                  <el-table-column label="最新" sortable width="auto" column-key="time">
                    <template slot-scope="scope">
                      <div>
                        <el-image
                          style="width: 100px; height: 100px"
                          :src="scope.row.picture"
                          :fit="fill"
                        ></el-image>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column label="最热" width="auto" sortable column-key="hot">
                    <template slot-scope="scope">
                      <el-row>
                        <el-col>书名：{{scope.row.bookName}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col>出版社：{{scope.row.press}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col>作者：{{scope.row.author}}</el-col>
                      </el-row>
                      <el-row>
                        <el-col>推荐人：{{scope.row.commentor}}</el-col>
                      </el-row>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="category"
                    label="分类"
                    width="auto"
                    :filters="[{ text: '全部', value: 'all' }, { text: '人文类', value: 'humanity' },
                    {text: '艺术类', value: 'art'}, {text: '自然科学类', value: 'science'},
                    {text: '管理类', value: 'management'}]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
                  >
                    <template slot-scope="scope">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="推荐理由" name="1">
                          <!--div>{{scope.row.content | ellipsis}}</div-->
                          <div>{{scope.row.content}}</div>
                        </el-collapse-item>
                      </el-collapse>
                    </template>
                  </el-table-column>

                  <el-table-column align="right">
                    <template slot="header">
                      <el-button @click="drawer = true" type="primary">发帖</el-button>
                    </template>
                    <template slot-scope="scope">
                      <el-row>
                        <el-col :span="6" :offset="4">
                          <div>
                            <!--el-button type="text">点赞:{{scope.row.like}}</el-button-->
                            <el-button type="text" icon="el-icon-thumb"></el-button>
                          </div>
                        </el-col>
                        <el-col :span="6" :offset="4">
                          <div>
                            <el-button type="primary" @click="open">回复</el-button>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="20" :offset="0">
                          <template>
                            <div>
                              <el-button type="text" @click="dialogVisible = true">查看全部评论</el-button>
                              <el-dialog :visible.sync="dialogVisible" width="50%">
                                <el-table
                                  ref="filterTable"
                                  :data="commentData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                                  header-row-style="height:40px"
                                  row-style="height:80px"
                                >
                                  <el-table-column label="全部评论" width="auto">
                                    <template slot-scope="scope">
                                      <div>{{scope.row.content}}</div>
                                    </template>
                                  </el-table-column>
                                </el-table>
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
                            </div>
                          </template>
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </el-col>
        </el-row>
      </el-main>

      <el-drawer
        title="发帖"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size="70%"
      >
        <div class="my-submit-form">
          <el-form ref="form" :model="form" label-width="80px" class="my-right-form-inner">
            <el-form-item prop="commentor" :rules="rules.commentor" label="推荐人">
              <el-input v-model="form.commentor"></el-input>
            </el-form-item>
            <el-form-item prop="name" :rules="rules.name" label="书名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="press" :rules="rules.press" label="出版社">
              <el-input v-model="form.press" />
            </el-form-item>
            <el-form-item prop="author" :rules="rules.author" label="作者">
              <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item prop="reason" :rules="rules.reason" label="推荐理由">
              <el-input type="textarea" rows="4" v-model="textarea" maxlength="500" show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
              <el-col :offset="20">
                <el-button type="primary" @click="onSubmit('form')">立即提交</el-button>
              </el-col>
              <!-- <el-button>取消</el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>

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
  width: 90rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.my-right-form-inner {
  width: 40rem;
}
</style>

<script>
export default {
  name: "AllComments",
  data() {
    return {
      dialogVisible: false,
      drawer: false,
      direction: "btt",
      text: "",
      textarea: "",
      form: {
        commentor: "",
        name: "",
        press: "",
        author: "",
        reason: ""
      },
      currentPage: 1, //初始页
      pagesize: 10, //每页条目数

      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      rules: {
        commentor: [{ required: true, message: "推荐人名不能为空" }],
        name: [{ required: true, message: "书名不能为空" }],
        press: [{ required: true, message: "出版社不能为空" }],
        author: [{ required: true, message: "作者不能为空" }],
        reason: [{ required: true, message: "推荐理由不能为空" }]
      },
      commentData: [
        {
          content: "hahahahahahah"
        },
        {
          content: "hohohohohohoh"
        }
      ],
      tableData: [
        {
          title: "帖子1",
          bookName: "矩阵的次",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子2",
          bookName: "曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content: "个人主题",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次and曲面的侧",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        },
        {
          title: "帖子3",
          bookName: "矩阵的次",
          press: "华中科技大学出版社",
          author: "李开丁",
          commentor: "李丹",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20",
          picture:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        }
      ]
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
    redirect(pathname){
      this.$router.push({ name: pathname })
    },
    open() {
      this.$prompt("请输入回复内容", "提示", {
        confirmButtonText: "发送",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "回复内容不能为空"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "发送成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    handleChange(val) {
      console.log(val);
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
