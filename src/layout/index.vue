<template>
  <el-container>
    <el-aside width="auto">
      <aside-menu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <header-crumb @changeCollapse="changeCollapse" />
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";
import asideMenu from "./components/aside-menu.vue";
import headerCrumb from "./components/header-crumb.vue";
export default Vue.extend({
  components: {
    asideMenu,
    headerCrumb,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  min-width: 980px;
  min-height: 100vh;
  background-color: #e9eef3;
}
.el-aside {
  background-color: #fff;
}
.el-header {
  background-color: #f8f9fb;
}
</style>
