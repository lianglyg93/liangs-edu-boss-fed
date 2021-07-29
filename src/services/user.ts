import request from "@/utils/request";
import qs from "qs";

interface User {
  phone: string;
  password: string;
}

export const login = (data: User) => {
  request({
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    url: "/front/user/login",
    data: qs.stringify(data),
  });
};
