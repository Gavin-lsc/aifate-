import { TarotCardInfo, ZodiacInfo } from './types';

/**
 * 天干
 */
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

/**
 * 地支
 */
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/**
 * 五行
 */
export const ELEMENTS = ['金', '木', '水', '火', '土'];

/**
 * 天干五行对应
 */
export const STEM_ELEMENTS: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
};

/**
 * 地支五行对应
 */
export const BRANCH_ELEMENTS: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
};

/**
 * 12 星座信息
 */
export const ZODIACS: ZodiacInfo[] = [
  { name: '白羊座', symbol: '♈', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: '金牛座', symbol: '♉', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: '双子座', symbol: '♊', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  { name: '巨蟹座', symbol: '♋', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  { name: '狮子座', symbol: '♌', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: '处女座', symbol: '♍', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: '天秤座', symbol: '♎', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
  { name: '天蝎座', symbol: '♏', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
  { name: '射手座', symbol: '♐', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
  { name: '摩羯座', symbol: '♑', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: '水瓶座', symbol: '♒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: '双鱼座', symbol: '♓', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
];

/**
 * 塔罗牌（22 张大阿卡纳）
 */
export const TAROT_CARDS: TarotCardInfo[] = [
  { id: 0, name: '愚者', symbol: '🃏', meaning: '新的开始、冒险、纯真' },
  { id: 1, name: '魔术师', symbol: '🎭', meaning: '创造力、技能、意志力' },
  { id: 2, name: '女祭司', symbol: '🌙', meaning: '直觉、潜意识、神秘' },
  { id: 3, name: '女皇', symbol: '👑', meaning: '生育、自然、丰盛' },
  { id: 4, name: '皇帝', symbol: '🏰', meaning: '权威、结构、控制' },
  { id: 5, name: '教皇', symbol: '⛪', meaning: '传统、信仰、指导' },
  { id: 6, name: '恋人', symbol: '💕', meaning: '爱情、和谐、选择' },
  { id: 7, name: '战车', symbol: '⚔️', meaning: '胜利、意志、决心' },
  { id: 8, name: '力量', symbol: '🦁', meaning: '勇气、耐心、控制' },
  { id: 9, name: '隐士', symbol: '🏔️', meaning: '反思、孤独、指引' },
  { id: 10, name: '命运之轮', symbol: '🎡', meaning: '命运、转折、循环' },
  { id: 11, name: '正义', symbol: '⚖️', meaning: '公平、真理、因果' },
  { id: 12, name: '倒吊人', symbol: '🙃', meaning: '牺牲、等待、新视角' },
  { id: 13, name: '死神', symbol: '💀', meaning: '结束、转变、重生' },
  { id: 14, name: '节制', symbol: '🌈', meaning: '平衡、耐心、适度' },
  { id: 15, name: '恶魔', symbol: '😈', meaning: '束缚、物质主义、欲望' },
  { id: 16, name: '高塔', symbol: '🗼', meaning: '突变、启示、解放' },
  { id: 17, name: '星星', symbol: '⭐', meaning: '希望、灵感、平静' },
  { id: 18, name: '月亮', symbol: '🌕', meaning: '幻觉、潜意识、恐惧' },
  { id: 19, name: '太阳', symbol: '☀️', meaning: '成功、喜悦、积极' },
  { id: 20, name: '审判', symbol: '📯', meaning: '觉醒、复活、召唤' },
  { id: 21, name: '世界', symbol: '🌍', meaning: '完成、圆满、整合' },
];

/**
 * 幸运颜色
 */
export const LUCKY_COLORS = [
  '红色', '橙色', '黄色', '绿色', '青色',
  '蓝色', '紫色', '粉色', '白色', '黑色', '金色', '银色'
];
