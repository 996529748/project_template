import { dataDesensitization } from "../utils/function";
import { ObjectId, WithId } from "mongodb";
import { closeConnect, connectMongo } from "../utils/connectSQL";
import TokenService from "./token";
import { TouristRoleId } from "../utils/constant";

export type UserInfoWithId = WithId<UserInfo>;
export type UserInfoWithoutSensitiveWithId = WithId<UserInfoWithoutSensitive>;
export type UserInfoWithIdWithRole = UserInfoWithId & { role: Role };
export type UserInfoWithoutSensitiveWithIdAndToken =
  UserInfoWithoutSensitiveWithId & { token: string };

/** 用户登录 */
export const login = async (
  data: UserLoginCredentials
): Promise<ResponseInfo<UserInfoWithoutSensitiveWithIdAndToken>> => {
  const userDataSet = await (
    await connectMongo()
  ).collection<UserInfoWithId>("user");

  const user = await userDataSet.findOne({ ...data });

  await closeConnect();

  if (user) {
    const token = await TokenService.updateToken(user._id.toString(), true);

    const userInfo = await getUserInfo(user._id.toString());

    const result = userInfo.data && dataDesensitization(userInfo.data);

    return {
      code: 200,
      data: { ...(result as UserInfoWithoutSensitiveWithId), token }
    };
  } else {
    return { code: 500, msg: "用户名或密码错误" };
  }
};

/** 删除用户 */
export const remove = async (userId: string) => {
  const userDataSet = await (
    await connectMongo()
  ).collection<UserInfoWithId>("user");

  await userDataSet.deleteOne({
    _id: new ObjectId(userId)
  });

  await closeConnect();

  return { code: 200 };
};

// 注册用户
export const register = async (
  data: UserRegisterCredentials
): Promise<ResponseInfo<null>> => {
  const userDataSet = await (
    await connectMongo()
  ).collection<UserInfoWithId>("user");

  const exist = await existUsername(data.username);

  if (exist) {
    return { code: 500, msg: "已存在同名用户" };
  }

  const userId = new ObjectId();


  await userDataSet.insertOne({
    ...data,
    sex: data.sex || 2,
    _id: userId,
    roleId: data.roleId || TouristRoleId,
    creTime: new Date().getTime().toString(),
    updateTime: new Date().getTime().toString(),
  });

  closeConnect();

  return { code: 200 };
};

/** 获取用户信息 */
export const getUserInfo = async (
  userId: string
): Promise<ResponseInfo<UserInfoWithId>> => {
  const userDataSet = await (
    await connectMongo()
  ).collection<UserInfoWithId>("user");

  // const userInfo = null;

  const userInfo = await userDataSet.findOne({
    _id: new ObjectId(userId)
  });

  await closeConnect();

  if (userInfo) {
    return { code: 200, data: userInfo };
  } else {
    return { code: 500, msg: "用户信息不存在" };
  }
};

/** 更新用户数据 */
export const update = async (
  userId: string,
  data: OptionalUserRegisterCredentials
): Promise<ResponseInfo<null, string>> => {
  const userDataSet = await (
    await connectMongo()
  ).collection<UserInfoWithId>("user");

  const exist = await getUserInfo(userId);

  const mergeData = {
    ...exist.data,
    ...data
  };

  delete mergeData._id;

  if (exist.code === 200) {
    const existName = await existUsername(mergeData.username!, userId);

    if (existName) {
      return { code: 500, msg: "已存在同名用户" };
    }

    await userDataSet.updateOne(
      {
        _id: new ObjectId(userId)
      },
      {
        $set: mergeData
      }
    );

    await closeConnect();
    return { code: 200 };
  } else {
    return { code: 500, msg: "用户信息不存在" };
  }
};

/** 分页获取用户信息 */
export const page = async (
  data: UserPageSearch
): Promise<ResponseInfo<PageResponse<UserInfoWithIdWithRole[]>>> => {
  const userDataSet = await (
    await connectMongo()
  ).collection<UserInfoWithId>("user");

  console.log("data", data);

  /** 聚合搜索 */
  const result: UserInfoWithIdWithRole[] = await userDataSet
    .aggregate<UserInfoWithIdWithRole>([
      {
        $lookup: {
          from: "role",
          // 转化为objectId类型
          let: { searchId: { $toObjectId: "$roleId" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$searchId" }] }
              }
            }
          ],
          as: "role"
        }
      },
      {
        $set: {
          role: {
            // 截取第一位
            $arrayElemAt: ["$role", 0]
          }
        }
      },
      // 不包含role.permission字段
      { $unset: "role.permission" },
    ])
    .skip((data.page - 1) * data.pageSize)
    .limit(data.pageSize)
    .toArray();

  const count = await userDataSet.find().count();

  closeConnect();

  return {
    code: 200,
    data: {
      list: result,
      totalPage: Math.ceil(count / data.pageSize),
      total: count,
      page: data.page,
      pageSize: data.pageSize
    }
  };
};

/** 根据token获取用户信息 */
export const getUserInfoByToken = async (token: string) => {
  const tokenInfo = await TokenService.findTokenFromDB({
    assess_token: token
  });

  const userInfo = await getUserInfo(tokenInfo!.userId);

  return userInfo;
};

/** 查询是否存在使用改角色id的用户 */
export const existUserUseRoleId = async (roleId: string) => {
  const userDataSet = await (
    await connectMongo()
  ).collection<UserInfoWithId>("user");

  const exist = await userDataSet.findOne({
    roleId
  });

  return !!exist;
};

/** 是否存在同名用户 */
export const existUsername = async (
  username: string,
  ignoreUserId?: string
) => {
  const userDataSet = await (
    await connectMongo()
  ).collection<UserInfoWithId>("user");

  const exist = await userDataSet.findOne({
    username,
    $nor: [{ _id: new ObjectId(ignoreUserId) }]
  });

  await closeConnect();

  return !!exist;
};

export default {
  login,
  register,
  getUserInfo,
  update,
  page,
  getUserInfoByToken,
  existUserUseRoleId
};
