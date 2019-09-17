<template>
  <el-container>
    <!--el-header>评论区</el-header-->

    <!--el-divider></el-divider-->
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="12" :offset="11
              ">我的帖子</el-col>
        </el-row>
      </el-header>
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
                        <el-col :span="10" :offset="1">点赞数: {{scope.row.like}}</el-col>
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

                  <el-table-column align="left">
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



<script>
export default {
  name: "MyComments",
  data() {
    return {
      drawer: false,
      direction: "btt",
      text: "",
      textarea: "",
      form: {
        name: "",
        press: "",
        author: "",
        reason: ""
      },
      rules: {
        name: [{ required: true, message: "书名不能为空" }],
        press: [{ required: true, message: "出版社不能为空" }],
        author: [{ required: true, message: "作者不能为空" }],
        reason: [{ required: true, message: "推荐理由不能为空" }]
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