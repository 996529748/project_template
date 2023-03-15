import { dataDesensitization } from "../utils/function";
import { FastifyInstance } from "fastify";
import Joi from "joi";
import * as UserService from "../services/user";
import { BaseIdValidate } from "../utils/constant";
import { Config } from '../config';
import jwt from "jsonwebtoken";

// 登录参数校验
const UserLoginValidate = Joi.object<UserLoginCredentials>({
  username: Joi.string().min(3).max(16).required(),
  password: Joi.string().min(6).max(16).required()
});

// 用户注册参数校验
const UserRegisterValidate = Joi.object<UserRegisterCredentials>({
  username: Joi.string().min(3).max(16).required(),
  password: Joi.string().min(6).max(16).required(),
  roleId: BaseIdValidate,
  sex: Joi.allow(0, 1, 2),
  memo: Joi.string().max(50),
  avatarUrl: Joi.string().max(1000)
});

const UserEditValidate = Joi.object<UserRegisterCredentials>({
  username: Joi.string().min(3).max(16),
  password: Joi.string().min(6).max(16),
  roleId: BaseIdValidate,
  sex: Joi.allow(0, 1, 2),
  memo: Joi.string().max(50),
  avatarUrl: Joi.string().max(1000)
});
const UserPageSearchValidate = Joi.object<UserPageSearch>({
  username: Joi.string(),
  page: Joi.number().min(0).integer().required(),
  pageSize: Joi.number().min(0).integer().required()
});

export const setupUserRouter = (app: FastifyInstance) => {
  // 测试接口
  // app.post("/test/1", async (req, res) => {
  //   const params = await req.file();
  //   console.log("这是params", req.params);
  //   console.log("这是params", params);
  //   res.status(200).send({ code: 200, data: { msg: "hello world" } });
  // });

  // 登录接口
  app.post("/user/login", async (req, res) => {
    const data = req.body as UserLoginCredentials;

    console.log(data);

    const result = UserLoginValidate.validate(data);

    if (result.error) {
      res.status(500).send({ msg: result.error, code: 500 });
      return;
    }

    const ret = await UserService.login(data);

    res.status(ret.code).send(ret);
  });

  // 用户注册
  app.post("/user/register", async (req, res) => {
    const data = req.body as UserRegisterCredentials;

    const result = UserRegisterValidate.validate(data);

    if (result.error) {
      res.status(500).send({ msg: result.error, code: 500 });
      return;
    }

    const ret = await UserService.register(data);

    res.status(ret.code).send(ret);
  });

  // 获取用户信息
  app.get("/user/:id", async (req, res) => {
    const params = req.params as { id: string };
    const id = params.id;

    const result = BaseIdValidate.validate(id);

    if (result.error) {
      res.status(500).send({ msg: result.error, code: 500 });
      return;
    }

    const ret = await UserService.getUserInfo(id);

    const formatData = ret.data && dataDesensitization(ret.data);

    res.status(ret.code).send({ code: ret.code, data: formatData });
  });

  // 分页获取用户信息
  app.post("/user/page", async (req, res) => {
    const data = req.body as UserPageSearch;

    const result = UserPageSearchValidate.validate(data);

    if (result.error) {
      res.status(500).send({ msg: result.error, code: 500 });
      return;
    }

    const ret = await UserService.page(Object.assign({}, data));

    const formatData = ret.data && dataDesensitization(ret.data.list);

    res
      .status(ret.code)
      .send({ code: ret.code, data: { ...ret.data, list: formatData } });
  });

  // 用户编辑接口
  app.put("/user/:userId", async (req, res) => {
    const data = req.body as OptionalUserRegisterCredentials;

    const result = UserEditValidate.validate(data);
    const params = req.params as { userId: string };

    if (result.error) {
      res.status(500).send({ msg: result.error, code: 500 });
      return;
    }

    const ret = await UserService.update(params.userId, data);

    res.status(ret.code).send(ret);
  });

  // 获取当前登录的用户信息
  app.post("/user", async (req, res) => {

    const token = req.headers[Config.RequestHeaderAuthorizationKey];

    const data = jwt.decode(token!) as UserTokenInfo;

    const ret = await UserService.getUserInfo(data._id);

    const formatData = ret.data;

    res.status(ret.code).send({ code: ret.code, data: formatData });
  });

  // 删除用户
  app.delete('/user/:userId', async (req, res) => {
    const { userId = "" } = req.params as { userId: string };

    const result = await UserService.remove(userId);

    res.status(result.code).send(result);
  })
};
