/**
 * 过滤对象值和字段
 * @param {object} obj 被过滤对象
 * @param {any[]} values 被过滤的值
 * @param {string[]} fields 被过滤字段
 */
export function filterObj(obj: Record<string, any>, values: any[] = [undefined, null], fields: string[] = []) {
  const temp: Record<string, any> = {};
  for (const key in obj) {
    const valuesValid = values.every(val => obj[key] !== val);
    const fieldsValid = fields.every(str => !key.includes(str));
    if (valuesValid && fieldsValid) {
      temp[key] = obj[key];
    }
  }
  return temp;
}
