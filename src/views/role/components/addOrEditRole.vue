<template>
  <div>
    <el-form :model="form">
      <el-form-item label="角色名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="description"
        label="描述"
        :label-width="formLabelWidth"
      >
        <el-input
          type="textarea"
          autosize
          v-model="form.description"
          autocomplete="off"
        ></el-input>
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
import { createOrUpdate, getRoleById } from "@/services/role";

export default Vue.extend({
  props: {
    editId: {
      type: [Number, String],
      default: "",
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        id: undefined,
        code: "",
        name: "",
        description: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.isEdit && this.getEditInfo();
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    async getEditInfo() {
      const { data } = await getRoleById(this.editId);
      console.log(data);
      if (data.code === "000000") {
        this.form = data.data;
      }
    },
    async addOrEdit() {
      const { data } = await createOrUpdate(this.form);
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
