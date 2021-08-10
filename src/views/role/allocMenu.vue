<template>
  <el-card class="box-card">
    <el-tree
      ref="tree"
      node-key="id"
      :data="menuNodeList"
      :props="defaultProps"
      :default-checked-keys="checkedKeysList"
      show-checkbox
      default-expand-all
    ></el-tree>
    <div class="btn-wrap">
      <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
      <el-button size="small" @click="onReset">清空</el-button>
    </div>
  </el-card>
</template>

<script lang="ts">
import {
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus,
} from "@/services/menu";
import { Tree } from "element-ui";
import Vue from "vue";

export default Vue.extend({
  props: {
    roleId: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      menuNodeList: [],
      defaultProps: {
        children: "subMenuList",
        label: "name",
      },
      checkedKeysList: [],
    };
  },
  created() {
    this.queryMenu();
  },
  methods: {
    async queryMenu() {
      const { data } = await getMenuNodeList();
      if (data.code === "000000") {
        this.menuNodeList = data.data;
        console.log(this.menuNodeList);
        this.queryRoleMenus();
      }
    },
    async queryRoleMenus() {
      const { data } = await getRoleMenus(this.roleId);
      console.log(data);
      if (data.code === "000000") {
        this.getCheckedKeysList(data.data);
        console.log(this.checkedKeysList);
      }
    },
    getCheckedKeysList(menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected && !menu.subMenuList) {
          this.checkedKeysList = [...this.checkedKeysList, menu.id] as any;
        }
        if (menu.subMenuList) {
          this.getCheckedKeysList(menu.subMenuList);
        }
      });
    },
    async onSubmit() {
      const menuIdList = (this.$refs.tree as Tree).getCheckedKeys();
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList,
      });
      if (data.code === "000000") {
        this.$message.success("添加成功");
        this.$router.back();
      } else {
        this.$message.error("添加失败");
      }
    },
    onReset() {
      (this.$refs.tree as Tree).setCheckedKeys([]);
    },
  },
});
</script>

<style lang="scss" scoped>
.btn-wrap {
  text-align: center;
  margin-top: 20px;
}
</style>
