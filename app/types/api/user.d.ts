// 用户登录凭证
interface UserLoginCredentials {
  username: string;
  password: string;
}

type UserRegisterSensitive = UserInfoSensitive;

// 用户注册凭证
interface UserRegisterCredentials extends UserRegisterSensitive {
  username: string;
  sex?: Sex;
  memo?: string;
  // 角色id
  roleId: string;
  // 用户头像
  avatarUrl?: string;
}

// 选项化用户注册凭证
type OptionalUserRegisterCredentials = Partial<UserRegisterCredentials>;

type UserInfoWithToken = UserInfo & { token: string };

// 数据库中存储的用户信息
interface UserInfo extends UserInfoSensitive {
  username: string;
  sex: Sex;
  memo?: string;
  roleId: string;
  creTime: string;
  updateTime: string;
  avatarUrl?: string;
}

type UserInfoWithoutSensitive = Omit<UserInfo, keyof UserInfoSensitive>;

/** 用户敏感数据 */
interface UserInfoSensitive {
  password: string;
}

type Sex = 0 | 1 | 2;

interface UserTokenInfo {
  _id: string;
}

type UserPageSearch = WithPageQuery<
  Partial<{
    username: string;
  }>
>;
