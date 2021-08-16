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
        :label="resource.id"
        :key="resource.id"
        class="select-resource-item"
        >{{ resource.name }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    resourceInfo: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      checkAll: false, //是否全选
      checkedResource: [], //选择的资源
      allResource: [], //所有资源数据
      isIndeterminate: false,
    };
  },
  created() {
    this.initResourceData();
  },
  watch: {
    checkedResource(val) {
      this.$emit("changeResource", {
        val,
        index: this.index,
      });
    },
  },
  methods: {
    initResourceData() {
      const { resourceList } = this.resourceInfo;
      resourceList &&
        resourceList.forEach((resourceInfo: any) => {
          const id = resourceInfo.id as never;
          this.allResource.push(id);
          if (resourceInfo.selected) {
            this.checkedResource.push(id);
          }
        });
      this.checkAll = this.allResource.length === this.checkedResource.length;
    },
    handleCheckAllChange(val: any) {
      this.checkedResource = val ? this.allResource : [];
      this.isIndeterminate = false;
    },
    handleCheckedResourceChange(value: any) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allResource.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allResource.length;
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
    padding: 20px;
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
