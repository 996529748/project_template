import { closeConnect, connectMongo } from "../utils/connectSQL";
import jwt from "jsonwebtoken";
import { Config } from "../config";

export default {
  /** 获取数据库中存储的token信息 */
  findTokenFromDB: async (params: TokenSearchParams) => {
    const tokenDataSet = await (await connectMongo()).collection<ConnectToken>('tokens');
    const lib_token = await tokenDataSet.findOne(
      params
    );

    await closeConnect();

    return lib_token;
  },

  /** 刷新token, 如果不存在则新建token */
  updateToken: async (userId: string, refreshAssessToken: boolean = false) => {
    // 获取新的token
    const newToken = jwt.sign(
      {
        _id: userId
      },
      Config.AssessTokenKey,
      {
        expiresIn: "1h",
        issuer: "villageStyle"
      }
    );

    const tokenDataSet = await (await connectMongo()).collection<ConnectToken>('tokens');

    const exist = await tokenDataSet.findOne({ userId: userId });

    if (exist) {
      const refreshData: Record<string, string> = {
        refresh_token: newToken,
        assess_token: newToken
      };
      if (!refreshAssessToken) {
        delete refreshData.assess_token;
      }
      // 更新token
      await tokenDataSet.updateOne(
        {
          userId: userId
        },
        {
          $set: refreshData
        }
      );
    } else {
      await tokenDataSet.insertOne({
        userId: userId,
        refresh_token: newToken,
        assess_token: newToken
      })
    }

    //  关闭数据库链接
    await closeConnect();

    return newToken;
  }

};

interface TokenSearchParams {
  userId?: string;
  assess_token?: string;
}
