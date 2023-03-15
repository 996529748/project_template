import { FastifyInstance } from "fastify";
import fs from "fs";
import * as FileServer from "../services/file";

/** 文件上传读取流程 */
export const setupFileRouter = (app: FastifyInstance) => {
  // 文件上传
  app.post("/file/upload", async (req, res) => {
    const file = await req.file();
    const buffer = await file.toBuffer();

    const result = await FileServer.addFile(file.filename, file.mimetype);
    const fileUrl = `./assets/${result.data?.id}.${result.data?.suffix}`;

    fs.appendFileSync(fileUrl, buffer);

    res
      .status(result.code)
      .send({ code: result.code, msg: result.msg, data: fileUrl.slice(1) });
  });

  // 静态文件获取
  app.get("/assets/:id", async (req, res) => {
    const params = req.params as { id: string };
    const id = params.id;

    const fileInfo = await FileServer.getFileInfo(id);

    const data = fs.readFileSync(`.${fileInfo.data?.url}`, {
      encoding: "binary"
    });

    const buffer = Buffer.from(data, "binary");

    res
      .status(200)
      .headers({
        "Content-Disposition": `attachment;filename="${encodeURIComponent(
          fileInfo.data?.filename || ""
        )}"`,
        "content-type": fileInfo.data?.fileType,
        "content-length": buffer.byteLength
      })
      .send(buffer);
  });
};
