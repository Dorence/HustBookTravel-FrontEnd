<template>
  <div class="booktravel-ventwall">
    <div
      class="booktravel-ventwall-item"
      :style="{'background-color': item.color, 'box-shadow': '2px 2px 2px ' + item.color, height: item.size + 'rem', width: item.size + 'rem', 'font-size': item.size / 11 + 'rem'}"
      v-for="item in propertys"
      v-bind:key="item.index"
    >
      <div class="booktravel-ventwall-item-col">
        <div class="booktravel-ventwall-item-row">
          <el-badge :value="item.reply.length">
            <div class="booktravel-ventwall-item-num">No.{{item.index.slice(-4)}}</div>
            <div class="booktravel-ventwall-item-content">{{item.content}}</div>
          </el-badge>
        </div>
        <el-popover placement="bottom" width="16rem" trigger="click">
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
            <i class="el-icon-s-promotion" :style="{color: item.color}" @click="send(item.index)"></i>
          </div>
          <div class="my-vent-comment">
            <div
              class="my-vent-comment-item"
              v-for="it in item.reply"
              v-bind:key="it.name"
              :style="{color: item.color}"
            >{{it.name+"："+it.content}}</div>
          </div>
          <i slot="reference" class="el-icon-arrow-down" style="color:white"></i>
        </el-popover>
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
    send(index) {
      this.$message.warning("暂未开放");
      return;

      if (this.input.identity == "") {
        this.$message.error("请输入身份");
      } else if (this.input.content == "") {
        this.$message.error("请输入内容");
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
              this.$message.success("发表成功");
              this.input.identity = "";
              this.input.content = "";
            });
          }
        );
      }
    },
    findByTag(tag) {
      /** @warn deprecated */
      return;
      jQuery
        .ajax({
          url: remoteAddr + "right/Opinion/getByTag",
          type: "GET",
          data: { tag: tag },
          dataType: "json"
        })
        .then(res => {
          this.propertys = res.data[0].messages;
        });
    }
  },
  mounted() {
    jQuery.get(remoteAddr + "right/Opinion", res => {
      this.propertys = res.data;
    });
    // jQuery.get(remoteAddr + "right/Opinion/getTags", (res)=> {
    //   this.tags = res.data;
    // });
  }
};
</script>

<style>
@keyframes move {
  to {
    transform: translateY(1rem);
  }
}

.booktravel-ventwall {
  -webkit-animation: move 2s infinite alternate;
  -moz-animation: move 2s infinite alternate;
  -o-animation: move 2s infinite alternate;
  animation: move 2s infinite alternate;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.booktravel-ventwall-item {
  border-radius: 30rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  height: 3rem;
  margin: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  width: 3rem;
  transition: All 0.2s ease-in-out;
}

.booktravel-ventwall-item:hover,
.booktravel-ventwall-item:focus {
  transform: scale(1.25);
}

.booktravel-ventwall-item-col {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.booktravel-ventwall-item-row {
  align-items: center;
  color: #fff;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 70%;
}

.booktravel-ventwall-item-num {
  color: rgba(64, 64, 64, 0.5);
  margin: 0.2rem 0;
}

.booktravel-ventwall-item-content {
  display: -webkit-box;
  font-weight: bold;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: pre-line;
}

.my-vent-comment-title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1.2rem;
}

.my-vent-comment-title-input {
  border: none;
  color: rgb(117, 117, 117);
  padding: 1px 3px;
  width: 8.5rem;
}

.my-vent-comment-title-input:focus {
  border: 0.75px solid rgba(128, 128, 128, 0.3);
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
  overflow-y: auto;
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
</style>
