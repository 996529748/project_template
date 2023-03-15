import fastify from "fastify";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";
import { setupFileRouter } from "./routes/file";
import { setupBaseRouter } from "./routes/index";
import { setupUserRouter } from "./routes/user";
import { setupPermissionRouter } from "./routes/permission";
import { setupRoleRouter } from "./routes/role";

const app = fastify({
  logger: true
})
  // formData处理
  .register(multipart, {})
  // cors处理
  .register(cors, {
    allowedHeaders: "Content-Type,authorization",
    origin: "*"
  });

app.setErrorHandler((err, _, res) => {
  res.status(500).send(err);
});

setupBaseRouter(app);
setupUserRouter(app);
setupFileRouter(app);
setupPermissionRouter(app);
setupRoleRouter(app);

app.listen(
  {
    port: 8080,
    host: "0.0.0.0"
  },
  (err, addr) => {
    if (err) {
      console.log("服务启动失败：");
      console.log(err);
      return;
    }
    console.log(`服务启动成功：${addr}...`);
  }
);

export default app;

// https://github.com/fastify/fastify-example-twitter
