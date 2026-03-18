import { ZodiacResult } from './types';
import { ZODIACS } from './mockData';
import { getZodiacFortune } from './textTemplates';
import { randomInt } from './utils';

/**
 * 根据日期获取星座
 * @param date 日期
 * @returns 星座名称
 */
export function getZodiac(date: Date): string {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // 遍历 12 星座，找到匹配的
  for (const zodiac of ZODIACS) {
    // 处理不跨年的星座
    if (zodiac.startMonth <= zodiac.endMonth) {
      if ((month === zodiac.startMonth && day >= zodiac.startDay) ||
          (month === zodiac.endMonth && day <= zodiac.endDay) ||
          (month > zodiac.startMonth && month < zodiac.endMonth)) {
        return zodiac.name;
      }
    }
  }

  // 特殊情况：摩羯座跨年（12月22日-1月19日）
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return '摩羯座';
  }

  return '未知';
}

/**
 * 生成星座运势
 * @param zodiacName 星座名称
 * @returns 星座运势结果
 */
export function generateZodiacFortune(zodiacName: string): ZodiacResult {
  // 获取星座信息
  const zodiac = ZODIACS.find(z => z.name === zodiacName);

  // 生成三维运势（1-5 星）
  const love = randomInt(1, 5);
  const career = randomInt(1, 5);
  const wealth = randomInt(1, 5);

  // 生成运势描述
  const description = getZodiacFortune(zodiacName);

  return {
    name: zodiacName,
    symbol: zodiac?.symbol || '✨',
    date: '今日',
    fortune: { love, career, wealth },
    description,
  };
}
