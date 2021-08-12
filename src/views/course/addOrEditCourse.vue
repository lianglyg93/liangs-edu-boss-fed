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
    <el-form label-position="right" label-width="100px">
      <div v-show="activeStep === 0">
        <el-form-item label="名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="讲师姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input-number
            v-model="num"
            :min="1"
            :max="100000"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </div>
      <div v-show="activeStep === 1">
        <el-form-item label="课程封面">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="解锁封面">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div v-show="activeStep === 2">
        <el-form-item label="售卖价格">
          <el-input>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品原件">
          <el-input>
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input>
            <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="添加标签">
          <el-input> </el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep === 3">
        <el-form-item label="限时秒杀开关">
          <el-switch
            v-model="switchValue"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <template v-if="switchValue">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="startDate"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="endDate"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀价">
            <el-input-number
              v-model="num"
              :min="0"
              :max="100000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="秒杀库存">
            <el-input-number
              v-model="num"
              :min="0"
              :max="100000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </template>
      </div>
      <div v-show="activeStep === 4">
        <el-form-item label="课程详情">
          <el-input type="textarea"> </el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <div class="btn-wrap">
          <el-button v-if="activeStep !== 0" size="small" @click="activeStep--"
            >上一步</el-button
          >
          <el-button v-if="activeStep < 4" size="small" @click="activeStep++"
            >下一步</el-button
          >
          <el-button v-if="activeStep === 4" size="small" type="primary"
            >保存</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {},
  data() {
    return {
      activeStep: 0,
      stepMenu: ["基本信息", "封面上传", "销售信息", "秒杀活动", "课程详情"],
      num: 1,
      imageUrl: "",
      switchValue: false,
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    handleAvatarSuccess(res: any, file: any) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file: any) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px dashed #ccc;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
