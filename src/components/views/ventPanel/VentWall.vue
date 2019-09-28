<template>
  <div class="my-vent-wall-outer">
    <div class="my-vent-wall-title">
      活动感受
      <i class="el-icon-sunny" style="color:#F56C6C;font-size:4rem;margin-left:0.5rem;" />
    </div>
    <div class="my-vent-wall-line"></div>
    <div class="my-vent-wall-subtitle">这个活动大家觉得怎么样呢，有什么想说的和大家分享吧</div>
    <div class="my-vent-wall">
      <div
        class="my-vent-wall-item"
        :style="{'background-color': item.color, 'box-shadow': '2px 2px 2px ' + item.color, height: item.size + 'rem', width: item.size + 'rem', 'font-size': item.size / 11 + 'rem'}"
        v-for="item in propertys"
        v-bind:key="item.index"
      >
        <div class="my-vent-wall-item-col">
          <div class="my-vent-wall-item-row">
            <el-badge :value="item.reply.length">
              <div class="my-vent-wall-item-num">No.{{item.index.slice(-5)}}</div>
              <div class="my-vent-wall-item-row-inner">{{item.content}}</div>
            </el-badge>
          </div>
          <el-popover placement="bottom" width="15rem" transition="none" trigger="click">
            <div class="my-vent-comment-title-container">
              <div class="my-vent-comment-title">评论</div>
              <input
                placeholder="身份"
                style="width: 2.6rem;margin-left:1rem;"
                class="my-vent-comment-title-input"
                v-model="input.identity"
                maxlength="5"
              />
              <input
                placeholder="内容（10字）"
                class="my-vent-comment-title-input"
                v-model="input.content"
                maxlength="10"
              />
              <i class="el-icon-s-promotion" :style="'color:'+item.color" @click="send(item.index)"></i>
            </div>
            <div class="my-vent-comment">
              <div
                class="my-vent-comment-item"
                :style="{color: item.color}"
                v-for="it in item.reply"
                v-bind:key="it.name"
              >{{it.name+"："+it.content}}</div>
            </div>
            <i slot="reference" class="el-icon-arrow-down" style="color:white"></i>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { remoteAddr } from "@/config";

export default {
  name: "VentWall",
  data() {
    return {
      input: {
        identity: "",
        content: ""
      },
      propertys: []
    };
  },
  methods: {
    shallow(color, num) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
      if ((r + num > 255) | (r + num < 0)) {
        if (r + num > 255) {
          r = 255;
        } else {
          r = 0;
        }
      } else {
        r = r + num;
      }
      if ((g + num > 255) | (g + num < 0)) {
        if (g + num > 255) {
          g = 255;
        } else {
          g = 0;
        }
      } else {
        g = g + num;
      }
      if ((b + num > 255) | (b + num < 0)) {
        if (b + num > 255) {
          b = 255;
        } else {
          b = 0;
        }
      } else {
        b = b + num;
      }
      return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    },
    send(index) {
      if (this.input.identity == "") {
        this.$message({
          message: "请输入身份内容",
          type: "warning"
        });
      } else if (this.input.content == "") {
        this.$message({
          message: "请输入内容",
          type: "warning"
        });
      } else {
        jQuery.post(
          remoteAddr + "right/Opinion/Reply",
          {
            content: this.input.content,
            name: this.input.identity,
            index: index
          },
          res => {
            //console.log(res);
            this.tableData = res.data;
            jQuery.get(remoteAddr + "right/Opinion", res => {
              console.log(res);
              this.propertys = res.data;
              this.$message({
                message: "发表成功",
                type: "success"
              });
              this.input.identity = "";
              this.input.content = "";
            });
          }
        );
      }
    },
    findByTag(tag) {
      var that = this;
      jQuery.get(remoteAddr + "right/Opinion/getByTag", { tag: tag }, function(
        res
      ) {
        console.log(res.data);
        that.propertys = res.data[0].messages;
        console.log(that.propertys);
      });
    }
  },
  mounted() {
    var that = this;
    jQuery.get(remoteAddr + "right/Opinion", function(res) {
      // console.log(res);
      that.propertys = res.data;
    });
    jQuery.get(remoteAddr + "right/Opinion/getTags", function(res) {
      // console.log(res);
      that.tags = res.data;
    });
  }
};
</script>

<style>
.my-ventwall-tags {
  display: flex;
  flex-direction: row;
  margin: 1rem;
  width: 100%;
}

.my-vent-wall-item {
  animation: move 1.3s infinite alternate;
  border-radius: 30rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  height: 3rem;
  margin: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  width: 3rem;
  transition: All 0.2s ease-in-out;
}

.my-vent-wall-item:hover,
.my-vent-wall-item:focus {
  transform: scale(1.25);
}

.my-vent-wall-item-num {
  color: rgba(51, 51, 51, 0.274);
  margin: 0.2rem;
}

.my-vent-wall-item-col {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.my-vent-wall-item-row {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.my-vent-wall-item-row-inner {
  font-weight: bold;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden; /*超出隐藏*/
  display: -webkit-box; /*设置弹性盒模型*/
  white-space: pre-line;
}

.my-vent-comment-title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1.2rem;
}

.my-vent-comment-title-input {
  color: rgb(117, 117, 117);
  width: 8.5rem;
  border: 0;
  margin-left: 0.5rem;
}

.my-vent-comment-title {
  color: #000000;
}
.my-vent-wall-outer {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.my-vent-wall-line {
  border-top: 1px rgb(182, 182, 182) solid;
  width: 4rem;
  margin-right: 5rem;
}
.my-vent-wall {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.my-vent-wall-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 5rem;
  font-size: 2rem;
  font-weight: bold;
}

.my-vent-wall-subtitle {
  padding-right: 5rem;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  color: rgb(143, 143, 143);
}

.my-vent-comment {
  color: white;
  border-radius: 0.5rem;
  height: 8rem;
  width: 15rem;
  overflow-y: scroll;
}

.my-vent-comment-item {
  font-weight: bold;
  font-family: "YouYuan";
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.411);
}

@keyframes move {
  from {
    top: 0rem;
  }
  to {
    top: 1rem;
  }
}
</style>
