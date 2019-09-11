<template>
  <el-container>
    <el-header>评论区</el-header>
    <el-main>
      <!--el-divider></el-divider-->
      <el-table ref="filterTable" :data="tableData" style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <!--template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.tag}}</el-tag>
          </template-->
        </el-table-column>
      </el-table>
      <!--template>
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column prop="title" sortable label="所有主题"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="300"
            :filters="[{ text: '个人主题', value: '个人主题' }, 
            { text: '其他主题', value: '其他主题' },
            { text: 'a', value: 'a'},
            { text: 'b', value: 'b'}]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '个人主题' ? 'primary' : 'success'"
                disable-transitions
              >{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template-->
    </el-main>
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
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 0px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          title: "帖子"
          //tag: "个人主题"
        },
        {
          title: "帖子"
          //tag: "其他主题"
        },
        {
          title: "帖子"
          //tag: "个人主题"
        },
        {
          title: "帖子"
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
    }
  }
};
</script>