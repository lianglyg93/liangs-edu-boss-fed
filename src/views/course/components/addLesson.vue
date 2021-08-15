<template>
  <el-form ref="lesson-form" :model="lesson" label-width="100px">
    <el-form-item label="课程名称" prop="sectionName">
      <el-input :value="courseName" autocomplete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="章节名称" prop="sectionName">
      <el-input
        :value="lesson.sectionName"
        disabled
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="课时名称" prop="theme">
      <el-input v-model="lesson.theme" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="时长" prop="duration">
      <el-input
        v-model.number="lesson.duration"
        type="number"
        autocomplete="off"
      >
        <template slot="append">分钟</template>
      </el-input>
    </el-form-item>
    <el-form-item label="是否开放试听" prop="isFree">
      <el-switch v-model="lesson.isFree"></el-switch>
    </el-form-item>
    <el-form-item label="课时排序" prop="orderNum">
      <el-input-number v-model="lesson.orderNum"></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
// import { getSectionById } from "@/services/course";
import Vue from "vue";

export default Vue.extend({
  name: "addLesson",
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
      lesson: {
        sectionName: this.selectInfo.sectionName,
        sectionId: this.selectInfo.id,
        courseId: Number(this.courseId),
        theme: "",
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0,
      },
    };
  },
  created() {
    this.querySectionById();
  },
  methods: {
    async querySectionById() {
      if (this.selectInfo.theme) {
        this.lesson = {
          ...this.selectInfo,
          sectionId: this.selectInfo.id,
          courseId: Number(this.courseId),
        };
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
