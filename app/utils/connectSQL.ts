import { Config, MySQLConfig } from "../config";
import { Db, MongoClient } from "mongodb";
import mysql2 from "mysql2";

// 连接至mongodb数据库
export const connectMongo = (): Promise<Db> =>
  new Promise((resolve, reject) => {
    client
      .connect()
      .then(db => {
        resolve(db.db("manage"));
      })
      .catch(err => {
        console.log("数据库连接失败");
        reject(err);
      });
  });

export const closeConnect = async () => {
  if (mongoClosing) {
    clearTimeout(mongoClosingTimer);
  }
  mongoClosing = true;
  return new Promise<void>(resolve => {
    resolve();
    mongoClosingTimer = setTimeout(async () => {
      await client.close();
      mongoClosing = false;
    }, 1000 * 60);
  });
};

// 连接至mysql数据库
export class MySQL {
  connect: mysql2.Connection = mysql2.createConnection(MySQLConfig);

  constructor() {
    this.handleError(false);
  }

  handleError(init = true) {

    if (init) {
      this.connect.end();
      this.connect = mysql2.createConnection(MySQLConfig)
    }

    this.connect.on('error', () => {
      console.log('重连sql')
      this.handleError();
    })
  }
}

// export const connectMySQL = () => {
//   const createConnect = () => {
//     return new Promise<mysql2.Connection>((resolve) => {
//       resolve(mysql.connect)
//     });
//   };

//   return [createConnect] as const;
// };

const client = new MongoClient(Config.MongoDbURL);
let mongoClosing = false;
let mongoClosingTimer: ReturnType<typeof setTimeout>;
// 调起MYSQL服务
// const mysql = new MySQL();