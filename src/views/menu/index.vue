<template>
  <div class="menu-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small">添加菜单</el-button>
      </div>
      <el-table :data="menuList" stripe style="width: 100%">
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="name" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="level" label="菜单级数" width="180">
        </el-table-column>
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="editMenu(scope.row)" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getAllMenu } from "@/services/menu";

export default Vue.extend({
  data() {
    return {
      menuList: [],
    };
  },
  created() {
    this.queryMenu();
  },
  methods: {
    async queryMenu() {
      const { data } = await getAllMenu();
      if (data.code === "000000") {
        this.menuList = data.data;
      }
    },
    editMenu(row) {
      console.log(row);
    },
  },
});
</script>

<style lang="sass" scoped></style>
