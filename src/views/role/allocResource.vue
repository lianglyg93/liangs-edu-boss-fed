<template>
  <el-card>
    <div class="box-card">
      <template v-for="roleResource in roleResourcesList">
        <select-resource :key="roleResource.id" :resource-info="roleResource" />
      </template>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import selectResource from "./components/selectResource.vue";
import { getRoleResources } from "@/services/resource";

export default Vue.extend({
  components: {
    selectResource,
  },
  props: {
    roleId: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      roleResourcesList: [],
    };
  },
  created() {
    this.queryResource();
  },
  methods: {
    async queryResource() {
      const { data } = await getRoleResources(this.roleId);
      if (data.code === "000000") {
        this.roleResourcesList = data.data;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.box-card {
  border: 1px solid rgb(220, 223, 230);
}
</style>
