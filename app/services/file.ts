import { ObjectId } from "mongodb";
import { closeConnect, connectMongo } from "../utils/connectSQL";

/** 文件上传 */
export const addFile = async (
  filename: string,
  fileType: string
): Promise<ResponseInfo<{ id: string, suffix: string }>> => {
  const fileDataSet = await (await connectMongo()).collection<FileSchema>("file");

  const id = new ObjectId();
  const arr = filename.split('.');

  if (arr.length <= 1) {
    return { code: 500, msg: "文件格式错误" };
  }

  const suffix = arr[arr.length - 1];

  await fileDataSet.insertOne({ filename, _id: id, url: `/assets/${id}.${suffix}`, fileType })

  await closeConnect();

  return { code: 200, msg: "保存成功", data: { id: id.toString(), suffix } };
};

export const getFileInfo = async (idWithSuffix: string): Promise<ResponseInfo<FileSchema>> => {
    const [id] = idWithSuffix.split('.');

    const fileDataSet = await (await connectMongo()).collection<FileSchema>("file");

    const fileInfo = await fileDataSet.findOne({
        _id: new ObjectId(id)
    });

    if (!fileInfo) {
        return { code: 404, msg: '资源不存在' };
    }

    return { code: 200, msg: "保存成功", data: fileInfo };
}