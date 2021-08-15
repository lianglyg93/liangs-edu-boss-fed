<template>
  <div class="menu-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" @click="$router.push({ name: 'addOrEditMenu' })"
          >添加菜单</el-button
        >
      </div>
      <el-table :data="menuList" stripe style="width: 100%">
        <el-table-column
          type="index"
          label="编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          min-width="300"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          min-width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEditMenu(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDeletMenu(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getAllMenu, deleteMenu } from "@/services/menu";

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
    handleEditMenu(row: any) {
      this.$router.push({
        name: "addOrEditMenu",
        params: {
          id: row.id,
        },
      });
    },
    handleDeletMenu(row: any) {
      this.$confirm("确定是否要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteMenu(row.id);
          if (data.code === "000000") {
            this.$message.success("删除成功");
            this.queryMenu();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除",
          // });
        });
    },
  },
});
</script>

<style lang="scss" scoped></style>
