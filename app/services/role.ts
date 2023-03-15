import { closeConnect, connectMongo } from "../utils/connectSQL";
import { ObjectId } from "mongodb";
import UserService from "./user";
import { Config } from "../config";

/** 新增角色 */
export const add = async (data: Role) => {
  const dataSet = await (await connectMongo()).collection<Role>("role");

  const exist = await existRole(data.name);

  if (exist) {
    return { code: 500, msg: "已存在同名角色" };
  }

  await dataSet.insertOne({
    ...data,
    _id: new ObjectId()
  });

  await closeConnect();

  return { code: 200 };
};

/** 删除角色 */
export const remove = async (roleId: string) => {
  const dataSet = await (await connectMongo()).collection<Role>("role");

  if (roleId === Config.TouristRoleId) {
    return { code: 500, msg: "默认角色，禁止删除" };
  }

  // 是否存在使用该角色的用户
  const exist = await UserService.existUserUseRoleId(roleId);

  if (exist) {
    return { code: 500, msg: "存在使用该角色的用户，无法删除" };
  }

  await dataSet.deleteOne({
    _id: new ObjectId(roleId)
  });

  await closeConnect();

  return { code: 200 };
};

/** 更新角色 */
export const update = async (roleId: string, data: Role) => {
  const dataSet = await (await connectMongo()).collection<Role>("role");

  const exist = await existRole(data.name, roleId);

  if (exist) {
    return { code: 500, msg: "已存在同名角色" };
  }

  await dataSet.updateOne(
    {
      _id: new ObjectId(roleId)
    },
    {
      $set: {
        ...data
      }
    }
  );

  await closeConnect();

  return { code: 200 };
};

/** 获取列表 */
export const list = async () => {
  const dataSet = await (await connectMongo()).collection<Role>("role");

  const list = await dataSet.find().toArray();

  await closeConnect();

  return { code: 200, data: list };
};

/** 分页获取角色 */
export const page = async (query: RolePageQuery) => {
  const dataSet = await (await connectMongo()).collection<Role>("role");

  const data = await dataSet
    .find({
      name: {
        $regex: query.name || ""
      }
    })
    .skip((query.page - 1) * query.pageSize)
    .limit(query.pageSize)
    .toArray();

  await closeConnect();

  return { code: 200, data };
};

/** 获取详情 */
export const info = async (roleId: string) => {
  const dataSet = await (await connectMongo()).collection<Role>("role");

  const data = await dataSet.findOne({
    _id: new ObjectId(roleId)
  });

  await closeConnect();

  return { code: 200, data };
};

/** 是否已存在同名角色 */
export const existRole = async (roleName: string, roleId?: string) => {
  const dataSet = await (await connectMongo()).collection<Role>("role");

  const exist = await dataSet.findOne({
    name: roleName,
    $nor: [{ _id: new ObjectId(roleId) }]
  });

  await closeConnect();

  return !!exist;
};

export default {
  add,
  remove,
  list,
  update,
  info,
  page
};
