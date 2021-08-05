<template>
  <div>
    <a class="logo router-link-active" title="Back to Home"
      ><img
        src="http://eduboss.lagou.com/edu-boss-fed/assets/img/logo.e8b9190b.png"
        alt="LagouEdu"
      />
      <h1 v-show="!isCollapse">Edu Boss</h1>
    </a>
    <el-menu
      default-active="4"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-setting"></i>
          <span slot="title">角色列表</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-setting"></i>
          <span slot="title">菜单列表</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-setting"></i>
          <span slot="title">资源列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-film"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-setting"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "asideMenu",
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleOpen(key: string, keyPath: string): void {
      console.log(key, keyPath);
    },

    handleClose(key: string, keyPath: string): void {
      console.log(key, keyPath);
    },
  },
});
</script>

<style lang="scss" scoped>
.el-submenu {
  width: 200px;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #495057;
  line-height: 50px;
  text-decoration: none;
  text-align: center;
  img {
    margin: 10px;
    width: 30px;
  }
  h1 {
    display: inline-block;
    margin: 0;
    width: 95px;
    overflow: hidden;
    font-size: 20px;
    white-space: nowrap;
    transition: width 0.3s;
  }
}
</style>
