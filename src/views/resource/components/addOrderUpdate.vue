<template>
  <div>
    <el-form :model="form">
      <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
        <el-input v-model="form.sort" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addOrEdit">确 定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { saveOrderUpdate } from "@/services/resource";

export default Vue.extend({
  props: {
    editInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        id: undefined,
        name: "",
        sort: 0,
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getEditInfo();
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    getEditInfo() {
      if (this.editInfo?.id) {
        const { id, name, sort } = this.editInfo;
        this.form = {
          id,
          name,
          sort,
        };
      }
    },
    async addOrEdit() {
      const { data } = await saveOrderUpdate(this.form);
      console.log(data);
      if (data.code === "000000") {
        this.$message.success("添加成功");
        this.closeDialog();
      } else {
        this.$message.error("添加失败");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.dialog-footer {
  width: max-content;
  margin: 0 auto;
}
</style>
