<template>
  <el-card>
    <div class="box-card">
      <template v-for="(roleResource, index) in roleResourcesList">
        <select-resource
          :key="roleResource.id"
          :resource-info="roleResource"
          :index="index"
          @changeResource="changeResource"
        />
      </template>
      <div class="btn-wrap">
        <el-button size="small" type="primary" @click="onSubmit"
          >保存</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import selectResource from "./components/selectResource.vue";
import { getRoleResources, allocateRoleResources } from "@/services/resource";

export default Vue.extend({
  components: {
    selectResource,
  },
  props: {},
  data() {
    return {
      roleResourcesList: [],
      allResourceList: [],
      roleId: "",
    };
  },
  mounted() {
    this.roleId = this.$route.query.roleId as string;
    this.queryResource();
  },
  methods: {
    async queryResource() {
      const { data } = await getRoleResources(this.roleId);
      if (data.code === "000000") {
        this.roleResourcesList = data.data;
        this.getAllResourceList(data.data);
      }
    },
    getAllResourceList(resources: any) {
      let resourceArr: never[] = [];
      resources.forEach((resource: any, index: number) => {
        let selectedArr: never[] = [];
        const { resourceList } = resource;
        resourceList &&
          resourceList.forEach((info: any) => {
            if (info.selected) {
              selectedArr.push(info.id as never);
            }
          });
        (resourceArr[index] as never[]) = selectedArr;
      });
      this.allResourceList = resourceArr;
    },
    changeResource(info: any) {
      const { val, index } = info;
      (this.allResourceList[index] as any) = val;
    },
    async onSubmit() {
      const menuIdList = this.allResourceList.flat();
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        resourceIdList: menuIdList,
      });
      if (data.code === "000000") {
        this.$message.success("添加成功");
        this.$router.back();
      } else {
        this.$message.error("添加失败");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.box-card {
  border: 1px solid rgb(220, 223, 230);
}
.btn-wrap {
  text-align: center;
  margin: 20px 0;
}
</style>
