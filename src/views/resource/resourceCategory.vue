<template>
  <div class="menu-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" @click="addOrder">添加</el-button>
      </div>
      <el-table
        v-loading="isLoading"
        :data="resourceCategories"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="编号"
          align="center"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
          min-width="200"
        ></el-table-column>
        <el-table-column label="创建时间" min-width="200" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.createdTime | getDate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        ></el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          min-width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editOrder(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="deleteOrder(scope.row)"
              >删除</el-button
            >

            <!-- @click="handleDeletMenu(scope.row)" -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="`${editInfo.id ? '编辑' : '添加'}分类`"
      width="30%"
      center
      :visible.sync="dialogFormVisible"
    >
      <add-order-update
        v-if="dialogFormVisible"
        :editInfo="editInfo"
        @closeDialog="closeDialog"
      />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { getAllCategory, deleteResourceCategory } from "@/services/resource";
import addOrderUpdate from "./components/addOrderUpdate.vue";

export default Vue.extend({
  components: {
    addOrderUpdate,
  },
  data() {
    return {
      isLoading: false,
      resourceCategories: [],
      dialogFormVisible: false,
      editInfo: {},
    };
  },
  filters: {
    getDate: function (day: string) {
      return moment(day).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.queryAllCategory();
  },
  methods: {
    async queryAllCategory() {
      const { data } = await getAllCategory();
      console.log(data);
      if (data.code === "000000") {
        this.resourceCategories = data.data;
      }
    },
    addOrder() {
      this.editInfo = {};
      this.dialogFormVisible = true;
    },
    editOrder(row: any) {
      this.editInfo = row;
      this.dialogFormVisible = true;
    },
    deleteOrder(row: any) {
      this.$confirm("确定是否要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteResourceCategory(row.id);
          if (data.code === "000000") {
            this.$message.success("删除成功");
            this.queryAllCategory();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    closeDialog() {
      this.queryAllCategory();
      this.dialogFormVisible = false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
