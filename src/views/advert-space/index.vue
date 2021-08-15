<template>
  <div class="space-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" @click="showAdvertDialog">添加广告位</el-button>
      </div>
      <el-table :data="spacesList" stripe style="width: 100%">
        <el-table-column
          prop="spaceKey"
          label="spaceKey"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="广告位名称"
          min-width="300"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.createdTime | getDate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.updateTime | getDate
            }}</span>
          </template></el-table-column
        >
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
              @click="showAdvertDialog(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="space-pagination">
      <el-pagination
        v-if="allSpacesList.length > 100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allSpacesList.length"
      >
      </el-pagination>
    </div>
    <!-- 添加编辑广告位 -->
    <el-dialog title="添加课程阶段" :visible.sync="advertDialog">
      <el-form
        v-if="advertDialog"
        :model="advertByIdInfo"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="广告位名称" prop="name">
          <el-input v-model="advertByIdInfo.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";
import {
  getAllSpaces,
  saveOrUpdateSpace,
  getSpaceById,
} from "@/services/advert";
import { Form } from "element-ui";

export default Vue.extend({
  data() {
    return {
      allSpacesList: [],
      spacesList: [],
      currentPage: 1,
      pageSize: 100,
      advertDialog: false,
      advertByIdInfo: {
        name: "",
      },
    };
  },
  filters: {
    getDate: function (day: string) {
      return moment(day).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.querySpaces();
  },
  methods: {
    async querySpaces() {
      const { data } = await getAllSpaces();
      if (data.success) {
        this.allSpacesList = data.content;
        this.spacesList = data.content.slice(0, this.pageSize);
        console.log(this.allSpacesList);
      }
    },
    async showAdvertDialog(row: any) {
      console.log(row.id);
      if (row?.id) {
        const { data } = await getSpaceById(row.id);
        if (data.success) {
          this.advertByIdInfo = data.content;
        } else {
          this.$message.error(data.message || "查询信息失败");
        }
      }
      this.advertDialog = true;
    },

    handleSizeChange(val: number) {
      this.currentPage = 1;
      this.pageSize = val;
      this.spacesList = this.allSpacesList.slice(0, this.pageSize);
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`);
      this.spacesList = this.allSpacesList.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
    },
    async submitForm() {
      const { data } = await saveOrUpdateSpace(this.advertByIdInfo);
      if (data.success) {
        this.$message.success("提交成功");
        this.advertDialog = false;
        this.querySpaces();
      } else {
        this.$message.error(data.message || "提交失败");
      }
    },
    resetForm() {
      (this.$refs.ruleForm as Form).resetFields();
    },
  },
});
</script>

<style lang="scss" scoped>
.space-pagination {
  margin-top: 20px;
}
</style>
