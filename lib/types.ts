/**
 * 八字计算结果接口
 */
export interface BaziResult {
  yearPillar: string;    // 年柱
  monthPillar: string;   // 月柱
  dayPillar: string;     // 日柱
  hourPillar: string;    // 时柱
  elements: {
    metal: number;       // 金
    wood: number;        // 木
    water: number;       // 水
    fire: number;        // 火
    earth: number;       // 土
  };
  interpretation: string; // 解读
}

/**
 * 星座计算结果接口
 */
export interface ZodiacResult {
  name: string;          // 星座名称
  symbol: string;        // 星座符号
  date: string;          // 日期
  fortune: {
    love: number;        // 爱情运势 1-5 星
    career: number;      // 事业运势 1-5 星
    wealth: number;      // 财运 1-5 星
  };
  description: string;   // 运势描述
}

/**
 * 塔罗卡牌接口
 */
export interface TarotCard {
  id: number;                           // 卡牌 ID
  name: string;                         // 卡牌名称
  symbol: string;                       // 卡牌符号
  orientation: 'upright' | 'reversed'; // 正位/逆位
  meaning: string;                      // 含义
}

/**
 * 运势计算结果接口
 */
export interface FortuneResult {
  score: number;    // 综合评分 0-100
  summary: string;  // 总结
}

/**
 * 建议计算结果接口
 */
export interface AdviceResult {
  dailyAdvice: string;  // 今日建议
  loveLuck: string;     // 桃花期
  luckyNumber: number;  // 幸运数字 1-9
  luckyColor: string;   // 幸运颜色
}

/**
 * 验证结果接口
 */
export interface ValidateResult {
  valid: boolean;  // 是否有效
  error?: string;  // 错误信息
}

/**
 * 星座信息接口
 */
export interface ZodiacInfo {
  name: string;       // 星座名称
  symbol: string;     // 星座符号
  startMonth: number; // 开始月份 1-12
  startDay: number;   // 开始日期
  endMonth: number;   // 结束月份 1-12
  endDay: number;     // 结束日期
}

/**
 * 塔罗卡牌基础信息接口
 */
export interface TarotCardInfo {
  id: number;         // 卡牌 ID
  name: string;       // 卡牌名称
  symbol: string;     // 卡牌符号
  meaning: string;    // 含义
}

/**
 * 五行特质接口
 */
export interface ElementTrait {
  trait: string;     // 特质
  attitude: string;  // 心态
  activity: string;  // 适合活动
  avoid: string;     // 避免事项
}
