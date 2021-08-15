<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <div>课程：{{ $route.query.courseName }}</div>
        <div>课时：{{ $route.query.lessonName }}</div>
      </div>
      <el-form label-width="40px">
        <el-form-item label="视频">
          <input ref="video-file" type="file" />
        </el-form-item>
        <el-form-item label="封面">
          <input ref="image-file" type="file" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpload">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
          <p v-if="uploaderPercent">
            视频上传:
            <el-progress
              type="circle"
              :percentage="uploaderPercent"
              :width="178"
              :status="uploaderPercent === 100 ? 'success' : undefined"
            />
          </p>
          <p v-if="isUploadSuccess">
            视频转码:
            {{ isTransCodeSuccess ? "转码成功" : "转码中，请稍等..." }}
          </p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import {
  aliyunImagUploadAddressAdnAuth,
  aliyunVideoUploadAddressAdnAuth,
  transCodeVideo,
  getAliyunTransCodePercent,
} from "@/services/upload";
export default {
  props: {
    courseId: {
      type: [Number, String],
      default: -1,
    },
  },
  data() {
    return {
      uploader: null,
      imageUrl: "",
      videoId: "",
      uploaderPercent: 0,
      isUploadSuccess: false,
      isTransCodeSuccess: false,
    };
  },
  computed: {
    video() {
      return this.$refs["video-file"];
    },
    image() {
      return this.$refs["image-file"];
    },
  },
  created() {
    this.createUploader();
  },
  methods: {
    createUploader() {
      this.uploader = new window.AliyunUpload.Vod({
        //userID，必填，只需有值即可。
        userId: "1618139964448548",
        //分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        //并行上传分片个数，默认5
        parallel: 5,
        //网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        //网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        //是否上报上传日志到视频点播，默认为true
        enableUploadProgress: true,
        //开始上传
        onUploadstarted: async (uploadInfo) => {
          console.log("onUploadstarted:", uploadInfo);

          //1.通过我们的后端获取文件上传凭证
          let uploadAuthInfo = null;
          if (uploadInfo.isImage) {
            const { data } = await aliyunImagUploadAddressAdnAuth();
            this.imageUrl = data.data.imageURL;
            uploadAuthInfo = data.data;
          } else {
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl,
            });
            this.videoId = data.data.videoId;
            uploadAuthInfo = data.data;
          }
          //2.通过uploader.setUploadAuthAndAddress设置上传凭证
          //3.设置好上传凭证确认没有问题，上传进度开始
          this.uploader.setUploadAuthAndAddress(
            uploadInfo,
            uploadAuthInfo.uploadAuth,
            uploadAuthInfo.uploadAddress,
            uploadAuthInfo.videoId || uploadAuthInfo.imageId
          );
        },
        //文件上传成功
        onUploadSucceed: (uploadInfo) => {
          console.log("onUploadSucceed: ", uploadInfo);
        },
        //文件上传失败
        onUploadFailed: (uploadInfo, code, message) => {
          console.log(uploadInfo, code, message);
          this.$message.error("上传失败");
        },
        //文件上传进度，单位：字节
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          console.log(totalSize, Math.ceil(loadedPercent * 100) + "%");
          if (!uploadInfo.isImage) {
            this.uploaderPercent = Math.ceil(loadedPercent * 100);
          }
        },
        //上传凭证超时
        onUploadTokenExpired: (uploadInfo) => {
          console.log("onUploadTokenExpired");
          console.log(uploadInfo);
          //实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
          //从点播服务刷新的uploadAuth，设置到SDK里

          // uploader.resumeUploadWithAuth(uploadAuth);
        },
        //全部文件上传结束
        onUploadEnd: async (uploadInfo) => {
          console.log("onUploadEnd: uploaded all the files");
          console.log(uploadInfo);
          this.isUploadSuccess = true;
          const { data } = await transCodeVideo({
            lessonId: this.$route.query.lessonId,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl,
            fileName: this.fileName,
          });
          console.log(data);

          const timer = setInterval(async () => {
            const { data } = await getAliyunTransCodePercent(
              this.$route.query.lessonId
            );
            if (data.code === "000000") {
              window.clearInterval(timer);
              this.isTransCodeSuccess = true;
              this.$message.success("转码成功");
              console.log("转码成功", data);
            }
          }, 1000);
        },
      });
    },
    // 上传
    handleUpload() {
      this.uploaderPercent = 0;
      this.isUploadSuccess = false;
      this.isTransCodeSuccess = false;
      const { uploader } = this;
      const videoFile = this.video.files[0];
      const imageFile = this.image.files[0];
      //获取到用户选择的文件后，添加到上传列表中。
      //一旦开始上传，会按照列表中添加的顺序开始上传

      uploader.addFile(imageFile, null, null, null, '{"Vod":{}}');
      uploader.addFile(videoFile, null, null, null, '{"Vod":{}}');
      //开始上传
      uploader.startUpload();
    },
  },
};
</script>
