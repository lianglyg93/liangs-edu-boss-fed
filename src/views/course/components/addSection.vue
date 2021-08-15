<template>
  <el-form ref="section-form" :model="section" label-width="70px">
    <el-form-item label="课程名称">
      <el-input :value="courseName" autocomplete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="章节名称" prop="sectionName">
      <el-input v-model="section.sectionName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="章节描述" prop="description">
      <el-input
        v-model="section.description"
        type="textarea"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="章节排序" prop="orderNum">
      <el-input-number v-model="section.orderNum"></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { getSectionById } from "@/services/course";
import Vue from "vue";

export default Vue.extend({
  name: "addSection",
  props: {
    courseId: {
      type: [Number, String],
      default: -1,
    },
    courseName: {
      type: String,
      default: "",
    },
    selectInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      section: {
        sectionName: "",
        description: "",
        orderNum: 0,
        status: 0,
        ...this.selectInfo,
        courseId: this.courseId,
      },
    };
  },
  created() {
    this.querySectionById();
  },
  methods: {
    async querySectionById() {
      if (this.selectInfo?.id) {
        const { data } = await getSectionById(this.selectInfo.id);
        console.log(data.data);
        this.section = data.data;
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
