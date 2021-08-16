import request from "@/utils/request";

// 获取所有的广告位

export const getAllSpaces = () => {
  return request({
    method: "GET",
    url: "/front/ad/space/getAllSpaces",
  });
};
//添加编辑广告位
export const saveOrUpdateSpace = (data: any) => {
  return request({
    method: "POST",
    url: "front/ad/space/saveOrUpdate",
    data,
  });
};
// 根据Id获取广告位
export const getSpaceById = (id: string | number) => {
  return request({
    method: "GET",
    url: "/front/ad/space/getSpaceById",
    params: {
      id,
    },
  });
};

//获取所有的广告列表
export const getAdList = () => {
  return request({
    method: "GET",
    url: "/front/ad/getAdList",
  });
};

//更新广告的状态
export const updateStatus = (params: any) => {
  return request({
    method: "GET",
    url: "/front/ad/updateStatus",
    params,
  });
};

//新增或者修改广告信息
export const saveOrUpdate = (data: any) => {
  return request({
    method: "POST",
    url: "/front/ad/saveOrUpdate",
    data,
  });
};

//根据Id获取广告信息
export const getAdById = (id: string | number) => {
  return request({
    method: "GET",
    url: "/front/ad/getAdById",
    params: {
      id,
    },
  });
};
