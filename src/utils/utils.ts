//效验手机号
const checkTelValidator = (data: string): boolean =>
  /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(data);
export default {
  checkTelValidator,
};
