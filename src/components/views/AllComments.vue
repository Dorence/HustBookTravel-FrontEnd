<template>
  <el-container>
    <!--el-header>评论区</el-header-->

    <!--el-divider></el-divider-->

    <el-row>
      <el-col id="outside" :span="22" :offset="2">
        <!--评论区-->
        <div id="kernel">
          <el-table ref="filterTable" :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="最新" sortable width="150" column-key="date"></el-table-column>
            <el-table-column prop="hot" label="最热" width="150" sortable column-key="hot"></el-table-column>
            <el-table-column
              prop="category"
              label="分类"
              width="150"
              :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            ></el-table-column>

            <el-table-column align="right">
              <template slot="header">
                <el-button @click="drawer = true" type="primary" style="margin-bottom: 16px;">发帖</el-button>
              </template>
              <template slot-scope="scope">
                <span>回复:</span>
                <span>点赞:</span>
              </template>

              <!-- 发帖 -->
              <el-drawer
                title="发帖"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose"
                size="60%"
              >

                <el-row :gutter="20">
                  <el-col :span="3" :offset="6">
                    <!-- title -->
                    <template>
                      <el-select v-model="value" placeholder="请选择类别">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </template>
                    <div style="margin: 10px 0;"></div>
                  </el-col>
                  <el-col :span="6" :offset="2">
                    <el-input
                      type="text"
                      placeholder="请输入书名"
                      v-model="text"
                      maxlength="10"
                      show-word-limit
                    ></el-input>
                  </el-col>
                </el-row>
                <!--发帖内容 -->
                <el-row :gutter="20">
                  <el-col :span="12" :offset="6">
                    <el-input
                      type="textarea"
                      rows="10"
                      placeholder="请输入内容"
                      v-model="textarea"
                      maxlength="30"
                      show-word-limit
                    ></el-input>
                  </el-col>
                </el-row>
              </el-drawer>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-footer>
      <el-divider></el-divider>
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
      </div>
    </el-footer>
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
  background-color: #cfbcbc;
  color: #333;
  text-align: center;
  line-height: 10px;
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
  margin-right: 50px;
  margin-bottom: 75px;
  margin-left: 75px;
}
</style>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "btt",
      text: "",
      textarea: "",

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
          date: "帖子"
          //tag: "个人主题"
        },
        {
          date: "帖子"
          //tag: "其他主题"
        },
        {
          date: "帖子"
          //tag: "个人主题"
        },
        {
          date: "帖子"
          //tag: "其他主题"
        }
      ]
    };
  },
  methods: {
    /*
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      */
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
    }
  }
};
</script>