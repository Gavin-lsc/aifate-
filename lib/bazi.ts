import { BaziResult } from './types';
import { HEAVENLY_STEMS, EARTHLY_BRANCHES, STEM_ELEMENTS, BRANCH_ELEMENTS } from './mockData';
import { getBaziInterpretation } from './textTemplates';

/**
 * 计算年柱
 * @param year 年份
 * @returns 年柱字符串（天干+地支）
 */
function calculateYearPillar(year: number): string {
  // 年干计算：(year - 4) % 10，结果对应天干索引（注意：甲子年是公元4年）
  let stemIndex = (year - 4) % 10;
  if (stemIndex < 0) stemIndex += 10;

  // 年支计算：(year - 4) % 12
  let branchIndex = (year - 4) % 12;
  if (branchIndex < 0) branchIndex += 12;

  return HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[branchIndex];
}

/**
 * 计算月柱
 * @param year 年份
 * @param month 月份（1-12）
 * @returns 月柱字符串（天干+地支）
 */
function calculateMonthPillar(year: number, month: number): string {
  // 月支固定：寅月（正月）= 2月，卯月=3月...子月=12月
  const monthBranches = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
  const branchIndex = (month - 1) % 12;

  // 月干根据年干和月份推算（五虎遁）
  // 甲己之年丙作首，乙庚之岁戊为头，丙辛之岁庚寅上，丁壬壬寅顺水流，戊癸之年甲寅求
  const yearStem = HEAVENLY_STEMS[(year - 4) % 10];
  let startStemIndex: number;

  switch (yearStem) {
    case '甲':
    case '己':
      startStemIndex = HEAVENLY_STEMS.indexOf('丙');
      break;
    case '乙':
    case '庚':
      startStemIndex = HEAVENLY_STEMS.indexOf('戊');
      break;
    case '丙':
    case '辛':
      startStemIndex = HEAVENLY_STEMS.indexOf('庚');
      break;
    case '丁':
    case '壬':
      startStemIndex = HEAVENLY_STEMS.indexOf('壬');
      break;
    case '戊':
    case '癸':
      startStemIndex = HEAVENLY_STEMS.indexOf('甲');
      break;
    default:
      startStemIndex = 0;
  }

  const stemIndex = (startStemIndex + month - 1) % 10;

  return HEAVENLY_STEMS[stemIndex] + monthBranches[branchIndex];
}

/**
 * 计算日柱
 * @param date 日期对象
 * @returns 日柱字符串（天干+地支）
 */
function calculateDayPillar(date: Date): string {
  // 使用基准日期推算
  // 1900年1月1日是甲戌日
  const baseDate = new Date('1900-01-01');
  const baseStem = HEAVENLY_STEMS.indexOf('甲');
  const baseBranch = EARTHLY_BRANCHES.indexOf('戌');

  // 计算天数差
  const daysDiff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  // 计算日干
  let stemIndex = (baseStem + daysDiff) % 10;
  if (stemIndex < 0) stemIndex += 10;

  // 计算日支
  let branchIndex = (baseBranch + daysDiff) % 12;
  if (branchIndex < 0) branchIndex += 12;

  return HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[branchIndex];
}

/**
 * 计算时柱
 * @param dayPillar 日柱
 * @param hour 小时（0-23）
 * @returns 时柱字符串（天干+地支）
 */
function calculateHourPillar(dayPillar: string, hour: number): string {
  // 时支固定：子时=23-1点，丑时=1-3点...
  const hourBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  let branchIndex = Math.floor((hour + 1) / 2) % 12;
  if (branchIndex < 0) branchIndex += 12;

  // 时干根据日干推算（五鼠遁）
  // 甲己还加甲，乙庚丙作初，丙辛从戊起，丁壬庚子居，戊癸壬寅求
  const dayStem = dayPillar[0];
  let startStemIndex: number;

  switch (dayStem) {
    case '甲':
    case '己':
      startStemIndex = HEAVENLY_STEMS.indexOf('甲');
      break;
    case '乙':
    case '庚':
      startStemIndex = HEAVENLY_STEMS.indexOf('丙');
      break;
    case '丙':
    case '辛':
      startStemIndex = HEAVENLY_STEMS.indexOf('戊');
      break;
    case '丁':
    case '壬':
      startStemIndex = HEAVENLY_STEMS.indexOf('庚');
      break;
    case '戊':
    case '癸':
      startStemIndex = HEAVENLY_STEMS.indexOf('壬');
      break;
    default:
      startStemIndex = 0;
  }

  const stemIndex = (startStemIndex + branchIndex) % 10;

  return HEAVENLY_STEMS[stemIndex] + hourBranches[branchIndex];
}

/**
 * 统计五行数量
 * @param pillars 四柱
 * @returns 五行数量
 */
function countElements(pillars: string[]): { metal: number; wood: number; water: number; fire: number; earth: number } {
  const elements = { metal: 0, wood: 0, water: 0, fire: 0, earth: 0 };

  for (const pillar of pillars) {
    // 统计天干
    const stem = pillar[0];
    const stemElement = STEM_ELEMENTS[stem];
    if (stemElement === '金') elements.metal++;
    else if (stemElement === '木') elements.wood++;
    else if (stemElement === '水') elements.water++;
    else if (stemElement === '火') elements.fire++;
    else if (stemElement === '土') elements.earth++;

    // 统计地支
    const branch = pillar[1];
    const branchElement = BRANCH_ELEMENTS[branch];
    if (branchElement === '金') elements.metal++;
    else if (branchElement === '木') elements.wood++;
    else if (branchElement === '水') elements.water++;
    else if (branchElement === '火') elements.fire++;
    else if (branchElement === '土') elements.earth++;
  }

  return elements;
}

/**
 * 计算八字
 * @param date 出生日期
 * @param time 出生时间（HH:mm）
 * @returns 八字计算结果
 */
export function calculateBazi(date: Date, time: string): BaziResult {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const [hour] = time.split(':').map(Number);

  // 计算四柱
  const yearPillar = calculateYearPillar(year);
  const monthPillar = calculateMonthPillar(year, month);
  const dayPillar = calculateDayPillar(date);
  const hourPillar = calculateHourPillar(dayPillar, hour);

  // 统计五行
  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const elements = countElements(pillars);

  // 找出最旺的五行
  const elementEntries = Object.entries(elements);
  const maxCount = Math.max(...elementEntries.map(([, count]) => count));
  const dominantElements = elementEntries
    .filter(([, count]) => count === maxCount)
    .map(([element]) => element);

  // 元素中文名称映射
  const elementNames: Record<string, string> = {
    metal: '金',
    wood: '木',
    water: '水',
    fire: '火',
    earth: '土',
  };

  const dominantElement = elementNames[dominantElements[0] || 'metal'];

  // 生成解读
  const interpretation = getBaziInterpretation(dominantElement, maxCount);

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    elements,
    interpretation,
  };
}
