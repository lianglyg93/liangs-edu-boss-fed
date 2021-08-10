<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <el-button size="small" @click="$router.push({ name: 'addOrEdit' })"
          >资源管理</el-button
        > -->
        <el-form
          :inline="true"
          ref="roleForm"
          label-position="right"
          :model="form"
          label-width="80px"
        >
          <el-form-item prop="name" label="输入搜索">
            <el-input v-model="form.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="queryRoles" :disabled="isLoading"
              >查询搜索</el-button
            >
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>

        <div class="btn-wrap">
          <el-button size="small" @click="addResource">添加角色</el-button>
        </div>
      </div>
      <el-table
        v-loading="isLoading"
        :data="roleList"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="编号"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          align="center"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          min-width="300"
        ></el-table-column>
        <el-table-column label="添加时间" width="240" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.createdTime | getDate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="240">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'allocMenu',
                  params: {
                    roleId: scope.row.id,
                  },
                })
              "
              >分配菜单</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="
                $router.push({
                  name: 'allocResource',
                  params: {
                    roleId: scope.row.id,
                  },
                })
              "
              >分配资源</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleEditRole(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDeleteRole(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹出框 -->
    <el-dialog
      :title="`${isEdit ? '编辑' : '添加'}角色`"
      width="30%"
      center
      :visible.sync="dialogFormVisible"
    >
      <add-or-edit-role
        v-if="dialogFormVisible"
        :isEdit="isEdit"
        :editId="editId"
        @closeDialog="closeDialog"
      />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { getRoles, deleteRole } from "@/services/role";
import { Form } from "element-ui";
import addOrEditRole from "./addOrEditRole.vue";

export default Vue.extend({
  name: "roleList",
  components: {
    addOrEditRole,
  },
  data() {
    return {
      roleList: [],
      form: {
        name: "",
      },
      isLoading: false,
      isEdit: false,
      dialogFormVisible: false,
      editId: "",
    };
  },
  filters: {
    getDate: function (day: string) {
      return moment(day).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  created() {
    this.queryRoles();
  },
  methods: {
    async queryRoles() {
      this.isLoading = true;
      const { data } = await getRoles(this.form);
      if (data.code === "000000") {
        console.log(data.data);
        this.roleList = data.data.records;
      }
      this.isLoading = false;
    },
    onReset() {
      (this.$refs.roleForm as Form).resetFields();
      this.queryRoles();
    },
    handleEditRole(row: any) {
      this.editId = row.id;
      this.isEdit = true;
      this.dialogFormVisible = true;
    },
    handleDeleteRole(row: any) {
      this.$confirm("确定是否要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await deleteRole(row.id);
          if (data.code === "000000") {
            this.$message.success("删除成功");
            this.queryRoles();
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
    addResource() {
      this.editId = "";
      this.isEdit = false;
      this.dialogFormVisible = true;
    },
    closeDialog() {
      this.queryRoles();
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
</style>
