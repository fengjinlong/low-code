let WEBURL = "";
// 部署哪里写哪里
if (process.env.NODE_ENV === "development") {
  // 开发
  WEBURL = "http://localhost:8080/#";
} else if (process.env.NODE_ENV === "production_1") {
  // 测试
  WEBURL = "http://192.168.32.62:18044/#";
} else if (process.env.NODE_ENV === "production_2") {
  WEBURL = "";
} else {
}

export default WEBURL;
