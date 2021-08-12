<template>
  <div>
    <el-select v-model="selectRoleId" multiple placeholder="请选择">
      <el-option
        v-for="item in roleList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取 消</el-button>
      <el-button type="primary" size="small" @click="addOrEdit"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getUserRoles, allocateUserRoles } from "@/services/role";

export default Vue.extend({
  props: {
    roleList: {
      type: Array,
      default: () => [],
    },
    userId: {
      type: [Number, String],
      default: -1,
    },
  },
  data() {
    return {
      selectRoleId: [],
      formLabelWidth: "120px",
    };
  },
  created() {
    this.queryUserRoles();
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    async queryUserRoles() {
      const { data } = await getUserRoles(this.userId);
      console.log(data);
      if (data.code === "000000") {
        const userRoles = data.data;
        this.selectRoleId = userRoles.map((role: any) => role.id);
      }
    },
    async addOrEdit() {
      console.log();
      const { data } = await allocateUserRoles({
        roleIdList: this.selectRoleId,
        userId: this.userId,
      });
      // console.log(data);
      if (data.code === "000000") {
        this.$message.success("分配成功");
        this.closeDialog();
      } else {
        this.$message.error("分配失败");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.dialog-footer {
  width: max-content;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
