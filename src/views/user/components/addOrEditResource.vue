<template>
  <el-dialog
    :title="`${isEdit ? '编辑' : '添加'}资源`"
    :visible="value"
    width="40%"
    :show-close="false"
    @open="queryResource"
  >
    <el-form
      ref="resourceForm"
      :model="form"
      label-position="right"
      label-width="140px"
    >
      <el-form-item prop="name" label="资源名称">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="url" label="资源路径">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="categoryId" label="资源分类">
        <el-select
          v-model="form.categoryId"
          placeholder="请选择资源分类"
          clearable
        >
          <el-option
            v-for="item in resourceCategories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="description" label="描述">
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
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { getResource, saveOrUpdate } from "@/services/resource";
import { Form } from "element-ui";

export default Vue.extend({
  name: "addOrEditResource",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    resourceCategories: {
      type: Array,
      default: () => [],
    },
    editId: {
      type: [Number, String],
      default: "",
    },
  },
  computed: {
    isEdit(): boolean {
      return !!this.editId;
    },
  },
  data() {
    return {
      form: {
        // "id": 0,
        name: "",
        categoryId: null,
        url: "",
        description: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    closeDialog() {
      console.log("close");
      this.$emit("input", false);
    },
    async queryResource() {
      if (this.isEdit) {
        const { data } = await getResource(this.editId);
        console.log(data);
        if (data.code === "000000") {
          this.form = data.data;
        }
      } else {
        this.$refs["resourceForm"] &&
          (this.$refs["resourceForm"] as Form).resetFields();
      }
    },
    async addOrEdit() {
      const { data } = await saveOrUpdate(this.form);
      console.log(data);
      if (data.code === "000000") {
        this.$message.success("添加成功");
        this.closeDialog();
        this.$emit("queryResource");
      } else {
        this.$message.error("添加失败");
      }
    },
  },
});
</script>

<style scoped></style>
