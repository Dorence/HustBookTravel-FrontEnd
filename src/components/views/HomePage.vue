<template>
  <div>
    <el-row class="booktravel-intro">
      <h1>华中科技大学读书漂流</h1>
      <blockquote class="booktravel-intro-quote">
        <p>
          清晨醒来，读几页书，是很好的醒脑。
          <br />睡觉以前，读几页书，是很好的催眠。
          <br />忙中偷闲，读几页书，是很好的调节。
          <br />闲来无事，读几页书，是很好的消遣。
          <br />
          <br />在火车上读书，任窗外风景展现，非常浪漫。
          <br />在飞机上读书，任窗下白云翻卷，恍若神仙。
          <br />在山林中读书，听风吟蝉鸣，雅趣与野趣相融。
          <br />在大海边读书，听惊涛拍岸，心情与诗情俱佳。
          <br />
          <br />一个人最大的不幸，是从未读过书。
          <br />一个人最大的愚顽，是不喜读书。
          <br />一个不读书的社会，是浮躁的病态社会。
          <br />一个不喜读书的民族，是没有出息和未来的民族。
          <br />
          <br />个人要生存和发展，有赖于读书。
          <br />国家要繁荣昌盛，要大兴读书之风。
          <br />中国梦的实现，中华民族的崛起，与读书密切相关。
        </p>
        <footer style="font-size: 16px">————&emsp;活动举办方</footer>
      </blockquote>
    </el-row>
    <el-divider></el-divider>
    <el-row class="booktravel-notice booktravel-home-margin" :gutter="8">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
        <el-card shadow="hover">
          <div slot="header" class="booktravel-notice-header">如果读者遗失了图书，图书馆会如何处理？</div>
          <p>
            书刊遗失，应及时报失。尽量购买原版本（ISBN号相同）图书抵还，要求图书基本完好，没有缺页，没有涂划，并交纳文献加工费每册10元。
            <br />如购买不到原版图书，按以下规定赔偿：流通部门将待赔的图书书目信息统一发送到采编部，由采编部专人核定赔书金额。流通部门的工作人员根据采编部意见处理赔书业务。赔书的受理时间为5个工作日。
            <br />办理完赔书手续后，图书馆将不再接纳读者又找回的原书。
          </p>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
        <el-card shadow="hover">
          <div slot="header" class="booktravel-notice-header">如果读者遗失了图书，图书馆会如何处理？</div>
          <p>
            书刊遗失，应及时报失。尽量购买原版本（ISBN号相同）图书抵还，要求图书基本完好，没有缺页，没有涂划，并交纳文献加工费每册10元。
            <br />如购买不到原版图书，按以下规定赔偿：流通部门将待赔的图书书目信息统一发送到采编部，由采编部专人核定赔书金额。流通部门的工作人员根据采编部意见处理赔书业务。赔书的受理时间为5个工作日。
            <br />办理完赔书手续后，图书馆将不再接纳读者又找回的原书。
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "HomePage",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  font-size: 16px;
  color: #fff;
  text-shadow: 0.6px 0.6px 1.2px #ddd;
}

blockquote .small,
blockquote footer,
blockquote small {
  display: block;
  font-size: 90%;
  line-height: 1.42857143;
  color: #ddd;
}

.booktravel-intro {
  background-color: rgba(180, 180, 180, 0.6);
  background-image: url(../../../static/book.jpg);
  background-repeat: no-repeat;
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  min-height: 91vh;
  padding: 10px;
}

.booktravel-intro h1 {
  color: #fafafa;
  font-family: "PingFang SC", "Microsoft YaHei", Helvetica;
  font-size: 40px;
  letter-spacing: 4.6px;
  text-align: center;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05), 2.2px 2.2px 0 rgba(0, 0, 0, 0.6);
}

.booktravel-intro blockquote {
  width: 420px;
  font-family: 	SimSun;
  font-size: 16px
}

.booktravel-notice .el-card {
  margin-bottom: 1rem;
}

.booktravel-notice-header {
  font-weight: bold;
  font-size: 20px;
}

.booktravel-home-margin {
  margin-left: 8px !important;
  margin-right: 8px !important;
}
</style>
