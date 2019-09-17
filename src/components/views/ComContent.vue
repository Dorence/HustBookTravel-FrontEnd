<!--查看帖子-->
<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="12" :offset="1">帖子详情</el-col>
        </el-row>
      </el-header>
      <el-divider></el-divider>
      <el-main>
        <el-row>
          <el-col :span="12" :offset="3
              ">内容</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="3">
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
        </el-row>

        <el-divider></el-divider>
        <el-row>
          <el-col :span="2">全部回复</el-col>
        </el-row>

        <div id="kernel">
          <template>
            <el-table
              ref="filterTable"
              :data="tableData"
              header-row-style="height:40px"
              row-style="height:80px"
            >
              <el-table-column prop="title" label="最新" sortable width="800" column-key="time">
                <template slot-scope="scope">
                  <span>{{scope.row.content | ellipsis}}</span>
                </template>
              </el-table-column>

              <el-table-column align="left">
                <template slot="header">
                  <el-button @click="drawer = true" type="primary">回复</el-button>
                </template>

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
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-main>

      <el-footer height="90px">
        <el-divider></el-divider>
        <div class="block">
          <el-pagination background layout="prev, pager, next" :total="30"></el-pagination>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style>
.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

<script>
export default {
  name: "ComContent",
  data() {
    return {
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