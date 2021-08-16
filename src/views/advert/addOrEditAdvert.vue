<template>
  <el-card>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位置：" prop="spaceId">
        <el-select v-model="ruleForm.spaceId" placeholder="请选择活动区域">
          <el-option
            v-for="item in allSpacesList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime" required>
        <el-date-picker
          v-model="ruleForm.startTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-ddTHH:mm:ss.SSSZ"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTime" required>
        <el-date-picker
          v-model="ruleForm.endTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-ddTHH:mm:ss.SSSZ"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线：" prop="status">
        <el-switch
          active-color="#40586f"
          inactive-color="#dcdfe6"
          :active-value="1"
          :inactive-value="0"
          v-model="ruleForm.status"
        ></el-switch>
      </el-form-item>

      <el-form-item label="广告图片：" prop="img">
        <upload-image v-model="ruleForm.img" />
      </el-form-item>
      <el-form-item label="广告链接：" prop="link">
        <el-input v-model="ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="广告备注：" prop="text">
        <el-input type="textarea" v-model="ruleForm.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import uploadImage from "../course/components/uploadImage.vue";
import { saveOrUpdate, getAdById } from "@/services/advert";
import moment from "moment";
export default {
  components: {
    uploadImage,
  },
  props: {
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      ruleForm: {
        id: 0,
        name: "",
        spaceId: 0,
        keyword: "",
        htmlContent: "",
        text: "",
        img: "",
        link: "",
        startTime: "",
        endTime: "",
        createTime: "",
        updateTime: "",
        status: 0,
        priority: 0,
        startTimeFormatString: "",
        endTimeFormatString: "",
      },
      rules: {
        name: [{ required: true, message: "请输入广告名称", trigger: "blur" }],
        link: [{ required: true, message: "请选择广告链接", trigger: "blur" }],
        startTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        endTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    allSpacesList() {
      return this.$store.state.allSpacesList;
    },
  },
  created() {
    this.id && this.queryAdById();
  },
  methods: {
    async queryAdById() {
      const { data } = await getAdById(this.id);
      if (data.success) {
        data.content.startTime =
          moment(data.content.startTime).format("YYYY-MM-DDTHH:mm:ss.SSS") +
          "Z";
        data.content.endTime =
          moment(data.content.endTime).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
        this.ruleForm = data.content;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await saveOrUpdate(this.ruleForm);
          if (data.success) {
            this.$message.success("保存成功");
            this.$router.back();
          } else {
            this.$message.success("保存失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped></style>
