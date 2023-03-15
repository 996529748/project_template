import { closeConnect, connectMongo } from "../utils/connectSQL";
import { ObjectId } from "mongodb";

/** 新增权限 */
export const add = async (data: Permission) => {
  const dataSet = await (
    await connectMongo()
  ).collection<Permission>("permission");

  const exist = await existPermission(data.permission);
  // 是否已经存在同名的权限
  if (exist) {
    return { code: 500, msg: "已存在同名权限" };
  }

  await dataSet.insertOne({
    ...data,
  });

  await closeConnect();

  return { code: 200 };
};

/** 删除权限 */
export const remove = async (permissionId: string) => {
  const dataSet = await (
    await connectMongo()
  ).collection<Permission>("permission");

  await dataSet.deleteOne({
    _id: new ObjectId(permissionId)
  });

  await closeConnect();

  return { code: 200 };
};

/** 更新权限 */
export const update = async (id: string, data: Permission) => {
  const dataSet = await (
    await connectMongo()
  ).collection<Permission>("permission");

  const exist = await existPermission(data.permission, id);

  if (exist) {
    return { code: 500, msg: "已存在同名权限" };
  }

  await dataSet.updateOne(
    {
      _id: new ObjectId(id)
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
  const dataSet = await (
    await connectMongo()
  ).collection<Permission>("permission");

  const list = await dataSet.find().toArray();

  await closeConnect();

  return { code: 200, data: list };
};

/** 分页获取权限 */
export const page = async (query: PermissionPageQuery) => {
  const dataSet = await (
    await connectMongo()
  ).collection<Permission>("permission");

  const data = await dataSet
    .find({
      permission: {
        $regex: query.permission || ""
      },
      type: query.type
    })
    .skip((query.page - 1) * query.pageSize)
    .limit(query.pageSize)
    .toArray();

  await closeConnect();

  return { code: 200, data };
};

/** 获取详情 */
export const info = async (permissionId: string) => {
  const dataSet = await (
    await connectMongo()
  ).collection<Permission>("permission");

  const data = await dataSet
    .findOne({
      _id: new ObjectId(permissionId)
    });

  await closeConnect();

  return { code: 200, data };
}

/** 根据id列表获取详情 */
export const getInfoByIds = async (permissionIds: string[]) => {
  const dataSet = await (
    await connectMongo()
  ).collection<Permission>("permission");

  const data = await dataSet
    .find({
      $or: permissionIds.map(id => {
        return {
          _id: new ObjectId(id)
        }
      })
    }).toArray();

  await closeConnect();

  return { code: 200, data };
}

/** 权限是否已存在 */
export const existPermission = async (permission: string, ignoreId?: string) => {
  const dataSet = await (
    await connectMongo()
  ).collection<Permission>("permission");

  const exist = await dataSet.findOne({
    permission,
    $nor: [{ _id: new ObjectId(ignoreId) }]
  });

  await closeConnect();

  return !!exist;
}

export default {
  add,
  remove,
  list,
  update,
  info,
  page,
  getInfoByIds
};
