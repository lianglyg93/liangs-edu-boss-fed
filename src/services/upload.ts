import request from "@/utils/request";

//获取阿里云图片上传凭证
export const aliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: "GET",
    url: "/boss/course/upload/aliyunImagUploadAddressAdnAuth.json",
  });
};
//获取阿里云视频上传凭证
export const aliyunVideoUploadAddressAdnAuth = (params: any) => {
  return request({
    method: "GET",
    url: "/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json",
    params,
  });
};

//阿里云转码请求
export const transCodeVideo = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/course/upload/aliyunTransCode.json",
    data,
  });
};
//阿里云转码进度
export const getAliyunTransCodePercent = (lessonId: string | number) => {
  return request({
    method: "GET",
    url: "/boss/course/upload/aliyunTransCodePercent.json",
    params: {
      lessonId,
    },
  });
};
