import request from "@/utils/request";

//分页查询课程信息
export const getQueryCourses = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/course/getQueryCourses",
    data,
  });
};
//课程上下架
export const changeState = (params: any) => {
  return request({
    method: "GET",
    url: "/boss/course/changeState",
    params,
  });
};

//保存或者更新课程信息
export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/course/saveOrUpdateCourse",
    data,
  });
};

export const uploadCourseImage = (
  data: any,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) => {
  return request({
    method: "POST",
    url: "/boss/course/upload",
    data,
    onUploadProgress,
  });
};

export const getCourseById = (courseId: string | number) => {
  return request({
    method: "GET",
    url: "/boss/course/getCourseById",
    params: {
      courseId,
    },
  });
};
