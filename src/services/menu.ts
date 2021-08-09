import request from "@/utils/request";
// import qs from "qs";

export const getAllMenu = () => {
  return request({
    method: "GET",
    url: "/boss/menu/getAll",
  });
};
