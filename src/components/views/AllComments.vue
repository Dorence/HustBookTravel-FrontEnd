<template>
  <el-container>
    <!--el-header>评论区</el-header-->

    <!--el-divider></el-divider-->
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>
        <el-row>
          <el-col id="outside" :span="22" :offset="2">
            <!--评论区-->
            <div id="kernel">
              <template>
                <el-table
                  :span-method="arraySpanMethod"
                  ref="filterTable"
                  :data="tableData"
                  header-row-style="height:40px"
                  row-style="height:80px"
                >
                  <el-table-column prop="title" label="最新" sortable width="200" column-key="time">
                    <template slot-scope="scope">
                      <div>
                        <el-link type="success">{{scope.row.title}}</el-link>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="content" label="最热" width="150" sortable column-key="hot">
                    <template slot-scope="scope">
                      <span>{{scope.row.content | ellipsis}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="category"
                    label="分类"
                    width="500"
                    :filters="[{ text: '我的帖子', value: '家' }, { text: '其他帖子', value: '公司' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
                  >
                    <template slot-scope="scope">
                      <el-row>
                        <el-col :span="6" :offset="1">
                          <div>
                            <el-button type="text">点赞:{{scope.row.like}}</el-button>
                          </div>
                        </el-col>
                        <el-col :span="6" :offset="4">
                          <div>
                            <el-button type="text" @click="open">回复</el-button>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10" :offset="1">
                          <div>
                            <el-link type="success">全部评论</el-link>
                          </div>
                        </el-col>
                      </el-row>
                    </template>
                  </el-table-column>

                  <el-table-column align="right">
                    <template slot="header">
                      <el-button @click="drawer = true" type="primary">发帖</el-button>
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
          <el-form-item prop="name" :rules="rules.name" label="书名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="press" :rules="rules.press" label="出版社">
            <el-input v-model="form.press" />
          </el-form-item>
          <el-form-item prop="author" :rules="rules.author" label="作者">
            <el-input v-model="form.author"></el-input>
          </el-form-item>
          <el-form-item prop="reason" :rules="rules.reason" label="发帖理由">
            <el-input
              type="textarea"
              rows="4"
              placeholder="推荐理由"
              v-model="textarea"
              maxlength="500"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即提交</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      </el-drawer>

      <el-footer height="90px">
        <el-divider></el-divider>
        <div class="block">
          <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style>
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
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
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
  margin-left: 75px;
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
  width: 50%;
}

.my-submit-form{
  padding-top: 2rem;
  width: 90rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.my-right-form-inner{
  width: 40rem;
}
</style>

<script>
export default {
  name: "AllComments",
  data() {
    return {
      drawer: false,
      direction: "btt",
      text: "",
      textarea: "",
      form: {
          name: '',
          press: '',
          author: '',
          reason: ''
        },

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
        name: [{ required: true, message: "书名不能为空" }],
        press: [{ required: true, message: "出版社不能为空" }],
        author: [{ required: true, message: "作者不能为空" }],
        reason: [{ required: true, message: "推荐理由不能为空" }]
      },

      tableData: [
        {
          title: "帖子1",
          content:
            "个人主题aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          like: "10",
          comments: "20"
        },
        {
          title: "帖子2"
          //tag: "其他主题"
        },
        {
          title: "帖子3"
          //tag: "个人主题"
        },
        {
          title: "帖子4"
          //tag: "其他主题"
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
