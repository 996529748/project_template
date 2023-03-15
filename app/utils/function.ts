import { UserInfoWithId, UserInfoWithIdWithRole } from "../services/user";
import { WithId } from "mongodb";
import fs from "fs";

export type UserInfoWithoutSensitiveWithId = WithId<UserInfoWithoutSensitive>;
export type UserInfoWithoutSensitiveWithIdWithRole = WithId<
  UserInfoWithoutSensitive & { role: Role }
>;

export function dataDesensitization(
  data: UserInfoWithId
): UserInfoWithoutSensitiveWithId;
export function dataDesensitization(
  data: UserInfoWithId[]
): UserInfoWithoutSensitiveWithId[];
export function dataDesensitization(
  data: UserInfoWithIdWithRole
): UserInfoWithoutSensitiveWithIdWithRole;
export function dataDesensitization(
  data: UserInfoWithIdWithRole[]
): UserInfoWithoutSensitiveWithIdWithRole[];
/** 用户数据脱敏 */
export function dataDesensitization(
  data:
    | UserInfoWithId
    | UserInfoWithId[]
    | UserInfoWithIdWithRole
    | UserInfoWithIdWithRole[]
):
  | UserInfoWithoutSensitiveWithId
  | UserInfoWithoutSensitiveWithId[]
  | UserInfoWithoutSensitiveWithIdWithRole
  | UserInfoWithoutSensitiveWithIdWithRole[] {
  if (data instanceof Array) {
    return data.map(info => dataDesensitization(info));
  } else {
    const {
      username,
      sex,
      memo,
      roleId,
      creTime,
      updateTime,
      _id,
      avatarUrl,
    } = data;

    const result = {
      username,
      sex,
      memo,
      roleId,
      creTime,
      updateTime,
      _id,
      avatarUrl,
    }

    const obj: { role?: Role } = {};
    if ('role' in data) obj['role'] = data['role'];

    return {
      ...result,
      ...obj
    };
  }
}

/** 扫描本地目录 */
export function scanDirectory(addr: string) {
  return new Promise<string[]>(resolve => {
    fs.readdir(addr, (err, res) => {
      if (!err) {
        resolve(res.map(d => `${addr}/${d}`));
      } else {
        resolve([]);
      }
    });
  });
}
