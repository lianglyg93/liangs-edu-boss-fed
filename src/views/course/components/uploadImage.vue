<template>
  <div class="course-image">
    <el-progress
      v-if="isUploading"
      type="circle"
      :percentage="percentage"
      :width="178"
      :status="percentage === 100 ? 'success' : undefined"
    />
    <el-upload
      v-else
      :limit="3"
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="handleUploadImage"
    >
      <img v-if="value" :src="value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { uploadCourseImage } from "@/services/course";
import Vue from "vue";

export default Vue.extend({
  name: "uploadImage",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      percentage: 0,
      isUploading: false,
      defaultImage:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F16%2F20170216104450_trcMX.jpeg&refer=http%3A%2F%2Fa-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631458122&t=2a21886f2a7351e04c590720ab2a8d98",
    };
  },
  methods: {
    beforeAvatarUpload(file: any) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },

    async handleUploadImage(options: any) {
      const formData = new FormData();
      formData.append("file", options.file);
      this.isUploading = true;
      const { data } = await uploadCourseImage(formData, (e) => {
        this.percentage = Math.floor((e.loaded / e.total) * 100);
      });
      this.isUploading = false;
      this.percentage = 0;
      // if (data.code === "000000") {
      console.log(data);
      console.log(11111);
      // console.log(data.data.name);
      // this.course.courseListImg = data.data.name;
      this.$emit("input", this.defaultImage);

      // } else {
      //   this.$message.error(data.mesg);
      // }
    },
  },
});
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
