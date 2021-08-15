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
