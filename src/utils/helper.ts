import type { IConstant } from "./constants";
import type { AllDataType, ArrayData } from "#/public";

/**
 * 首字母大写
 * @param str - 传入英文字符串
 */
export function firstCapitalize(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

/**
 * 金额格式化3000->3,000
 * @param amount - 金额
 */
export function amountFormatter(amount: number) {
  return `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 过滤空数据
 * @param obj - 传入对象
 */
type EmptyData = Record<string, AllDataType>
export function filterEmptyValue(obj: EmptyData): EmptyData {
  const res: EmptyData = {};

  for (let key in obj) {
    // 去除key中多余的空格
    key = key.trim();

    // undefined过滤
    if (obj[key] === undefined) continue;

    // null过滤
    if (obj[key] === null) continue;

    // 空数组过滤
    if (
      obj[key]?.constructor === Array &&
      (obj[key] as ArrayData).length === 0
    ) continue;

    // 空字符串过滤
    if (
      obj[key]?.constructor === String &&
      (obj[key] as string).length === 0
    ) continue;

    // 空对象过滤
    if (
      obj[key]?.constructor === Object &&
      Object.keys(obj[key] as object).length === 0
    ) continue;

    // 去除字符串多余空格
    if (obj[key]?.constructor === String) {
      res[key] = (obj[key] as string).trim();
    } else {
      res[key] = obj[key];
    }
  }

  return res;
}

/**
 * 递归数据
 * @param data - 数据源
 */
interface IRecursiveChildren<T> { children?: T[] }
export function recursiveData<T extends IRecursiveChildren<T>, U>(
  data: T[],
  callback: (data: T) => U
): U[] {
  if (data. length === 0) return [];
  const res: U[] = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const filterData = callback(element);
    const children = element.children ? recursiveData(element.children, callback) : undefined;
    res.push({ ...filterData, children });
  }

  return res;
}

/**
 * 处理回显数据
 * @param arr - 数组
 */
export function handleEchoArr(value: unknown, arr: IConstant[]) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.value === value) {
      return item.label;
    }
  }

  return '';
}

/**
 * 处理回显颜色
 * @param arr - 数组
 */
export function handleEchoColor(value: unknown, arr: IConstant[]) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.value === value) {
      return item.color;
    }
  }

  return '';
}