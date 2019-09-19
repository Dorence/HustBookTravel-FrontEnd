<template>
  <div>
    <div class="img">
      <img class="img" src="../../assets/book.jpg" width="100%" height="audo" alt="图片" />
    </div>
    <div class="intro">
      <div class="title">
        <h1 class="title">华中科技大学读书漂流</h1>
      </div>
      <div class="intro-body">
        <el-tabs tabPosition="left">
          <el-tab-pane class="intro-body-txt">
            <span slot="label" class="intro-body-title">活动概括</span>
            <p class="body">
              “当我年轻的时候，我梦想改变这个世界；
              <br />当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；
              <br />当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。
              <br />当我现在躺在床上，行将就木时，我突然意识到：
              <br />如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；
              <br />在家人的帮助和鼓励下，我可能为国家做一些事情；
              <br />然后，谁知道呢?我甚至可能改变这个世界。”
            </p>
            <p class="organizer">——————活动举办方&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </el-tab-pane>
          <el-tab-pane class="intro-body-txt">
            <span slot="label" class="intro-body-title">注意事项</span>
            <el-row>
              <el-col :span="8">
                <el-card class="box-card">
                  <h3>如果读者遗失了图书，图书馆会如何处理？</h3>
                  <p class="questions">
                    书刊遗失，应及时报失。尽量购买原版本（ISBN号相同）图书抵还，要求图书基本完好，没有缺页，没有涂划，并交纳文献加工费每册10元。
                    <br />如购买不到原版图书，按以下规定赔偿：流通部门将待赔的图书书目信息统一发送到采编部，由采编部专人核定赔书金额。流通部门的工作人员根据采编部意见处理赔书业务。赔书的受理时间为5个工作日。
                    <br />办理完赔书手续后，图书馆将不再接纳读者又找回的原书。
                  </p>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="box-card">
                  <h3>如果读者遗失了图书，图书馆会如何处理？</h3>
                  <p class="questions">
                    书刊遗失，应及时报失。尽量购买原版本（ISBN号相同）图书抵还，要求图书基本完好，没有缺页，没有涂划，并交纳文献加工费每册10元。
                    <br />如购买不到原版图书，按以下规定赔偿：流通部门将待赔的图书书目信息统一发送到采编部，由采编部专人核定赔书金额。流通部门的工作人员根据采编部意见处理赔书业务。赔书的受理时间为5个工作日。
                    <br />办理完赔书手续后，图书馆将不再接纳读者又找回的原书。
                  </p>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card class="box-card">
                  <h3>如果读者遗失了图书，图书馆会如何处理？</h3>
                  <p class="questions">
                    书刊遗失，应及时报失。尽量购买原版本（ISBN号相同）图书抵还，要求图书基本完好，没有缺页，没有涂划，并交纳文献加工费每册10元。
                    <br />如购买不到原版图书，按以下规定赔偿：流通部门将待赔的图书书目信息统一发送到采编部，由采编部专人核定赔书金额。流通部门的工作人员根据采编部意见处理赔书业务。赔书的受理时间为5个工作日。
                    <br />办理完赔书手续后，图书馆将不再接纳读者又找回的原书。
                  </p>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePage",
  data() {
    return {};
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style>
.intro-body-title {
  font-size: 15px;
}
h1 {
  text-align: center;
}
p.body {
  text-align: center;
}
p.organizer {
  text-align: right;
}
p.questions {
  text-align: justify;
}
.box-card {
  width: 480px;
}
</style>
