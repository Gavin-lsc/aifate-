import { randomChoice, randomInt } from './utils';

/**
 * 八字解读模板
 */
export const BAZI_TEMPLATES = [
  '你的八字中{element}能量较强，{trait}突出。今日{season}，{element}当令，建议保持{attitude}的心态。',
  '八字显示{element}元素充盈，这预示着{prediction}。在{timeframe}内，{suggestion}。',
  '四柱之中{element}最为旺盛，{trait}是你最大的优势。今日宜{activity}，忌{avoid}。',
  '你的命局{element}偏弱，但{element}有助。建议多接触{related}相关的事物。',
  '八字格局平和，{element}相生相克形成平衡。今日适合{suggestion}，{prediction}。',
  '{element}元素在你命局中占据主导地位，这将影响你{aspect}的发展。保持{attitude}的心态有助于{benefit}。',
  '从八字分析，你{element}旺盛，{trait}特质明显。今日{activity}会带来{result}。',
  '你的命格显示出{element}的特性，这意味着{prediction}。在{timeframe}期间，{suggestion}。',
];

/**
 * 五行特质
 */
export const ELEMENT_TRAITS: Record<string, { trait: string; attitude: string; activity: string; avoid: string; }> = {
  金: { trait: '坚毅果断', attitude: '沉稳', activity: '处理重要事务', avoid: '冲动决策' },
  木: { trait: '生机勃勃', attitude: '积极', activity: '拓展新事物', avoid: '过度消耗' },
  水: { trait: '智慧灵动', attitude: '平和', activity: '学习思考', avoid: '急于求成' },
  火: { trait: '热情开朗', attitude: '自信', activity: '社交互动', avoid: '情绪波动' },
  土: { trait: '稳重踏实', attitude: '耐心', activity: '稳步推进', avoid: '冒险投机' },
};

/**
 * 季节
 */
export const SEASONS = ['春季', '夏季', '秋季', '冬季'];

/**
 * 八字解读补充
 */
const BAZI_PREDICTIONS = [
  '事业运程上扬，适合推进计划',
  '财运平稳，谨慎理财为佳',
  '人际关系和谐，适合社交',
  '健康状态良好，保持规律作息',
  '学习运旺盛，适合提升自我',
  '心情愉悦，适合享受生活',
];

const BAZI_SUGGESTIONS = [
  '把握机会，勇往直前',
  '保持耐心，等待时机',
  '调整心态，积极应对',
  '专注目标，稳步前进',
  '放松心情，享受当下',
];

const BAZI_TIMEFRAMES = ['近期', '本周', '本月', '本季度'];

const BAZI_ASPECTS = ['事业发展', '人际关系', '财务状况', '健康状态'];

const BAZI_BENEFITS = ['达成目标', '改善运势', '提升幸福感', '化解困难'];

const BAZI_RESULTS = ['意想不到的收获', '良好的进展', '满意的结果', '有益的成长'];

const BAZI_RELATED = {
  金: '金属、白色系',
  木: '植物、绿色系',
  水: '水域、蓝色系',
  火: '阳光、红色系',
  土: '土地、黄色系',
};

/**
 * 星座运势模板
 */
export const ZODIAC_TEMPLATES = [
  '{zodiac}座的朋友，今日星辰{trend}，在{area}方面有不错的表现。建议{suggestion}。',
  '{zodiac}座的你，今日星象显示{trend}。{area}运程上升，{prediction}。',
  '对于{zodiac}座来说，今日{area}领域值得关注。{suggestion}，{prediction}。',
  '{zodiac}座今日整体运势{trend}，{area}方面可能会有惊喜。{prediction}，{suggestion}。',
];

/**
 * 星座运势描述
 */
export const ZODIAC_TRENDS = ['闪耀', '平稳', '略有波动', '充满活力', '宁静祥和'];
export const ZODIAC_AREAS = ['爱情', '事业', '财运', '健康', '人际'];
export const ZODIAC_PREDICTIONS = ['保持积极心态，好运自会降临', '抓住机遇，大胆行动', '稳扎稳打，方能长远', '注意细节，避免疏漏', '放松心情，享受当下'];
export const ZODIAC_SUGGESTIONS = ['多与朋友交流', '专注核心目标', '保持开放心态', '适当休息调整', '勇敢表达自己'];

/**
 * 塔罗解读模板
 */
export const TAROT_TEMPLATES: Record<'upright' | 'reversed', string[]> = {
  upright: [
    '抽到{card}正位，象征着{meaning}。这预示着{interpretation}。',
    '正位的{card}出现在这里，意味着{meaning}。建议{suggestion}。',
    '{card}正位代表{meaning}，预示着{interpretation}。这是{advice}的好时机。',
  ],
  reversed: [
    '抽到{card}逆位，暗示{meaning}的阻滞。需要{suggestion}。',
    '逆位的{card}提醒你注意{meaning}。建议{suggestion}，{interpretation}。',
    '{card}逆位出现，代表{meaning}需要调整。{suggestion}，{interpretation}。',
  ],
};

/**
 * 塔罗解读补充
 */
export const TAROT_SUGGESTIONS = ['保持耐心', '反思自己', '调整方向', '寻求支持', '放下执念', '抓住机遇', '积极行动', '保持冷静'];
export const TAROT_INTERPRETATIONS = ['好运将至', '需谨慎行事', '转折即将到来', '保持现状', '积极行动', '等待时机'];
export const TAROT_ADVICE = ['改变', '成长', '收获'];

/**
 * 今日建议模板
 */
export const ADVICE_TEMPLATES = [
  '今日{suggestion}，{reason}。',
  '建议{suggestion}，{reason}。',
  '今日适合{suggestion}，{reason}。',
];

/**
 * 今日建议
 */
export const DAILY_ADVICES = [
  '保持积极的心态，迎接新的挑战',
  '多与朋友交流，分享你的想法',
  '专注当前任务，避免分心',
  '适当休息，保持精力充沛',
  '学习新知识，拓展视野',
  '注意健康，规律作息',
  '勇敢表达自己的观点',
  '倾听他人，增进理解',
  '保持耐心，不要急于求成',
  '享受当下，感恩生活',
  '制定计划，有条不紊',
  '相信直觉，勇敢决策',
  '珍惜身边的人和事',
  '保持好奇心，探索未知',
  '锻炼身体，增强体质',
];

/**
 * 桃花期模板
 */
export const LOVE_LUCK_TEMPLATES = [
  '今日桃花运{level}，{description}。',
  '在{place}可能会有桃花运，{description}。',
  '{level}的桃花运伴随今日，{description}。',
];

/**
 * 桃花期
 */
export const LOVE_LUCK_LEVELS = ['旺盛', '良好', '平稳', '略有波动', '沉寂'];
export const LOVE_LUCK_DESCRIPTIONS = [
  '适合与心仪的人深入交流',
  '可能遇到有趣的陌生人',
  '适合参加社交活动',
  '保持开放心态，机会自来',
  '享受独处时光',
  '旧友重逢带来惊喜',
  '职场桃花悄然绽放',
];
export const LOVE_LUCK_PLACES = ['工作场所', '社交聚会', '网络平台', '休闲场所', '偶然相遇', '学习交流'];

/**
 * 生成八字解读
 */
export function getBaziInterpretation(element: string, count: number): string {
  const template = randomChoice(BAZI_TEMPLATES);
  const trait = ELEMENT_TRAITS[element];
  const season = randomChoice(SEASONS);
  const prediction = randomChoice(BAZI_PREDICTIONS);
  const suggestion = randomChoice(BAZI_SUGGESTIONS);
  const timeframe = randomChoice(BAZI_TIMEFRAMES);
  const aspect = randomChoice(BAZI_ASPECTS);
  const benefit = randomChoice(BAZI_BENEFITS);
  const result = randomChoice(BAZI_RESULTS);
  const related = BAZI_RELATED[element as keyof typeof BAZI_RELATED];

  return template
    .replace('{element}', element)
    .replace('{trait}', trait?.trait || '独特')
    .replace('{season}', season)
    .replace('{attitude}', trait?.attitude || '平和')
    .replace('{activity}', trait?.activity || '保持平静')
    .replace('{avoid}', trait?.avoid || '过度消耗')
    .replace('{prediction}', prediction)
    .replace('{suggestion}', suggestion)
    .replace('{timeframe}', timeframe)
    .replace('{aspect}', aspect)
    .replace('{benefit}', benefit)
    .replace('{result}', result)
    .replace('{related}', related);
}

/**
 * 生成星座运势
 */
export function getZodiacFortune(zodiac: string): string {
  const template = randomChoice(ZODIAC_TEMPLATES);
  const trend = randomChoice(ZODIAC_TRENDS);
  const area = randomChoice(ZODIAC_AREAS);
  const prediction = randomChoice(ZODIAC_PREDICTIONS);
  const suggestion = randomChoice(ZODIAC_SUGGESTIONS);

  return template
    .replace('{zodiac}', zodiac)
    .replace('{trend}', trend)
    .replace('{area}', area)
    .replace('{prediction}', prediction)
    .replace('{suggestion}', suggestion);
}

/**
 * 生成塔罗解读
 */
export function getTarotMeaning(card: string, orientation: 'upright' | 'reversed'): string {
  const templates = TAROT_TEMPLATES[orientation];
  const template = randomChoice(templates);
  const suggestion = randomChoice(TAROT_SUGGESTIONS);
  const interpretation = randomChoice(TAROT_INTERPRETATIONS);
  const advice = randomChoice(TAROT_ADVICE);

  return template
    .replace('{card}', card)
    .replace('{suggestion}', suggestion)
    .replace('{interpretation}', interpretation)
    .replace('{advice}', advice);
}

/**
 * 生成今日建议
 */
export function getDailyAdvice(): string {
  const template = randomChoice(ADVICE_TEMPLATES);
  const suggestion = randomChoice(DAILY_ADVICES);
  const reason = randomChoice(ZODIAC_PREDICTIONS);

  return template
    .replace('{suggestion}', suggestion)
    .replace('{reason}', reason);
}

/**
 * 生成桃花运
 */
export function getLoveLuck(): string {
  const template = randomChoice(LOVE_LUCK_TEMPLATES);
  const level = randomChoice(LOVE_LUCK_LEVELS);
  const description = randomChoice(LOVE_LUCK_DESCRIPTIONS);
  const place = randomChoice(LOVE_LUCK_PLACES);

  return template
    .replace('{level}', level)
    .replace('{description}', description)
    .replace('{place}', place);
}

/**
 * 生成幸运数字
 */
export function getLuckyNumber(): number {
  return randomInt(1, 9);
}

/**
 * 生成幸运颜色
 */
export function getLuckyColor(): string {
  return randomChoice(['红色', '橙色', '黄色', '绿色', '青色', '蓝色', '紫色', '粉色', '白色', '黑色', '金色', '银色']);
}
