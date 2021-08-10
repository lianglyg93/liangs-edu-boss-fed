<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <el-button size="small" @click="$router.push({ name: 'addOrEdit' })"
          >资源管理</el-button
        > -->
        <el-form
          :inline="true"
          ref="resourceForm"
          label-position="right"
          :model="queryParams"
          label-width="80px"
        >
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="queryParams.name"></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="queryParams.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId" label="资源分类">
            <el-select
              v-model="queryParams.categoryId"
              placeholder="请选择资源分类"
              clearable
            >
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询搜索</el-button
            >
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>

        <div class="btn-wrap">
          <el-button size="small" @click="addResource">添加</el-button>
          <!-- :disabled="isLoading" -->
          <el-button
            size="small"
            @click="$router.push({ name: 'resourceCategory' })"
            >资源分类</el-button
          >
        </div>
      </div>
      <el-table
        v-loading="isLoading"
        :data="resourceList"
        stripe
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
          label="资源名称"
          align="center"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          align="center"
          min-width="300"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          min-width="200"
        ></el-table-column>
        <!-- <el-table-column prop="createdTime" label="添加时间"></el-table-column> -->
        <el-table-column label="添加时间" width="180" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.createdTime | getDate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEditResource(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDeletResource(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.current"
        :page-sizes="[10, 15, 20]"
        :page-size="queryParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
    <!-- 添加编辑资源 -->
    <add-or-edit-resource
      v-model="showAddResource"
      :editId="editId"
      :resourceCategories="resourceCategories"
      @queryResource="queryResource"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";
import {
  getResourcePages,
  getAllCategory,
  deleteResource,
} from "@/services/resource";
import { Form } from "element-ui";
import addOrEditResource from "./components/addOrEditResource.vue";

export default Vue.extend({
  components: {
    addOrEditResource,
  },
  data() {
    return {
      resourceList: [],
      queryParams: {
        name: "",
        url: "",
        categoryId: null,
        current: 1, //第几页
        size: 10, //一页多少条
      },
      totalCount: 0,
      isLoading: false,
      resourceCategories: [],
      showAddResource: false,
      editId: "",
    };
  },
  filters: {
    getDate: function (day: string) {
      return moment(day).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.queryResource();
    this.queryAllCategory();
  },
  methods: {
    async queryResource() {
      this.isLoading = true;
      const { data } = await getResourcePages(this.queryParams);
      if (data.code === "000000") {
        console.log(data.data);
        this.resourceList = data.data.records;
        this.totalCount = data.data.total;
      }
      this.isLoading = false;
    },
    async queryAllCategory() {
      const { data } = await getAllCategory();
      console.log(data);
      if (data.code === "000000") {
        this.resourceCategories = data.data;
      }
    },
    handleEditResource(row: any) {
      this.editId = row.id;
      this.showAddResource = true;
    },
    onSubmit() {
      this.queryParams.current = 1;
      this.queryResource();
    },
    onReset() {
      (this.$refs.resourceForm as Form).resetFields();
      this.queryParams.current = 1;
      this.queryResource();
    },
    addResource() {
      this.editId = "";
      this.showAddResource = true;
    },
    handleDeletResource(row: any) {
      this.$confirm("确定是否要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteResource(row.id);
          if (data.code === "000000") {
            this.$message.success("删除成功");
            this.queryResource();
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
    handleSizeChange(val: number) {
      this.queryParams.size = val;
      this.queryParams.current = 1;
      this.queryResource();
    },
    handleCurrentChange(val: number) {
      this.queryParams.current = val;
      this.queryResource();
    },
  },
});
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
.btn-wrap {
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}
</style>
