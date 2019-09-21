<template>
  <div class="booktravel-fastmenu">
    <transition name="el-zoom-in-bottom">
      <div v-show="show">
        <div class="booktravel-fastmenu-item" style="background-color: rgb(17, 135, 238);">
          <i class="el-icon-caret-top" @click="scrTop"></i>
        </div>
        <div
          v-for="i in menus"
          class="booktravel-fastmenu-item"
          :key="i.id"
          :style="{backgroundColor: i.color}"
        >
          <i :class="i.icon" @click="redirect(i.pagename)" />
        </div>
      </div>
    </transition>
    <div class="booktravel-fastmenu-item booktravel-fastmenu-menu" @click="toggleShow()">
      <i :class="menuIcon[Number(show)]" />
    </div>
  </div>
</template>
<script>
export default {
  name: "FastMenu",
  data() {
    return {
      show: false,
      menuIcon: ["el-icon-arrow-up", "el-icon-arrow-down"],
      menus: [
        {
          pagename: "homePage",
          icon: "el-icon-s-home",
          color: "rgb(38, 201, 106)"
        }
      ]
    };
  },
  methods: {
    redirect(pathname) {
      this.$router.push({ name: pathname });
    },
    toggleShow() {
      this.show = !this.show;
    },
    scrTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      return false;
    }
  }
};
</script>

<style>
.booktravel-fastmenu {
  bottom: 2rem;
  position: fixed;
  right: 2rem;
}

.booktravel-fastmenu-item {
  background-color: black;
  border-radius: 10rem;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 2rem;
  margin: 0.5rem;
  text-align: center;
}

.booktravel-fastmenu-item i {
  height: 4rem;
  line-height: 4rem;
  width: 4rem;
}

.booktravel-fastmenu-item.booktravel-fastmenu-menu {
  background-color: #eee;
  color: #000;
}
</style>
