<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="box-header">
        <p>{{ course.courseName }}</p>
        <el-button size="small" type="primary" @click="handleShowAddSection()"
          >+添加阶段</el-button
        >
      </div>
      <el-tree
        default-expand-all
        draggable
        :data="sections"
        :props="defaultProps"
        :allow-drop="allowDrop"
        @node-drop="handleSort"
      >
        <div class="section-item" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <div v-if="data.sectionName">
            <el-button size="small" @click="handleShowAddSection(data)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="primary"
              @click="handleShowAddLesson(data)"
              >添加课时</el-button
            >
            <el-button
              size="small"
              @click="handleShowUpdataStatus(data, 'section')"
            >
              {{ statusList[data.status] }}
            </el-button>
          </div>
          <div v-else>
            <el-button
              size="small"
              @click="handleShowAddLesson(data, node.parent.data)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="
                $router.push({
                  name: 'courseVedio',
                  params: {
                    courseId,
                  },
                  query: {
                    sectionId: node.parent.id,
                    lessonId: data.id,
                    courseName: course.courseName,
                    lessonName: data.theme,
                  },
                })
              "
              >上传视频</el-button
            >
            <el-button
              size="small"
              @click="handleShowUpdataStatus(data, 'lesson')"
            >
              {{ statusList[data.status] }}
            </el-button>
          </div>
        </div>
      </el-tree>
    </el-card>
    <!-- 添加课程阶段弹窗 -->
    <el-dialog title="添加课程阶段" :visible.sync="isAddSectionShow">
      <add-section
        v-if="isAddSectionShow"
        ref="addSectionDialog"
        :course-name="course.courseName"
        :course-id="courseId"
        :select-info="selectInfo"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddSectionShow = false">取 消</el-button>
        <el-button type="primary" @click="saveSectionInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加课时弹窗 -->
    <el-dialog title="添加课时" :visible.sync="isAddLessonShow">
      <add-lesson
        v-if="isAddLessonShow"
        ref="addLessonDialog"
        :course-name="course.courseName"
        :course-id="courseId"
        :select-info="selectInfo"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddLessonShow = false">取 消</el-button>
        <el-button type="primary" @click="saveLessonInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 更新状态 -->
    <el-dialog title="更新状态" :visible.sync="isUpdataStatus">
      <el-form v-if="isUpdataStatus" label-width="100px">
        <el-form-item label="状态变更为：">
          <el-select
            class="select-status"
            v-model="selectInfo.status"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in statusList"
              :key="item"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isUpdataStatus = false">取 消</el-button>
        <el-button type="primary" @click="handleLessonStatusChange"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  getSectionAndLesson,
  saveOrUpdateSection,
  saveOrUpdateLesson,
} from "@/services/course";

import { getCourseById } from "@/services/course";
import addSection from "./components/addSection.vue";
import addLesson from "./components/addLesson.vue";
import Vue from "vue";
import { Form } from "element-ui";

export default Vue.extend({
  props: {
    courseId: {
      type: [Number, String],
      default: -1,
    },
  },
  components: {
    addSection,
    addLesson,
  },
  data() {
    return {
      statusList: ["已隐藏", "待更新", "已更新"],
      sections: [],
      defaultProps: {
        children: "lessonDTOS",
        label(data: any) {
          return data.sectionName || data.theme;
        },
      },
      course: {},
      selectInfo: {},
      isAddSectionShow: false, //添加阶段
      isAddLessonShow: false, //添加课时
      isUpdataStatus: false,
      upStatus: "",
      upStatusType: "",
    };
  },
  created() {
    this.loadCourse();
    this.querySectionAndLesson();
  },
  methods: {
    async loadCourse() {
      const { data } = await getCourseById(this.courseId);
      if (data.code === "000000") {
        this.course = data.data;
      }
    },
    async querySectionAndLesson() {
      const { data } = await getSectionAndLesson(this.courseId);
      if (data.code === "000000") {
        // console.log(data.data);
        this.sections = data.data;
      }
    },
    allowDrop(draggingNode: any, dropNode: any, type: any) {
      //draggingNode拖动的节点，dropNode 放置的目标节点
      const isAllSection =
        draggingNode.data.sectionName && dropNode.data.sectionName;
      const isAllLesson =
        draggingNode.data.sectionId &&
        dropNode.data.sectionId &&
        draggingNode.data.sectionId === dropNode.data.sectionId;
      return (isAllSection || isAllLesson) && type !== "inner";
    },
    // 排序
    async handleSort(draggingNode: any, dropNode: any, type: any) {
      try {
        await Promise.all(
          dropNode.parent.childNodes.map((item: any, index: number) => {
            console.log(item.data);
            let nodeInfoObj = {
              id: item.data.id,
              orderNum: index + 1,
            };
            console.log(dropNode.data);
            if (dropNode.data.lessonDTOS) {
              return saveOrUpdateSection(nodeInfoObj);
            } else {
              return saveOrUpdateLesson(nodeInfoObj);
            }
          })
        );

        this.$message.success("排序成功");
        this.querySectionAndLesson();
      } catch (error) {
        this.$message.error("排序失败");
      }
    },
    //添加或编辑阶段
    handleShowAddSection(data: any) {
      this.selectInfo = data;
      this.isAddSectionShow = true;
    },
    //确认修改阶段信息
    async saveSectionInfo() {
      const addSectionDialog = this.$refs.addSectionDialog as any;
      const sectionInfo = addSectionDialog.section;
      const { data } = await saveOrUpdateSection(sectionInfo);
      if (data.code === "000000") {
        this.querySectionAndLesson();
        this.isAddSectionShow = false;
        (addSectionDialog.$refs["section-form"] as Form).resetFields();
        this.$message.success("操作成功");
      }
    },
    handleShowAddLesson(data: any, section: any) {
      if (section?.sectionName) {
        data.sectionName = section.sectionName;
      }
      this.selectInfo = data;
      this.isAddLessonShow = true;
    },
    //确认修改课时信息
    async saveLessonInfo() {
      const addLessonDialog = this.$refs.addLessonDialog as any;
      const lessonInfo = addLessonDialog.lesson;
      const { data } = await saveOrUpdateLesson(lessonInfo);
      if (data.code === "000000") {
        this.querySectionAndLesson();
        this.isAddLessonShow = false;
        (addLessonDialog.$refs["lesson-form"] as Form).resetFields();
        this.$message.success("操作成功");
      }
    },
    handleShowUpdataStatus(data: any, type: string) {
      this.upStatusType = type;
      this.selectInfo = data;
      this.isUpdataStatus = true;
    },
    async handleLessonStatusChange() {
      const selectInfo = this.selectInfo as any;
      const fn =
        this.upStatusType === "saveOrUpdateSection"
          ? saveOrUpdateSection
          : saveOrUpdateLesson;
      const { data } = await fn({
        data: selectInfo,
        id: selectInfo.id,
        status: selectInfo.status.toString(),
      });
      if (data.code === "000000") {
        this.$message.success("操作成功");
        this.isUpdataStatus = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node__content {
  height: 50px;
}
.section-item,
.box-header {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
