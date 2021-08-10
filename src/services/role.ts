import request from "@/utils/request";

type RoleForm = {
  id?: number | string;
  name?: string;
  startCreateTime?: string;
  // url?: string;
  // categoryId?: number | null;
  endCreateTime?: string;
  current?: number;
  size?: number;
  // description?: string;
  // sort?: number | null;
  code?: string;
};

export const getRoles = (data: RoleForm) => {
  return request({
    method: "POST",
    url: "/boss/role/getRolePages",
    data,
  });
};

export const deleteRole = (id: string | number) => {
  return request({
    method: "DELETE",
    url: `/boss/role/${id}`,
  });
};

export const createOrUpdate = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/role/saveOrUpdate",
    data,
  });
};

export const getRoleById = (id: string | number) => {
  return request({
    method: "GET",
    url: `/boss/role/${id}`,
  });
};

export const getAllRoles = () => {
  return request({
    method: "GET",
    url: "/boss/role/all",
  });
};

export const allocateUserRoles = (data: any) => {
  return request({
    method: "POST",
    url: "/boss/role/allocateUserRoles",
    data,
  });
};

export const getUserRoles = (userId: string | number) => {
  return request({
    method: "GET",
    url: `/boss/role/user/${userId}`,
  });
};
