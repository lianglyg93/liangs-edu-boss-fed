<template>
  <div class="header-crumb">
    <div class="header-crumb-left">
      <button
        type="button"
        class="el-button hamburger el-button--text"
        @click="$emit('changeCollapse')"
      >
        <i class="el-icon-s-unfold"></i>
      </button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          :src="
            userInfo.portrait ||
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item @click.native="layout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getUserInfo } from "@/services/user";
export default Vue.extend({
  name: "headerCrumb",
  created() {
    this.queryUserInfo();
  },
  data() {
    return {
      userInfo: "",
    };
  },
  methods: {
    async queryUserInfo() {
      const { data } = await getUserInfo();
      console.log(data);
      if (data?.content) {
        this.userInfo = data.content;
      }
    },
    layout() {
      this.$confirm("确定是否要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.commit("setUser", null);
          this.$router.push({
            name: "login",
          });
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.header-crumb {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hamburger {
    margin-right: 10px;
    padding: 15px;
    font-size: 20px;
    border: 0;
    border-radius: 0;
    float: left;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
