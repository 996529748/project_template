import { ConnectionOptions } from "mysql2";

export const Config = {
  // 用来做token加密的信息
  SysNo: "admin",
  AssessTokenKey: "VillageStyle",
  // MongoDB的连接地址
  MongoDbURL: "mongodb://127.0.0.1:27017",
  // 携带token的授权key
  RequestHeaderAuthorizationKey: "authorization",
  // 定义的游客权限
  TouristRoleId: "635b9ed1598b0f279f08fbc4"
} as const;

export const MySQLConfig: ConnectionOptions = {
  password: "xxxx",
  user: "xxxx",
  host: "xxxxxxxxxx",
  port: 3306,
  database: "xxxx",
  connectTimeout: 2880000
}