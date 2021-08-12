<template>
  <el-card class="box-card">
    <div slot="header">
      <span>{{ isEdit ? "编辑" : "添加" }}菜单</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="href">
        <el-input v-model="ruleForm.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-select v-model="ruleForm.parentId">
          <el-option label="无上级菜单" :value="-1"></el-option>
          <el-option
            v-for="menu in parentMenuList"
            :key="menu.id"
            :label="menu.name"
            :value="menu.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="shown">
        <el-switch v-model="ruleForm.shown"></el-switch>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input-number
          v-model="ruleForm.orderNum"
          :min="1"
          :max="100"
          label="排序"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import Vue from "vue";
import { saveOrUpdate, getEditMenuInfo } from "@/services/menu";
import { Form } from "element-ui";
export default Vue.extend({
  data() {
    return {
      ruleForm: {
        // id: 0,
        parentId: -1,
        name: "",
        href: "",
        icon: "",
        orderNum: 0,
        description: "",
        shown: true,
      },
      rules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        href: [{ required: true, message: "请输入菜单路径", trigger: "blur" }],
      },
      parentMenuList: [],
      isEdit: false, //是否编辑页面
    };
  },
  created() {
    this.queryEditMenuInfo();
  },
  methods: {
    async queryEditMenuInfo() {
      console.log("this.$route.params==", this.$route.params.id);
      this.isEdit = !!this.$route.params.id;

      console.log("isEdits==", this.isEdit);
      const { data } = await getEditMenuInfo(this.$route.params.id || -1);
      console.log(data);
      if (data.code === "000000") {
        this.parentMenuList = data.data.parentMenuList;
        this.isEdit && (this.ruleForm = data.data.menuInfo);
      }
    },
    submitForm() {
      (this.$refs.ruleForm as Form).validate(async (valid) => {
        if (valid) {
          const { data } = await saveOrUpdate(this.ruleForm);
          console.log(data);
          if (data.code === "000000") {
            this.$message.success("提交成功");
            this.$router.back();
          } else {
            this.$message.error(data.mesg || "提交失败");
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      (this.$refs.ruleForm as Form).resetFields();
    },
  },
});
</script>

<style scoped></style>
