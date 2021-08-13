<template>
  <el-card class="box-card">
    <div slot="header">
      <el-steps
        :active="activeStep"
        finish-status="success"
        simple
        style="margin-top: 20px"
      >
        <el-step
          v-for="(step, index) in stepMenu"
          :key="index"
          :title="step"
        ></el-step>
      </el-steps>
    </div>
    <el-form
      label-position="right"
      label-width="100px"
      :rules="rules"
      :model="course"
      ref="courseForm"
    >
      <div v-show="activeStep === 0">
        <el-form-item prop="courseName" label="课程名称">
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item prop="brief" label="简介">
          <el-input v-model="course.brief"></el-input>
        </el-form-item>
        <el-form-item prop="teacherDTO.teacherName" label="讲师姓名">
          <el-input v-model="course.teacherDTO.teacherName"></el-input>
        </el-form-item>
        <el-form-item prop="teacherDTO.position" label="职位">
          <el-input v-model="course.teacherDTO.position"></el-input>
        </el-form-item>
        <el-form-item prop="teacherDTO.description" label="讲师简介">
          <el-input v-model="course.teacherDTO.description"></el-input>
        </el-form-item>
        <el-form-item label="课程概述" prop="previewField">
          <el-input
            style="margin-bottom: 10px"
            v-model="course.previewFirstField"
            type="textarea"
            placeholder="概述1"
          ></el-input>
          <el-input
            v-model="course.previewSecondField"
            type="textarea"
            placeholder="概述2"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程排序" prop="sortNum">
          <el-input-number
            v-model="course.sortNum"
            :min="1"
            :max="100000"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </div>
      <div v-show="activeStep === 1">
        <el-form-item label="课程封面" prop="courseListImg">
          <upload-image v-model="course.courseListImg" />
        </el-form-item>
        <el-form-item label="介绍封面" prop="courseImgUrl">
          <upload-image v-model="course.courseImgUrl" />
        </el-form-item>
      </div>
      <div v-show="activeStep === 2">
        <el-form-item label="售卖价格" prop="discounts">
          <el-input v-model.number="course.discounts">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品原件" prop="price">
          <el-input v-model.number="course.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销量" prop="sales">
          <el-input v-model.number="course.sales">
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="添加标签" prop="discountsTag">
          <el-input v-model="course.discountsTag"> </el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep === 3">
        <el-form-item label="限时秒杀开关" prop="activityCourse">
          <el-switch
            v-model="course.activityCourse"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <template v-if="course.activityCourse">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="course.activityCourseDTO.beginTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-ddTHH:mm:ss.SSSZ"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="course.activityCourseDTO.endTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-ddTHH:mm:ss.SSSZ"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀价" prop="activityCourseDTO.amount">
            <el-input-number
              v-model.number="course.activityCourseDTO.amount"
              :min="0"
              :max="100000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="秒杀库存" prop="activityCourseDTO.stock">
            <el-input-number
              v-model.number="course.activityCourseDTO.stock"
              :min="0"
              :max="100000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </template>
      </div>
      <div v-show="activeStep === 4">
        <el-form-item label="课程详情" prop="courseDescriptionMarkDown">
          <text-editor
            v-if="activeStep === 4"
            v-model="course.courseDescriptionMarkDown"
          />
        </el-form-item>
        <el-form-item label="是否发布" prop="status">
          <el-switch
            v-model="course.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </div>
      <el-form-item>
        <div class="btn-wrap">
          <el-button v-if="activeStep !== 0" size="small" @click="activeStep--"
            >上一步</el-button
          >
          <el-button v-if="activeStep < 4" size="small" @click="handleNextStep"
            >下一步</el-button
          >
          <el-button
            v-if="activeStep === 4"
            size="small"
            type="primary"
            @click="handleSave"
            >保存</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { Form } from "element-ui";
import Vue from "vue";
import { saveOrUpdateCourse, getCourseById } from "@/services/course";
import moment from "moment";
import uploadImage from "./components/uploadImage.vue";
import TextEditor from "@/components/TextEditor/index.vue";

export default Vue.extend({
  props: {},
  components: {
    uploadImage,
    TextEditor,
  },
  data() {
    return {
      courseId: "",
      activeStep: 0,
      stepMenu: ["基本信息", "封面上传", "销售信息", "秒杀活动", "课程详情"],
      course: {
        // id: 0,
        courseName: "名称",
        brief: "简介",
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: "老师",
          teacherHeadPicUrl: "",
          position: "老师",
          description: "描述",
        },
        courseDescriptionMarkDown: "",
        price: 0,
        discounts: 0,
        priceTag: "",
        discountsTag: "",
        isNew: true,
        isNewDes: "",
        courseListImg: "",
        courseImgUrl: "",
        sortNum: 0,
        previewFirstField: "概述1",
        previewSecondField: "概述2",
        status: 0, // 0：未发布，1：已发布
        sales: 0,
        activityCourse: false, // 是否开启活动秒杀
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: "",
          endTime: "",
          amount: 0,
          stock: 0,
        },
        autoOnlineTime: "",
      },
      // {
      //   pattern: /^1\d{10}$/,
      //   message: "请输入正确的手机号",
      //   trigger: "blur",
      // }, // {
      //   min: 6,
      //   max: 18,
      //   message: "长度在 6 到 18 个字符",
      //   trigger: "blur",
      // },
      rules: {
        courseName: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
        brief: [{ required: true, message: "请输入课程简介", trigger: "blur" }],
        "teacherDTO.teacherName": [
          { required: true, message: "请输入讲师姓名", trigger: "blur" },
        ],
        "teacherDTO.position": [
          { required: true, message: "请输入职位", trigger: "blur" },
        ],
        "teacherDTO.description": [
          { required: true, message: "请输入讲师简介", trigger: "blur" },
        ],
        // previewField: [
        //   {
        //     required: true,
        //     validator: this.validatePreviewField,
        //     trigger: "blur",
        //   },
        // ],
        sortNum: [
          { required: true, message: "请输入课程排序", trigger: "blur" },
        ],
        discounts: [
          { required: true, message: "请输入售卖价格", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.courseId = this.$route.query.courseId as string;
    if (this.courseId) {
      this.queryCourseById();
    }
  },
  methods: {
    async queryCourseById() {
      const { data } = await getCourseById(this.courseId);
      const { activityCourseDTO } = data.data;
      if (activityCourseDTO) {
        activityCourseDTO.beginTime =
          moment(activityCourseDTO.beginTime).format(
            "YYYY-MM-DDTHH:mm:ss.SSS"
          ) + "Z";
        activityCourseDTO.endTime =
          moment(activityCourseDTO.endTime).format("YYYY-MM-DDTHH:mm:ss.SSS") +
          "Z";
      } else {
        data.data.activityCourseDTO = this.course.activityCourseDTO;
      }
      this.course = data.data;
    },
    // 下一步
    handleNextStep() {
      (this.$refs.courseForm as Form).validate(async (valid) => {
        if (valid) {
          this.activeStep++;
        } else {
          console.log(1111111);
          return false;
        }
      });
    },
    validatePreviewField(rule: any, value: any, callback: any) {
      if (!this.course.previewFirstField) {
        callback(new Error("请输入概述信息1!"));
      } else if (!this.course.previewSecondField) {
        callback(new Error("请输入概述信息2!"));
      } else {
        callback();
      }
    },
    //保存
    async handleSave() {
      const { data } = await saveOrUpdateCourse(this.course);
      if (data.code === "000000") {
        this.$message.success("保存成功");
        this.$router.push("/course");
      } else {
        this.$message.error("保存失败");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.btn-wrap {
  width: max-content;
  padding-top: 20px;
  margin: 0 auto;
}
</style>
