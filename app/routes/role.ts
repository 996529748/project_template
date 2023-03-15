import { BaseIdValidate } from "../utils/constant";
import { FastifyInstance } from "fastify";
import Joi from "joi";
import RoleService from "../services/role";
/** 角色对象参数校验 */
const RoleValidate = Joi.object<Role>({
  name: Joi.string().min(1).max(1000).required(),
  permission: Joi.array().required(),
  isAdmin: Joi.allow(0, 1).required()
});

/** 角色分页查询参数校验 */
const RolePageQueryValidate = Joi.object<RolePageQuery>({
  page: Joi.number().min(0).integer().required(),
  pageSize: Joi.number().min(0).integer().required(),
  name: Joi.string().max(1000)
});

export const setupRoleRouter = (app: FastifyInstance) => {
  /** 新增角色 */
  app.post("/role/add", async (req, res) => {
    const data = req.body as Role;

    const validate = RoleValidate.validate(data);

    if (validate.error) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await RoleService.add(data);

    res.status(result.code).send(result);
  });

  /** 删除角色 */
  app.delete("/role/:id", async (req, res) => {
    const { id = "" } = req.params as { id: string };

    const validate = BaseIdValidate.validate(id);

    if (validate.error) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await RoleService.remove(id);

    res.status(result.code).send(result);
  });

  /** 修改角色 */
  app.put("/role/:id", async (req, res) => {
    const data = req.body as Role;
    const { id = "" } = req.params as { id: string };

    const idValidate = BaseIdValidate.validate(id);
    const validate = RoleValidate.validate(data);

    const validateResult = idValidate.error || validate.error;

    if (validateResult) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await RoleService.update(id, data);

    res.status(result.code).send(result);
  });

  /** 分页获取角色 */
  app.post("/role/page", async (req, res) => {
    const data = req.body as RolePageQuery;

    const validate = RolePageQueryValidate.validate(data);

    if (validate.error) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await RoleService.page(data);

    res.status(result.code).send(result);
  });

  /** 获取角色列表 */
  app.get("/role/list", async (_, res) => {
    const result = await RoleService.list();
    res.status(result.code).send(result);
  });

  /** 获取角色详情 */
  app.get("/role/:id", async (req, res) => {
    const { id = "" } = req.params as { id: string };

    const validate = BaseIdValidate.validate(id);

    if (validate.error) {
      return res.status(500).send({ code: 500, msg: validate.error });
    }

    const result = await RoleService.info(id);

    res.status(result.code).send(result);
  });
};
