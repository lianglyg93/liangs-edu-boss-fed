import request from "@/utils/request";
// import qs from "qs";

// 获取所有菜单
export const getAllMenu = () => {
  return request({
    method: "GET",
    url: "/boss/menu/getAll",
  });
};

type MenuForm = {
  id?: number | string;
  parentId: number | string;
  name: string;
  href: string;
  icon?: string;
  orderNum?: number | string;
  description?: string;
  shown?: boolean;
};

// 保存或新增菜单
export const saveOrUpdate = (data: MenuForm) => {
  return request({
    method: "POST",
    url: "/boss/menu/saveOrUpdate",
    data,
  });
};

// 获取编辑菜单页面信息
export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: "GET",
    url: "/boss/menu/getEditMenuInfo",
    params: {
      id,
    },
  });
};
// 删除菜单
export const deleteMenu = (id: string | number) => {
  return request({
    method: "DELETE",
    url: "/boss/menuo",
    params: {
      id,
    },
  });
};
