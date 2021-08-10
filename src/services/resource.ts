import request from "@/utils/request";

type MenuForm = {
  id?: number | string;
  name?: string;
  startCreateTime?: string;
  url?: string;
  categoryId?: number | null;
  endCreateTime?: string;
  current?: number;
  size?: number;
  description?: string;
  sort?: number | null;
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
// 获取资源
export const getResource = (id: string | number = -1) => {
  return request({
    method: "GET",
    url: `/boss/resource/${id}`,
  });
};
// 删除资源
export const deleteResource = (id: string | number = -1) => {
  return request({
    method: "DELETE",
    url: `/boss/resource/${id}`,
  });
};

// 保存或者更新资源
export const saveOrUpdate = (data: MenuForm) => {
  return request({
    method: "POST",
    url: "/boss/resource/saveOrUpdate",
    data,
  });
};

// 保存或者更新资源分类
export const saveOrderUpdate = (data: MenuForm) => {
  return request({
    method: "POST",
    url: "/boss/resource/category/saveOrderUpdate",
    data,
  });
};
// 删除资源分类
export const deleteResourceCategory = (id: string | number = -1) => {
  return request({
    method: "DELETE",
    url: `/boss/resource/category/${id}`,
  });
};
