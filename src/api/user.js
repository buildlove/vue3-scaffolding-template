import request from "@/utils/request";

export function getSecurityUser(data) {
  return request({
    url: "/role/getSecurityUser",
    method: "POST",
    data,
  });
}