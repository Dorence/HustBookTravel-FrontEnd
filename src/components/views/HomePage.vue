<template>
  <div>
    <el-row class="booktravel-intro">
      <h1>华中科技大学图书漂流</h1>
    </el-row>
    <el-divider></el-divider>
    <el-row class="booktravel-notice">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" v-for="i in fdback" v-bind:key="i.id">
        <el-card shadow="hover">
          <div slot="header" class="booktravel-notice-header">
            <span>{{i.title}}</span>
          </div>
          <p class="booktravel-notice-p">{{i.body}}</p>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="booktravel-emergency">
      <h2>如果遇到紧急特殊情况怎么办？</h2>
      <p class="booktravel-emergency-body">
        大家可以在线下找到我们站点勤工岗的同学进行咨询，
        <br />同时也可按照下面的联系方式，联系我们主办方。
        <br />张鸿鹄 —— 电话：17786284532&ensp;QQ：634865427
        <br />如果有什么紧急问题也可以加入我们的
        <el-popover placement="right" width="300" trigger="hover">
          <el-button type="text" slot="reference">活动群</el-button>
          <el-image :src="qrcodeURL" />
        </el-popover>
      </p>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "HomePage",
  data() {
    return {
      qrcodeURL: "../../../static/qrcode.jpg",
      fdback: [
        {
          id: 0,
          title: "新同学怎么借书？",
          body:
            "同学可以在我们勤工岗的同学的帮助下在网页完成注册，输入自己的基本信息，之后可以登陆进入我们的主页，在左上角点击主页旁边，点击借书，即可在勤工岗同学处进行图书借阅，同学在注册的时候需要如实填写自己的基本信息。"
        },
        {
          id: 1,
          title: "在哪里能借到图书？在哪里能还图书呢？",
          body:
            "本次图书漂流活动设有四个站点，分别是西十二、西五、东九、东十二四处的勤工岗，在四个站点处均可还书，但是借书需要在主页上查询图书所在的站点，去往对于位置站点进行借书。"
        },
        {
          id: 2,
          title: "图书在借阅的过程中损坏、污损怎么办？",
          body:
            "请同学们在借阅的过程中仔细保管好自己的图书，在还书的时候会有勤工岗同学进行查看图书的完整度。大家可以在书中书写自己的看法（留小纸条等待一个有缘的拾荒者）但是不得恶意损坏、撕毁、污损书籍，我们会根据图书的情况酌情处理，会体谅图书有误损的情形，但是绝对不会漏掉恶意损坏的情况。"
        },
        {
          id: 3,
          title: "想发表评论或分享我喜爱的书籍怎么办？",
          body:
            "我们的网站设有线上评论区，可以供大家在线上评论交流，也可以让大家找到与你志同道合的那一拾荒者。让你我在书海里一同遨游，向同一个方向进发。"
        },
        {
          id: 4,
          title: "借阅有时间限制吗？想继续借阅怎么办？",
          body:
            "本次活动借阅时间为7天时间\n如果大家出现未读完的情况，可以到各个站点的勤工岗同学处或线上申请加时借阅，加时借阅为期7天，最多每人加时1次。"
        },
        {
          id: 5,
          title: "作为第二个子活动和之后的子活动有关联吗？",
          body:
            "我们会在评论中选择喜爱度和讨论度最高的书籍中选出一部分，会在第三个子活动解读会举办的时候请相关专家来进行深入解读。大家如果有特别想推荐的书籍也可以联系我们主办方，同时我们会对推荐热门书籍的同学给予相应的一些奖励。"
        }
      ]
    };
  }
};
</script>

<style scoped>
.booktravel-intro {
  background-color: rgba(180, 180, 180, 0.6);
  background-image: url(../../../static/book.jpg);
  background-repeat: no-repeat;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  min-height: 78vh;
  padding: 10px;
}

.booktravel-intro h1 {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fafafa;
  font-family: "PingFang SC", "Microsoft YaHei", Helvetica;
  font-size: 70px;
  letter-spacing: 4.6px;
  margin-top: 8px;
  padding: 20px;
  text-align: center;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05), 2.2px 2.2px 0 rgba(0, 0, 0, 0.6);
}

.booktravel-notice .el-card {
  margin: 0.6rem 16px;
  height: 300px;
}

.booktravel-notice-header {
  font-weight: bold;
  font-size: 20px;
}

.booktravel-notice-p {
  white-space: pre-line;
}

.booktravel-emergency {
  background-color: rgba(56, 142, 60, 0.9);
  padding-left: 35px;
  color: #f6f6f6;
}

.booktravel-emergency .el-button {
  color: #fff;
  font-weight: bold;
  border: none;
  font-size: inherit;
  padding: 2px 6px;
}

.booktravel-emergency .el-button:hover,
.booktravel-emergency .el-button:focus {
  background-color: #f6f6f6;
  color: rgba(56, 142, 60, 0.9);
}
</style>
