import { ValidateResult } from './types';

/**
 * 验证日期时间格式
 * @param date 日期字符串 YYYY-MM-DD
 * @param time 时间字符串 HH:mm
 * @returns 验证结果
 */
export function validateDateTime(date: string, time: string): ValidateResult {
  // 验证日期格式 YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return { valid: false, error: '日期格式错误，请使用 YYYY-MM-DD 格式' };
  }

  // 验证时间格式 HH:mm
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(time)) {
    return { valid: false, error: '时间格式错误，请使用 HH:mm 格式' };
  }

  // 解析日期
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  // 验证日期范围（1900-2100）
  if (year < 1900 || year > 2100) {
    return { valid: false, error: '年份范围超出支持范围（1900-2100）' };
  }

  // 验证日期是否有效
  if (isNaN(dateObj.getTime())) {
    return { valid: false, error: '日期无效' };
  }

  // 验证月份范围
  if (month < 1 || month > 12) {
    return { valid: false, error: '月份无效' };
  }

  // 验证日期范围
  if (day < 1 || day > 31) {
    return { valid: false, error: '日期无效' };
  }

  // 验证日期不能超过当前日期
  if (dateObj > new Date()) {
    return { valid: false, error: '出生日期不能超过当前日期' };
  }

  // 验证时间
  const [hour, minute] = time.split(':').map(Number);
  if (hour < 0 || hour > 23) {
    return { valid: false, error: '小时无效（00-23）' };
  }
  if (minute < 0 || minute > 59) {
    return { valid: false, error: '分钟无效（00-59）' };
  }

  return { valid: true };
}

/**
 * 生成随机数（闭区间）
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 从数组中随机选择元素
 * @param arr 数组
 * @returns 随机元素
 */
export function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 从数组中随机选择多个元素（不重复）
 * @param arr 数组
 * @param count 选择数量
 * @returns 随机元素数组
 */
export function randomChoices<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

/**
 * 随机正逆位
 * @returns 'upright' 或 'reversed'
 */
export function randomOrientation(): 'upright' | 'reversed' {
  return Math.random() > 0.5 ? 'upright' : 'reversed';
}

/**
 * 打乱数组
 * @param arr 数组
 * @returns 打乱后的数组
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 数组求和
 * @param arr 数字数组
 * @returns 总和
 */
export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

/**
 * 数组平均值
 * @param arr 数字数组
 * @returns 平均值
 */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

/**
 * 限制数值在范围内
 * @param value 数值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的数值
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
