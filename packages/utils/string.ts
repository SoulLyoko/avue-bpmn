/**
 * 生成uuid
 * @param {Number} length 长度
 * @param {Number} radix 基数长度
 * @returns {String} 生成的uuid
 */
export function uuid(length = 16, radix?: number) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const randomNum = radix || chars.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    result[i] = chars.charAt(Math.random() * randomNum);
  }
  return result.join("");
}
