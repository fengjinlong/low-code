let baseURL = "";
if (process.env.NODE_ENV === "development") {
  // // 设置默认本地开发
  baseURL = "http://192.168.32.76:18045";
  // baseURL = "http://192.158.3.108:18045";
} else if (process.env.NODE_ENV === "production_1" || process.env.NODE_ENV === "production_2") {
  // 正式
  baseURL = "http://192.168.32.62:18045";
} else {
}

export default baseURL;
