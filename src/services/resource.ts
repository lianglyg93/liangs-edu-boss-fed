import request from "@/utils/request";
// import qs from "qs";

type MenuForm = {
  id?: number | string;
  name?: string;
  startCreateTime?: string;
  url?: string;
  categoryId?: number | null;
  endCreateTime?: string;
  current?: number;
  size?: number;
};
// 获取所有菜单
export const getResourcePages = (data: MenuForm) => {
  return request({
    method: "POST",
    url: "/boss/resource/getResourcePages",
    data,
  });
};

// 查询资源分类列表
export const getAllCategory = () => {
  return request({
    method: "GET",
    url: "/boss/resource/category/getAll",
  });
};
