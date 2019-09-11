<template>
  <div class="my-bottom">
    <div class="my-copy">Copyright &copy;2019 HUST Wuhan, China. All Right Reserved.</div>
  </div>
</template>
<script>
export default {
  name: "BottomBar",
  data() {
    return {};
  }
};
</script>

<style>
body {
  height: 1rem;
  margin: 0;
}
.my-bottom {
  align-items: center;
  color: #525252;
  bottom: 0;
  width: 100%;
  padding-top: 2rem;
}
.my-copy {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.72rem;
  padding: 10px 12px;
  width: 100%;
}
</style>
