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
          <el-form-item prop="phone" label="手机号">
            <el-input
              v-model="queryParams.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-date-picker
              v-model="selectData"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="isLoading"
        :data="userList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="用户ID"
          align="center"
        ></el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <img
              class="user-portrait"
              :src="scope.row.portrait || defaultPortraitUrl"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column label="注册时间" align="center" min-width="160">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.createTime | getDate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span
              class="status"
              :class="
                scope.row.status === 'ENABLE'
                  ? 'status-success'
                  : 'status-error'
              "
            ></span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="setUserRole(scope.row)"
              >分配角色</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      width="30%"
      center
      :visible.sync="dialogFormVisible"
    >
      <set-user-role
        v-if="dialogFormVisible"
        :role-list="roleList"
        :user-id="userId"
        @closeDialog="closeDialog"
      />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { getUserPages } from "@/services/user";
import { getAllRoles } from "@/services/role";
import setUserRole from "./components/setUserRole.vue";

export default Vue.extend({
  components: {
    setUserRole,
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker: { $emit: (arg0: string, arg1: Date[]) => void }) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      selectData: "",
      defaultPortraitUrl:
        "http://www.lgstatic.com/thumbnail_100x100/i/image2/M01/5E/65/CgotOVszSAOANi0LAAAse2IVWAE693.jpg",
      userList: [],
      queryParams: {
        currentPage: 1, //第几页
        pageSize: 10, //一页多少条
        phone: "",
        startCreateTime: "",
        endCreateTime: "",
      },
      totalCount: 0,
      isLoading: false,
      roleList: [],
      dialogFormVisible: false,
      userId: "",
    };
  },
  filters: {
    getDate: function (day: string) {
      return moment(day).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.queryResource();
  },
  methods: {
    async queryResource() {
      this.isLoading = true;
      const { data } = await getUserPages(this.queryParams);
      if (data.code === "000000") {
        console.log(data.data);
        this.userList = data.data.records;
        this.totalCount = data.data.total;
        this.isLoading = false;
      }
    },
    async queryAllRoles() {
      this.isLoading = true;
      const { data } = await getAllRoles();
      if (data.code === "000000") {
        this.roleList = data.data;
        this.isLoading = false;
        this.dialogFormVisible = true;
      }
    },
    setUserRole(row: any) {
      this.queryAllRoles();
      this.userId = row.id;
    },
    onSubmit() {
      if (this.selectData?.[0]) {
        this.queryParams.startCreateTime = moment(this.selectData[0]).format(
          "YYYY-MM-DD"
        );
        this.queryParams.endCreateTime = moment(this.selectData[1]).format(
          "YYYY-MM-DD"
        );
      }
      this.queryParams.currentPage = 1;
      console.log(this.queryParams);
      this.queryResource();
    },
    handleSizeChange(val: number) {
      this.queryParams.pageSize = val;
      this.queryParams.currentPage = 1;
      this.queryResource();
    },
    handleCurrentChange(val: number) {
      this.queryParams.currentPage = val;
      this.queryResource();
    },
    closeDialog() {
      this.queryResource();
      this.dialogFormVisible = false;
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
.user-portrait {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-sizing: border-box;
  vertical-align: middle;
}
.status {
  display: inline-block;
  cursor: pointer;
  width: 0.875rem;
  height: 0.875rem;
  vertical-align: middle;
  border-radius: 50%;
}
.status-success {
  background: #51cf66;
}
.status-error {
  background: red;
}
</style>
