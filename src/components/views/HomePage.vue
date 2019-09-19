<template>
  <div>
    <el-row class="booktravel-intro">
      <h1>华中科技大学读书漂流</h1>
      <blockquote class="booktravel-intro-quote">
        <p>
          当我年轻的时候，我梦想改变这个世界；
          <br />当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；
          <br />当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。
          <br />当我现在躺在床上，行将就木时，我突然意识到：
          <br />如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；
          <br />在家人的帮助和鼓励下，我可能为国家做一些事情；
          <br />然后，谁知道呢?我甚至可能改变这个世界。
        </p>
        <footer>————&emsp;活动举办方</footer>
      </blockquote>
    </el-row>
    <el-divider></el-divider>
    <h2 class="booktravel-home-margin">注意事项</h2>
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
  font-size: 32px;
  letter-spacing: 4.6px;
  text-align: center;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05), 2.2px 2.2px 0 rgba(0, 0, 0, 0.6);
}

.booktravel-intro blockquote {
  width: 420px;
}

.booktravel-notice .el-card{
  margin-bottom: 1rem;
}

.booktravel-notice-header {
  font-weight: bold;
  font-size: 20px;
}

.booktravel-home-margin {
  margin-left: 8px!important;
  margin-right: 8px!important;
}
</style>
