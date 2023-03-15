import {
  BaseIdValidate,
} from "../utils/constant";
import { Config } from '../config';
import { FastifyInstance } from "fastify";
import Joi from "joi";
import PermissionService from "../services/permission";
import UserService from "../services/user";
import RoleService from "../services/role";

/** 权限对象参数校验 */
const PermissionValidate = Joi.object<Permission>({
  type: Joi.allow(0, 1).required(),
  permission: Joi.string().min(1).max(1000).required(),
  // 上级id
  parentId: Joi.string().length(24),
  icon: Joi.string().max(1000),
  // 路径
  url: Joi.string().max(1000),
  menuName: Joi.string().max(1000)
});

/** 权限分页查询参数校验 */
const PermissionPageQueryValidate = Joi.object<PermissionPageQuery>({
  page: Joi.number().min(0).integer().required(),
  pageSize: Joi.number().min(0).integer().required(),
  permission: Joi.string().max(1000),
  type: Joi.allow(0, 1)
});

/** rbac权限系统 */
export const setupPermissionRouter = (app: FastifyInstance) => {
  /** 新增权限 */
  app.post("/permission/add", async (req, res) => {
    const data = req.body as Permission;

    const validate = PermissionValidate.validate(data);

    if (validate.error) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await PermissionService.add(data);

    res.status(result.code).send(result);
  });

  /** 删除权限 */
  app.delete("/permission/:id", async (req, res) => {
    const { id = "" } = req.params as { id: string };

    const validate = BaseIdValidate.validate(id);

    if (validate.error) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await PermissionService.remove(id);

    res.status(result.code).send(result);
  });

  /** 修改权限 */
  app.put("/permission/:id", async (req, res) => {
    const data = req.body as Permission;
    const { id = "" } = req.params as { id: string };

    const idValidate = BaseIdValidate.validate(id);
    const validate = PermissionValidate.validate(data);

    const validateResult = idValidate.error || validate.error;

    if (validateResult) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await PermissionService.update(id, data);

    res.status(result.code).send(result);
  });

  /** 分页获取权限 */
  app.post("/permission/page", async (req, res) => {
    const data = req.body as PermissionPageQuery;

    const validate = PermissionPageQueryValidate.validate(data);

    if (validate.error) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await PermissionService.page(data);

    res.status(result.code).send(result);
  });

  /** 获取权限列表 */
  app.get("/permission/list", async (_, res) => {
    const result = await PermissionService.list();
    res.status(result.code).send(result);
  });

  /** 获取权限详情 */
  app.get("/permission/:id", async (req, res) => {
    const { id = "" } = req.params as { id: string };

    const validate = BaseIdValidate.validate(id);

    if (validate.error) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await PermissionService.info(id);

    res.status(result.code).send(result);
  });

  /** 获取登录用户的权限信息 */
  app.get("/permission/self", async (req, res) => {
    const token = req.headers[Config.RequestHeaderAuthorizationKey] as string;

    const userInfo = await UserService.getUserInfoByToken(token);

    const result = await RoleService.info(userInfo.data!.roleId);

    if (result.code !== 200) {
      return res.status(result.code).send(result);
    }

    /** 管理员 */
    if (result.data?.isAdmin) {
      const result = await PermissionService.list();
      return res.status(result.code).send(result);
    }

    const permissionIds = result.data!.permission;

    const permissionInfoList = await PermissionService.getInfoByIds(
      permissionIds
    );

    res.status(permissionInfoList.code).send(permissionInfoList);
  });
};
