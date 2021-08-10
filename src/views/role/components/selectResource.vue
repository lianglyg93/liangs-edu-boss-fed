<template>
  <div class="select-resource">
    <el-checkbox
      class="select-resource-title"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >{{ resourceInfo.name }}</el-checkbox
    >
    <el-checkbox-group
      v-model="checkedResource"
      @change="handleCheckedResourceChange"
    >
      <el-checkbox
        v-for="resource in resourceInfo.resourceList"
        :label="resource.name"
        :key="resource.id"
        class="select-resource-item"
        >{{ resource.name }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
</template>
<script lang="ts">
const cityOptions = ["上海", "北京", "广州", "深圳"];
import Vue from "vue";

export default Vue.extend({
  props: {
    resourceInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      checkAll: false,
      checkedResource: ["上海"],
      cities: cityOptions,
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val: any) {
      this.checkedResource = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedResourceChange(value: any) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
  },
});
</script>

<style lang="scss" scoped>
.select-resource {
  width: 100%;
  border-top: 1px solid rgb(220, 223, 230);
  &-title {
    padding-left: 20px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: rgb(242, 246, 252);
    box-sizing: border-box;
  }
  .el-checkbox-group {
    padding-left: 20px;
    width: 100%;
    min-height: 40px;
    box-sizing: border-box;
  }
  &-item {
    width: 30%;
    height: 40px;
    line-height: 40px;
  }
}
</style>
