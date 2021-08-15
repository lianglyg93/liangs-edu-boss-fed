<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          :inline="true"
          ref="resourceForm"
          label-position="right"
          :model="queryParams"
          label-width="80px"
        >
          <el-form-item prop="courseName" label="课程名称">
            <el-input
              v-model="queryParams.courseName"
              placeholder="请输入课程名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-select v-model="queryParams.status">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button
              type="primary"
              @click="
                $router.push({
                  name: 'addOrEditCourse',
                })
              "
              >新建课程</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="isLoading"
        :data="courseList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          align="center"
        ></el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">
            <span>¥{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center" width="50">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="isLoading"
              :active-value="1"
              :inactive-value="0"
              @change="handleChangeState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          min-width="120"
        >
          <template slot-scope="scope">
            <el-button size="small" @click="setUserRole(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              @click="
                $router.push({
                  name: 'courseSections',
                  params: {
                    courseId: scope.row.id,
                  },
                })
              "
              >内容管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.currentPage"
        :page-sizes="[100, 200, 300]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { getQueryCourses, changeState } from "@/services/course";

export default Vue.extend({
  components: {},
  data() {
    return {
      options: [
        {
          value: undefined,
          label: "全部",
        },
        {
          value: "1",
          label: "上架",
        },
        {
          value: "0",
          label: "下架",
        },
      ],
      courseList: [],
      queryParams: {
        currentPage: 1, //第几页
        pageSize: 200, //一页多少条
        // courseName: "",
        // status: null,
      },
      totalCount: 0,
      isLoading: false,
      userId: "",
    };
  },
  created() {
    this.queryCourse();
  },
  methods: {
    async queryCourse() {
      this.isLoading = true;
      const { data } = await getQueryCourses(this.queryParams);
      if (data.code === "000000") {
        this.courseList = data.data.records;
        this.totalCount = data.data.total;
        this.isLoading = false;
      }
    },
    setUserRole(row: any) {
      this.userId = row.id;
      this.$router.push({
        name: "addOrEditCourse",
        query: {
          courseId: row.id,
        },
      });
    },
    onSubmit() {
      this.queryParams.currentPage = 1;
      console.log(this.queryParams);
      this.queryCourse();
    },
    handleSizeChange(val: number) {
      this.queryParams.pageSize = val;
      this.queryParams.currentPage = 1;
      this.queryCourse();
    },
    handleCurrentChange(val: number) {
      this.queryParams.currentPage = val;
      this.queryCourse();
    },
    async handleChangeState(courseInfo: any) {
      this.isLoading = true;
      const { data } = await changeState({
        courseId: courseInfo.id,
        status: courseInfo.status,
      });
      this.isLoading = false;
      if (data.code === "000000") {
        this.$message.success(
          `${courseInfo.status === 1 ? "上架" : "下架"}成功`
        );
      } else {
        this.$message.success(
          `${courseInfo.status === 1 ? "上架" : "下架"}失败`
        );
        this.queryCourse();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
