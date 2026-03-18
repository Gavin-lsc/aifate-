# AIFATE 运势测算 Web 应用 - 开发方案（优化版）

## 一、项目概览

### 1.1 项目信息
| 项目 | 内容 |
|-----|------|
| 项目名称 | AIFATE 运势测算 Web App |
| 版本 | V0.2.1 |
| 性质 | 娱乐应用 |
| 技术栈 | Next.js 14+ + TypeScript + Tailwind CSS + Framer Motion |

### 1.2 开发原则（不可变更）
| 原则 | 说明 |
|-----|------|
| 板块隔离开发 | 每个功能板块独立开发、独立测试 |
| 测试驱动 | 每个板块完成后必须测试验证通过 |
| 不存储数据 | 严禁使用数据库、localStorage 存储用户信息 |
| 纯前端 | 所有逻辑在前端完成 |
| Mobile First | 响应式设计优先考虑移动端 |

### 1.3 技术栈约束（不可变更）
- ✅ Next.js 14+ (App Router)
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ React
- ✅ Framer Motion（动画库）
- ❌ 数据库
- ❌ 用户登录
- ❌ 第三方付费 API
- ❌ 后端服务

---

## 二、顶层架构指导

### 2.1 架构分层

```
┌─────────────────────────────────────────────┐
│              用户界面层 (UI)                │
│  - 首页 /app/page.tsx                       │
│  - 结果页 /app/result/page.tsx              │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│              组件层 (Components)            │
│  - BaziCard, ZodiacCard, TarotCard         │
│  - SummaryCard, AdviceCard, Footer          │
│  - CardLayout (共用卡片布局)               │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│              业务逻辑层 (Lib)               │
│  - bazi.ts (八字计算)                       │
│  - zodiac.ts (星座计算)                     │
│  - tarot.ts (塔罗抽牌)                      │
│  - fortune.ts (运势生成)                    │
│  - textTemplates.ts (文案模板)              │
│  - utils.ts (工具函数)                      │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│              数据层 (Types + Mock)         │
│  - types.ts (类型定义)                    │
│  - mockData.ts (Mock 数据)                 │
└─────────────────────────────────────────────┘
```

### 2.2 目录结构（不可变更）
```
aifate/
├── app/
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页
│   └── result/
│       └── page.tsx        # 结果页
├── components/
│   ├── CardLayout.tsx      # 共用卡片布局
│   ├── BaziCard.tsx
│   ├── ZodiacCard.tsx
│   ├── TarotCard.tsx
│   ├── SummaryCard.tsx
│   ├── AdviceCard.tsx
│   └── Footer.tsx
├── lib/
│   ├── types.ts            # 类型定义
│   ├── mockData.ts         # Mock 数据
│   ├── utils.ts            # 工具函数
│   ├── bazi.ts            # 八字算法
│   ├── zodiac.ts          # 星座算法
│   ├── tarot.ts           # 塔罗算法
│   ├── fortune.ts         # 运势算法
│   └── textTemplates.ts   # 文案模板
├── public/
├── .storybook/            # Storybook 配置（可选）
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 2.3 数据流向
```
用户输入 → 表单验证 → URL 参数 → 结果页解析 → 调用算法 → 返回数据 → 组件渲染
```

### 2.4 边界条件定义

| 参数 | 格式 | 范围 | 说明 |
|-----|------|------|------|
| 出生日期 | YYYY-MM-DD | 1900-01-01 至 当前日期 | 用户出生日期 |
| 出生时间 | HH:mm | 00:00 至 23:59 | 用户出生时间 |
| 年份范围 | 数字 | 1900-2100 | 八字计算支持范围 |

---

## 三、开发板块划分（按功能分，顺序执行）

### 板块 0：项目初始化
**目标**：搭建基础框架

**任务清单**：
- [ ] 创建 Next.js 项目（App Router）
- [ ] 安装依赖：TypeScript、Tailwind CSS、Framer Motion
- [ ] 配置 TypeScript
- [ ] 配置 Tailwind CSS（深色主题）
- [ ] 配置 Framer Motion
- [ ] 创建目录结构
- [ ] 验证项目可启动

**输出文件**：
- `package.json`
- `tailwind.config.ts`
- `tsconfig.json`
- `app/layout.tsx`（基础布局）

**测试验证**：
```bash
npm install && npm run dev
# 访问 http://localhost:3000 确认页面正常显示
```

---

### 板块 1：类型定义 + 工具函数
**目标**：定义所有数据接口和工具函数

**任务清单**：
- [ ] 创建 `lib/types.ts`
- [ ] 定义 BaziResult 接口
- [ ] 定义 ZodiacResult 接口
- [ ] 定义 TarotCard 接口
- [ ] 定义 FortuneResult 接口
- [ ] 定义 AdviceResult 接口
- [ ] 创建 `lib/utils.ts`
- [ ] 实现日期时间验证函数
- [ ] 实现随机数生成函数
- [ ] 实现数组随机选择函数

**类型定义代码示例**：
```typescript
// lib/types.ts
export interface BaziResult {
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  elements: {
    metal: number;
    wood: number;
    water: number;
    fire: number;
    earth: number;
  };
  interpretation: string;
}

export interface ZodiacResult {
  name: string;
  symbol: string;
  date: string;
  fortune: {
    love: number;      // 1-5 星
    career: number;    // 1-5 星
    wealth: number;    // 1-5 星
  };
  description: string;
}

export interface TarotCard {
  id: number;
  name: string;
  symbol: string;
  orientation: 'upright' | 'reversed';
  meaning: string;
}

export interface FortuneResult {
  score: number;        // 0-100
  summary: string;
}

export interface AdviceResult {
  dailyAdvice: string;
  loveLuck: string;
  luckyNumber: number;  // 1-9
  luckyColor: string;
}

export interface ValidateResult {
  valid: boolean;
  error?: string;
}
```

**工具函数代码示例**：
```typescript
// lib/utils.ts
import { ValidateResult } from './types';

/**
 * 验证日期时间格式
 */
export function validateDateTime(date: string, time: string): ValidateResult {
  // 验证日期格式 YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return { valid: false, error: '日期格式错误' };
  }

  // 验证时间格式 HH:mm
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(time)) {
    return { valid: false, error: '时间格式错误' };
  }

  // 验证日期范围（1900-2100）
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  if (year < 1900 || year > 2100) {
    return { valid: false, error: '年份范围超出支持范围' };
  }

  // 验证日期是否有效
  if (isNaN(dateObj.getTime())) {
    return { valid: false, error: '日期无效' };
  }

  // 验证日期不能超过当前日期
  if (dateObj > new Date()) {
    return { valid: false, error: '出生日期不能超过当前日期' };
  }

  return { valid: true };
}

/**
 * 生成随机数（闭区间）
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 从数组中随机选择元素
 */
export function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 从数组中随机选择多个元素（不重复）
 */
export function randomChoices<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, arr.length));
}

/**
 * 随机正逆位
 */
export function randomOrientation(): 'upright' | 'reversed' {
  return Math.random() > 0.5 ? 'upright' : 'reversed';
}
```

**输出文件**：
- `lib/types.ts`
- `lib/utils.ts`

**测试验证**：
```typescript
// 测试工具函数
console.log(validateDateTime('2000-01-01', '08:00'));  // { valid: true }
console.log(validateDateTime('2025-01-01', '08:00'));  // { valid: false, error: '出生日期不能超过当前日期' }
console.log(randomInt(1, 5));                         // 1-5 之间的随机数
console.log(randomChoice(['A', 'B', 'C']));           // 随机选择一个元素
console.log(randomChoices([1, 2, 3, 4, 5], 3));     // 随机选择 3 个不重复元素
```

---

### 板块 2：Mock 数据 + 文案模板
**目标**：建立 Mock 数据和文案生成体系

**任务清单**：
- [ ] 创建 `lib/mockData.ts`
- [ ] 定义 Mock 八字数据
- [ ] 定义 Mock 星座数据
- [ ] 定义 Mock 塔罗数据（22 张大阿卡纳）
- [ ] 创建 `lib/textTemplates.ts`
- [ ] 定义八字解读模板（15+ 条）
- [ ] 定义星座运势模板（15+ 条）
- [ ] 定义塔罗解读模板（22 张牌 × 正逆位）
- [ ] 定义建议文案模板（30+ 条）
- [ ] 实现模板随机选择函数

**Mock 数据代码示例**：
```typescript
// lib/mockData.ts
import { TarotCard } from './types';

// 天干地支
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行对应
export const ELEMENTS = ['金', '木', '水', '火', '土'];

// 12 星座
export const ZODIACS = [
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

// 塔罗牌（22 张大阿卡纳）
export const TAROT_CARDS: Omit<TarotCard, 'orientation'>[] = [
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

// 幸运颜色
export const LUCKY_COLORS = [
  '红色', '橙色', '黄色', '绿色', '青色',
  '蓝色', '紫色', '粉色', '白色', '黑色', '金色', '银色'
];
```

**文案模板代码示例**：
```typescript
// lib/textTemplates.ts

// 八字解读模板
export const BAZI_TEMPLATES = [
  '你的八字中{element}能量较强，{trait}突出。今日{season}，{element}当令，建议保持{attitude}的心态。',
  '八字显示{element}元素充盈，这预示着{prediction}。在{timeframe}内，{suggestion}。',
  '四柱之中{element}最为旺盛，{trait}是你最大的优势。今日宜{activity}，忌{avoid}。',
  '你的命局{element}偏弱，但{element}有助。建议多接触{related}相关的事物。',
  '八字格局平和，{element}相生相克形成平衡。今日适合{suggestion}，{prediction}。',
];

// 五行特质
export const ELEMENT_TRAITS = {
  金: { trait: '坚毅果断', attitude: '沉稳', activity: '处理重要事务', avoid: '冲动决策' },
  木: { trait: '生机勃勃', attitude: '积极', activity: '拓展新事物', avoid: '过度消耗' },
  水: { trait: '智慧灵动', attitude: '平和', activity: '学习思考', avoid: '急于求成' },
  火: { trait: '热情开朗', attitude: '自信', activity: '社交互动', avoid: '情绪波动' },
  土: { trait: '稳重踏实', attitude: '耐心', activity: '稳步推进', avoid: '冒险投机' },
};

// 季节
export const SEASONS = ['春季', '夏季', '秋季', '冬季'];

// 星座运势模板
export const ZODIAC_TEMPLATES = [
  '{zodiac}座的朋友，今日星辰{trend}，在{area}方面有不错的表现。建议{suggestion}。',
  '{zodiac}座的你，今日星象显示{trend}。{area}运程上升，{prediction}。',
  '对于{zodiac}座来说，今日{area}领域值得关注。{suggestion}，{prediction}。',
];

// 星座运势描述
export const ZODIAC_TRENDS = ['闪耀', '平稳', '略有波动', '充满活力', '宁静祥和'];
export const ZODIAC_AREAS = ['爱情', '事业', '财运', '健康', '人际'];
export const ZODIAC_PREDICTIONS = ['保持积极心态，好运自会降临', '抓住机遇，大胆行动', '稳扎稳打，方能长远', '注意细节，避免疏漏', '放松心情，享受当下'];
export const ZODIAC_SUGGESTIONS = ['多与朋友交流', '专注核心目标', '保持开放心态', '适当休息调整', '勇敢表达自己'];

// 塔罗解读模板
export const TAROT_TEMPLATES = {
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

// 塔罗解读补充
export const TAROT_SUGGESTIONS = ['保持耐心', '反思自己', '调整方向', '寻求支持', '放下执念', '抓住机遇'];
export const TAROT_INTERPRETATIONS = ['好运将至', '需谨慎行事', '转折即将到来', '保持现状', '积极行动'];

// 今日建议模板
export const ADVICE_TEMPLATES = [
  '今日{suggestion}，{reason}。',
  '建议{suggestion}，{reason}。',
  '今日适合{suggestion}，{reason}。',
];

// 今日建议
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
];

// 桃花期模板
export const LOVE_LUCK_TEMPLATES = [
  '今日桃花运{level}，{description}。',
  '在{place}可能会有桃花运，{description}。',
];

// 桃花期
export const LOVE_LUCK_LEVELS = ['旺盛', '良好', '平稳', '略有波动', '沉寂'];
export const LOVE_LUCK_DESCRIPTIONS = [
  '适合与心仪的人深入交流',
  '可能遇到有趣的陌生人',
  '适合参加社交活动',
  '保持开放心态，机会自来',
  '享受独处时光',
];
export const LOVE_LUCK_PLACES = ['工作场所', '社交聚会', '网络平台', '休闲场所', '偶然相遇'];

// 模板生成函数
export function getBaziInterpretation(element: string, count: number): string {
  const template = randomChoice(BAZI_TEMPLATES);
  const trait = ELEMENT_TRAITS[element as keyof typeof ELEMENT_TRAITS];
  const season = randomChoice(SEASONS);

  return template
    .replace('{element}', element)
    .replace('{trait}', trait?.trait || '独特')
    .replace('{season}', season)
    .replace('{attitude}', trait?.attitude || '平和')
    .replace('{activity}', trait?.activity || '保持平静')
    .replace('{avoid}', trait?.avoid || '过度消耗');
}

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

export function getTarotMeaning(card: string, orientation: 'upright' | 'reversed'): string {
  const templates = TAROT_TEMPLATES[orientation];
  const template = randomChoice(templates);
  const suggestion = randomChoice(TAROT_SUGGESTIONS);
  const interpretation = randomChoice(TAROT_INTERPRETATIONS);

  return template
    .replace('{card}', card)
    .replace('{suggestion}', suggestion)
    .replace('{interpretation}', interpretation);
}

export function getDailyAdvice(): string {
  const template = randomChoice(ADVICE_TEMPLATES);
  const suggestion = randomChoice(DAILY_ADVICES);
  const reason = randomChoice(ZODIAC_PREDICTIONS);

  return template
    .replace('{suggestion}', suggestion)
    .replace('{reason}', reason);
}

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

export function getLuckyNumber(): number {
  return randomInt(1, 9);
}

export function getLuckyColor(): string {
  return randomChoice(LUCKY_COLORS);
}
```

**输出文件**：
- `lib/mockData.ts`
- `lib/textTemplates.ts`

**测试验证**：
```typescript
// 测试 Mock 数据
console.log(ZODIACS.length);        // 12
console.log(TAROT_CARDS.length);    // 22
console.log(HEAVENLY_STEMS.length);  // 10

// 测试文案生成
console.log(getBaziInterpretation('木', 4));     // 八字解读
console.log(getZodiacFortune('狮子座'));          // 星座运势
console.log(getTarotMeaning('愚者', 'upright')); // 塔罗解读
console.log(getDailyAdvice());                    // 今日建议
console.log(getLoveLuck());                      // 桃花期
console.log(getLuckyNumber());                   // 1-9
console.log(getLuckyColor());                    // 颜色
```

---

### 板块 3：八字算法
**目标**：实现八字计算逻辑

**算法伪代码**：
```typescript
// 八字计算算法（简化版）

function calculateBazi(date: Date, time: string): BaziResult {
  // 1. 提取年、月、日、时
  const year = date.getFullYear();
  const month = date.getMonth() + 1;  // 1-12
  const day = date.getDate();
  const [hour, minute] = time.split(':').map(Number);

  // 2. 计算年柱
  // 年干 = (year - 3) % 10，结果对应天干索引
  // 年支 = (year - 3) % 12，结果对应地支索引
  const yearStemIndex = (year - 3) % 10 - 1;  // 调整为 0-9
  const yearBranchIndex = (year - 3) % 12 - 1; // 调整为 0-11

  // 3. 计算月柱
  // 月干基于年干和月份（复杂算法，使用简化版）
  // 月支 = (month - 1) % 12，对应地支索引（寅月开始）
  const monthBranchIndex = (month + 1) % 12; // 寅月是农历正月

  // 4. 计算日柱
  // 使用基准日期和差值计算（简化版）
  // 实际需要使用天文学算法，这里使用简化版
  const baseDate = new Date('1900-01-01');
  const daysDiff = Math.floor((date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  // 5. 计算时柱
  // 时干基于日干和时辰
  // 时支 = floor(hour / 2) % 12
  const hourBranchIndex = Math.floor(hour / 2) % 12;

  // 6. 统计五行
  // 遍历四柱的天干地支，统计金木水火土的数量

  // 7. 生成解读
  // 基于五行分布和模板生成解读

  return {
    yearPillar: `${yearStem}${yearBranch}`,
    monthPillar: `${monthStem}${monthBranch}`,
    dayPillar: `${dayStem}${dayBranch}`,
    hourPillar: `${hourStem}${hourBranch}`,
    elements: { metal, wood, water, fire, earth },
    interpretation: '...',
  };
}
```

**任务清单**：
- [ ] 创建 `lib/bazi.ts`
- [ ] 实现年柱计算
- [ ] 实现月柱计算
- [ ] 实现日柱计算
- [ ] 实现时柱计算
- [ ] 实现五行统计（天干地支对应五行）
- [ ] 实现八字解读生成（使用模板）
- [ ] 导出 `calculateBazi()` 函数

**天干五行对照**：
```typescript
const STEM_ELEMENTS = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
};
```

**地支五行对照**：
```typescript
const BRANCH_ELEMENTS = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
};
```

**输出文件**：
- `lib/bazi.ts`

**测试验证**：
```typescript
// 测试八字计算
const result1 = calculateBazi(new Date('1990-01-01'), '08:00');
console.log(result1);
// 验证：四柱都有值，五行统计正确，解读不为空

const result2 = calculateBazi(new Date('2000-08-10'), '14:30');
console.log(result2);
// 验证：四柱都有值，五行统计正确，解读不为空
```

---

### 板块 4：星座算法
**目标**：实现星座计算逻辑

**算法伪代码**：
```typescript
// 星座计算算法

function getZodiac(date: Date): string {
  const month = date.getMonth() + 1;  // 1-12
  const day = date.getDate();

  // 遍历 12 星座，找到匹配的
  for (const zodiac of ZODIACS) {
    if ((month === zodiac.startMonth && day >= zodiac.startDay) ||
        (month === zodiac.endMonth && day <= zodiac.endDay)) {
      return zodiac.name;
    }
  }

  // 特殊情况：摩羯座跨年
  if (month === 12 && day >= 22) return '摩羯座';
  if (month === 1 && day <= 19) return '摩羯座';

  return '未知';
}

function generateZodiacFortune(zodiacName: string): ZodiacResult {
  // 1. 获取星座信息
  const zodiac = ZODIACS.find(z => z.name === zodiacName);

  // 2. 生成三维运势（1-5 星）
  const love = randomInt(1, 5);
  const career = randomInt(1, 5);
  const wealth = randomInt(1, 5);

  // 3. 生成运势描述
  const description = getZodiacFortune(zodiacName);

  return {
    name: zodiacName,
    symbol: zodiac?.symbol || '✨',
    date: '今日',
    fortune: { love, career, wealth },
    description,
  };
}
```

**任务清单**：
- [ ] 创建 `lib/zodiac.ts`
- [ ] 实现 `getZodiac()` 函数
- [ ] 实现 `generateZodiacFortune()` 函数
- [ ] 导出函数

**输出文件**：
- `lib/zodiac.ts`

**测试验证**：
```typescript
// 测试星座计算
console.log(getZodiac(new Date('2000-01-15')));  // "摩羯座"
console.log(getZodiac(new Date('2000-02-18')));  // "水瓶座"
console.log(getZodiac(new Date('2000-03-21')));  // "白羊座"
console.log(getZodiac(new Date('2000-08-10')));  // "狮子座"
console.log(getZodiac(new Date('2000-12-25')));  // "摩羯座"

// 测试运势生成
const fortune = generateZodiacFortune('狮子座');
console.log(fortune);
// 验证：爱情、事业、财运都是 1-5 星，描述不为空
```

---

### 板块 5：塔罗算法
**目标**：实现塔罗抽牌逻辑

**算法伪代码**：
```typescript
// 塔罗抽牌算法

function drawTarot(count: number = 3): TarotCard[] {
  // 1. 验证数量
  if (count < 1) count = 1;
  if (count > 3) count = 3;

  // 2. 随机抽取不重复的牌
  const shuffled = shuffleArray([...TAROT_CARDS]);
  const selected = shuffled.slice(0, count);

  // 3. 为每张牌随机正逆位
  return selected.map(card => ({
    ...card,
    orientation: randomOrientation(),
  }));
}

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
```

**任务清单**：
- [ ] 创建 `lib/tarot.ts`
- [ ] 实现 `drawTarot()` 函数
- [ ] 导出函数

**输出文件**：
- `lib/tarot.ts`

**测试验证**：
```typescript
// 测试抽牌
const cards1 = drawTarot(1);
console.log(cards1);
// 验证：1 张牌，有 orientation

const cards2 = drawTarot(3);
console.log(cards2);
// 验证：3 张牌，不重复，都有 orientation

const cards3 = drawTarot(5);
console.log(cards3);
// 验证：最多 3 张牌
```

---

### 板块 6：运势算法
**目标**：实现综合运势生成

**算法伪代码**：
```typescript
// 综合运势生成算法

function generateFortune(inputs: {
  bazi: BaziResult;
  zodiac: ZodiacResult;
  tarot: TarotCard[];
}): FortuneResult {
  // 1. 计算基础分（0-60）
  const baseScore = randomInt(40, 60);

  // 2. 加星座运势分（0-20）
  const zodiacScore = (inputs.zodiac.fortune.love +
                      inputs.zodiac.fortune.career +
                      inputs.zodiac.fortune.wealth) / 3 * 4;

  // 3. 加塔罗运势分（0-20）
  let tarotScore = 0;
  for (const card of inputs.tarot) {
    tarotScore += card.orientation === 'upright' ? 7 : 3;
  }

  // 4. 计算总分
  const totalScore = Math.min(100, Math.max(0, baseScore + zodiacScore + tarotScore));

  // 5. 生成总结描述
  let summary = '';
  if (totalScore >= 80) summary = '运势极佳，抓住机遇！';
  else if (totalScore >= 60) summary = '运势良好，稳步前进。';
  else if (totalScore >= 40) summary = '运势平稳，保持耐心。';
  else summary = '运势一般，调整心态。';

  return {
    score: Math.round(totalScore),
    summary,
  };
}
```

**任务清单**：
- [ ] 创建 `lib/fortune.ts`
- [ ] 实现 `generateFortune()` 函数
- [ ] 导出函数

**输出文件**：
- `lib/fortune.ts`

**测试验证**：
```typescript
// 测试运势生成
const result = generateFortune({
  bazi: {
    yearPillar: '甲子',
    monthPillar: '乙丑',
    dayPillar: '丙寅',
    hourPillar: '丁卯',
    elements: { metal: 2, wood: 3, water: 1, fire: 1, earth: 1 },
    interpretation: '测试'
  },
  zodiac: {
    name: '狮子座',
    symbol: '♌',
    date: '今日',
    fortune: { love: 4, career: 3, wealth: 5 },
    description: '测试'
  },
  tarot: [
    { id: 0, name: '愚者', symbol: '🃏', orientation: 'upright', meaning: '测试' },
    { id: 1, name: '魔术师', symbol: '🎭', orientation: 'reversed', meaning: '测试' },
    { id: 2, name: '女祭司', symbol: '🌙', orientation: 'upright', meaning: '测试' }
  ]
});

console.log(result);
// 验证：score 在 0-100 之间，summary 不为空
```

---

### 板块 7：共用卡片布局组件
**目标**：创建可复用的卡片布局

**任务清单**：
- [ ] 创建 `components/CardLayout.tsx`
- [ ] 实现卡片容器样式
- [ ] 实现卡片标题
- [ ] 实现卡片内容区域
- [ ] 使用 Framer Motion 实现渐入动画
- [ ] 导出组件

**组件代码示例**：
```typescript
// components/CardLayout.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardLayoutProps {
  title: string;
  icon?: string;
  children: ReactNode;
  index?: number;
}

export function CardLayout({ title, icon, children, index = 0 }: CardLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="text-gray-200">
        {children}
      </div>
    </motion.div>
  );
}
```

**输出文件**：
- `components/CardLayout.tsx`

---

### 板块 8-12：卡片组件开发
**目标**：实现 5 个功能卡片组件

**任务清单**：

| 板块 | 组件 | 主要功能 |
|-----|------|---------|
| 8 | BaziCard | 四柱展示、五行进度条、解读 |
| 9 | ZodiacCard | 星座名称、今日运势、三维星级 |
| 10 | TarotCard | 卡牌背面、翻牌动画、牌名解读 |
| 11 | SummaryCard | 评分展示、进度条、总结 |
| 12 | AdviceCard | 今日建议、桃花运、幸运数字/颜色 |
| 13 | Footer | 隐私声明、版权信息 |

**输出文件**：
- `components/BaziCard.tsx`
- `components/ZodiacCard.tsx`
- `components/TarotCard.tsx`
- `components/SummaryCard.tsx`
- `components/AdviceCard.tsx`
- `components/Footer.tsx`

---

### 板块 14：首页开发
**目标**：实现输入页面

**任务清单**：
- [ ] 创建 `app/page.tsx`
- [ ] 实现标题展示
- [ ] 实现日期选择器（使用原生或 shadcn/ui）
- [ ] 实现时间选择器
- [ ] 实现当前时间显示
- [ ] 实现"开始测算"按钮
- [ ] 实现表单验证（使用 validateDateTime）
- [ ] 实现跳转逻辑（URL 参数传递）
- [ ] 添加页面动画

**伪代码**：
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateDateTime } from '@/lib/utils';

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [error, setError] = useState('');

  // 更新当前时间
  useEffect(() => {
    const update = () => {
      setCurrentTime(new Date().toLocaleString('zh-CN'));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // 提交表单
  const handleSubmit = () => {
    // 验证
    const validation = validateDateTime(date, time);
    if (!validation.valid) {
      setError(validation.error || '输入无效');
      return;
    }

    // 跳转
    router.push(`/result?date=${date}&time=${time}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">运势测算</h1>

        {/* 日期选择 */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white mb-4"
        />

        {/* 时间选择 */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white mb-4"
        />

        {/* 当前时间 */}
        <div className="text-center text-gray-300 mb-6">
          当前时间: {currentTime}
        </div>

        {/* 错误提示 */}
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}

        {/* 提交按钮 */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:opacity-90 transition-opacity"
        >
          开始测算
        </button>
      </div>
    </div>
  );
}
```

**输出文件**：
- `app/page.tsx`

---

### 板块 15：结果页开发
**目标**：实现结果展示页面

**任务清单**：
- [ ] 创建 `app/result/page.tsx`
- [ ] 从 URL 参数获取日期和时间
- [ ] 验证参数（无效则返回首页）
- [ ] 调用所有算法函数
- [ ] 渲染所有卡片组件
- [ ] 添加页面渐入动画
- [ ] 添加 Footer 组件

**伪代码**：
```typescript
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { validateDateTime } from '@/lib/utils';
import { calculateBazi } from '@/lib/bazi';
import { getZodiac, generateZodiacFortune } from '@/lib/zodiac';
import { drawTarot } from '@/lib/tarot';
import { generateFortune } from '@/lib/fortune';
import { getDailyAdvice, getLoveLuck, getLuckyNumber, getLuckyColor } from '@/lib/textTemplates';
import { CardLayout } from '@/components/CardLayout';
import { BaziCard } from '@/components/BaziCard';
import { ZodiacCard } from '@/components/ZodiacCard';
import { TarotCard } from '@/components/TarotCard';
import { SummaryCard } from '@/components/SummaryCard';
import { AdviceCard } from '@/components/AdviceCard';
import { Footer } from '@/components/Footer';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    if (!date || !time) {
      setError('参数缺失');
      setLoading(false);
      return;
    }

    // 验证参数
    const validation = validateDateTime(date, time);
    if (!validation.valid) {
      setError(validation.error || '参数无效');
      setLoading(false);
      return;
    }

    try {
      // 计算所有数据
      const bazi = calculateBazi(new Date(date), time);
      const zodiacName = getZodiac(new Date(date));
      const zodiac = generateZodiacFortune(zodiacName);
      const tarot = drawTarot(3);
      const fortune = generateFortune({ bazi, zodiac, tarot });
      const advice = {
        dailyAdvice: getDailyAdvice(),
        loveLuck: getLoveLuck(),
        luckyNumber: getLuckyNumber(),
        luckyColor: getLuckyColor(),
      };

      setData({ bazi, zodiac, tarot, fortune, advice });
      setLoading(false);
    } catch (err) {
      setError('计算失败');
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) return <div className="text-center py-20">加载中...</div>;
  if (error) return <div className="text-center py-20 text-red-400">{error}</div>;

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <BaziCard baziData={data.bazi} />
        <ZodiacCard zodiacData={data.zodiac} />
        <TarotCard tarotData={data.tarot} />
        <SummaryCard fortuneData={data.fortune} />
        <AdviceCard adviceData={data.advice} />
      </div>
      <Footer />
    </div>
  );
}
```

**输出文件**：
- `app/result/page.tsx`

---

### 板块 16：集成测试
**目标**：端到端测试

**任务清单**：
- [ ] 完整流程测试（首页输入 → 结果页展示）
- [ ] 不同日期时间测试（边界情况）
- [ ] 移动端测试（响应式）
- [ ] 桌面端测试
- [ ] 多浏览器兼容性测试
- [ ] 性能测试

**测试验证**：
```bash
# 完整流程
1. 访问首页 http://localhost:3000
2. 输入出生日期：2000-01-01
3. 输入出生时间：08:00
4. 点击"开始测算"
5. 验证跳转到结果页
6. 验证所有卡片数据正确
7. 验证动效流畅

# 边界测试
1. 测试最小年份：1900-01-01
2. 测试最大年份：当前年份
3. 测试无效日期：2025-12-32
4. 测试无效时间：25:00
```

---

## 四、测试验证体系

### 4.1 单元测试（每个板块完成时执行）

| 板块 | 测试内容 | 验证标准 |
|-----|---------|---------|
| 类型定义 | TypeScript 类型检查 | 无类型错误 |
| 工具函数 | validateDateTime, randomInt, randomChoice | 输出正确 |
| Mock 数据 | 数据完整性 | 数量正确 |
| 文案模板 | 模板生成测试 | 输出不为空 |
| 八字算法 | calculateBazi() | 四柱+五行正确 |
| 星座算法 | getZodiac(), generateZodiacFortune() | 星座判断正确 |
| 塔罗算法 | drawTarot() | 抽牌结果有效 |
| 运势算法 | generateFortune() | 评分 0-100 |
| 组件 | 组件渲染 | 无报错，显示正确 |
| 页面 | 页面交互 | 功能正常 |

### 4.2 集成测试（板块 16）

| 测试项 | 测试内容 | 预期结果 |
|-------|---------|---------|
| 完整流程 | 首页 → 结果页 | 正常跳转，数据正确 |
| 边界情况 | 1900-01-01, 当前日期 | 正常处理 |
| 参数验证 | 无效日期时间 | 显示错误提示 |
| 响应式 | 移动端/桌面端 | 布局自适应 |
| 兼容性 | Chrome/Safari/Firefox | 功能正常 |
| 性能 | 首屏 < 3s，响应 < 500ms | 符合要求 |

### 4.3 隐私验证（必须通过）

| 验证项 | 标准 |
|-------|------|
| 数据存储 | 不使用 localStorage 存储用户信息 |
| 数据库 | 不连接任何数据库 |
| 第三方 API | 不使用第三方 API |
| Cookie | 不设置持久化 Cookie |
| 免责声明 | 底部显示免责文字 |

---

## 五、版本管理

### 5.1 版本号规则

```
V{主版本}.{次版本}.{修订版}
```

| 版本 | 说明 | 示例 |
|-----|------|------|
| 主版本 | 重大架构变更 | V1.0 → V2.0 |
| 次版本 | 新增功能板块 | V0.2 → V0.3 |
| 修订版 | Bug 修复 | V0.2.1 → V0.2.2 |

### 5.2 当前版本
**V0.2.1** - 优化版（增加 Mock 数据、工具函数、Framer Motion）

### 5.3 变更记录

```
## V0.2.1 (2026-03-18)
### 新增
- 增加 Mock 数据文件 (lib/mockData.ts)
- 增加工具函数文件 (lib/utils.ts)
- 增加 Framer Motion 动画库
- 增加共用卡片布局组件 (CardLayout.tsx)
- 增加算法代码示例和伪代码
- 增加边界条件定义

### 改进
- 完善文案模板系统
- 增加数据验证函数
- 优化组件复用性

### 修复
- 无
```

---

## 六、开发进度管理

### 6.1 进度追踪表

| 板块 | 状态 | 备注 |
|-----|------|------|
| 板块 0：项目初始化 | ⬜ 待开始 | |
| 板块 1：类型+工具函数 | ⬜ 待开始 | |
| 板块 2：Mock+文案模板 | ⬜ 待开始 | |
| 板块 3：八字算法 | ⬜ 待开始 | |
| 板块 4：星座算法 | ⬜ 待开始 | |
| 板块 5：塔罗算法 | ⬜ 待开始 | |
| 板块 6：运势算法 | ⬜ 待开始 | |
| 板块 7：CardLayout | ⬜ 待开始 | |
| 板块 8：BaziCard | ⬜ 待开始 | |
| 板块 9：ZodiacCard | ⬜ 待开始 | |
| 板块 10：TarotCard | ⬜ 待开始 | |
| 板块 11：SummaryCard | ⬜ 待开始 | |
| 板块 12：AdviceCard | ⬜ 待开始 | |
| 板块 13：Footer | ⬜ 待开始 | |
| 板块 14：首页 | ⬜ 待开始 | |
| 板块 15：结果页 | ⬜ 待开始 | |
| 板块 16：集成测试 | ⬜ 待开始 | |

### 6.2 状态图例
| 图标 | 含义 |
|-----|------|
| ⬜ | 待开始 |
| 🟡 | 进行中 |
| 🟢 | 已完成 |
| 🔴 | 有问题 |

### 6.3 完成标准

一个板块只有满足以下条件才能标记为"已完成"：
- [ ] 所有任务完成
- [ ] 所有测试验证通过
- [ ] 代码无报错
- [ ] 功能符合 PRD 要求

---

## 七、开发规范（不可违背）

### 7.1 代码规范
| 规范 | 要求 |
|-----|------|
| 文件编码 | UTF-8 |
| 缩进 | 2 空格 |
| 分号 | TypeScript 必须使用分号 |
| 注释 | 核心逻辑必须有注释 |
| 命名 | 驼峰命名（camelCase）|

### 7.2 组件规范
| 规范 | 要求 |
|-----|------|
| Props 类型 | 必须定义 TypeScript 接口 |
| 默认值 | 必要时提供默认值 |
| 响应式 | 必须考虑移动端 |
| 无障碍 | 适当的 ARIA 标签 |

### 7.3 算法规范
| 规范 | 要求 |
|-----|------|
| 纯函数 | 无副作用，相同输入→相同输出 |
| 类型安全 | 完整的 TypeScript 类型 |
| 错误处理 | 合理的边界情况处理 |
| 可测试 | 易于单元测试 |

### 7.4 UI/UX 规范
| 规范 | 要求 |
|-----|------|
| 深色主题 | 背景色 #0f0f1a |
| 卡片样式 | 圆角、阴影、半透明 |
| 动效 | 使用 Framer Motion，流畅 |
| 响应式 | Mobile First |

---

## 八、输出顺序

按以下顺序输出代码（每个板块完成后输出）：

1. **板块 0 输出**：
   - `package.json`
   - `tailwind.config.ts`
   - `tsconfig.json`
   - `app/layout.tsx`

2. **板块 1 输出**：
   - `lib/types.ts`
   - `lib/utils.ts`

3. **板块 2 输出**：
   - `lib/mockData.ts`
   - `lib/textTemplates.ts`

4. **板块 3 输出**：
   - `lib/bazi.ts`

5. **板块 4 输出**：
   - `lib/zodiac.ts`

6. **板块 5 输出**：
   - `lib/tarot.ts`

7. **板块 6 输出**：
   - `lib/fortune.ts`

8. **板块 7-13 输出**：
   - `components/CardLayout.tsx`
   - `components/BaziCard.tsx`
   - `components/ZodiacCard.tsx`
   - `components/TarotCard.tsx`
   - `components/SummaryCard.tsx`
   - `components/AdviceCard.tsx`
   - `components/Footer.tsx`

9. **板块 14 输出**：
   - `app/page.tsx`

10. **板块 15 输出**：
    - `app/result/page.tsx`

---

## 九、可选增强功能

### 9.1 Storybook（可选）
用于组件可视化和独立开发

```bash
npm install -D @storybook/react @storybook/addon-essentials
npx storybook@latest init
```

### 9.2 国际化（可选）
支持多语言

```
lib/
├── locales/
│   ├── zh-CN.ts
│   └── en-US.ts
```

### 9.3 PWA（可选）
支持离线访问和安装

```bash
npm install next-pwa
```

### 9.4 分享功能（可选）
支持分享结果

- 复制链接
- 生成图片
- 社交媒体分享

---

## 十、变更管理

### 10.1 变更申请流程

当需要修改已完成的板块时：
1. 说明变更原因
2. 确认不影响其他板块
3. 重新进行测试验证
4. 更新版本号（如适用）
5. 记录变更日志

### 10.2 回退机制

如果新功能导致问题：
1. 立即回退到稳定版本
2. 分析问题根因
3. 修复后重新测试
4. 再合并到主分支

---

## 十一、附录

### 11.1 关键文件清单（21 个）

| # | 文件路径 | 板块 | 说明 |
|---|---------|------|------|
| 1 | package.json | 0 | 项目依赖 |
| 2 | tailwind.config.ts | 0 | Tailwind 配置 |
| 3 | tsconfig.json | 0 | TypeScript 配置 |
| 4 | app/layout.tsx | 0 | 全局布局 |
| 5 | lib/types.ts | 1 | 类型定义 |
| 6 | lib/utils.ts | 1 | 工具函数 |
| 7 | lib/mockData.ts | 2 | Mock 数据 |
| 8 | lib/textTemplates.ts | 2 | 文案模板 |
| 9 | lib/bazi.ts | 3 | 八字算法 |
| 10 | lib/zodiac.ts | 4 | 星座算法 |
| 11 | lib/tarot.ts | 5 | 塔罗算法 |
| 12 | lib/fortune.ts | 6 | 运势算法 |
| 13 | components/CardLayout.tsx | 7 | 共用卡片布局 |
| 14 | components/BaziCard.tsx | 8 | 八字卡片 |
| 15 | components/ZodiacCard.tsx | 9 | 星座卡片 |
| 16 | components/TarotCard.tsx | 10 | 塔罗卡片 |
| 17 | components/SummaryCard.tsx | 11 | 综合运势卡片 |
| 18 | components/AdviceCard.tsx | 12 | 建议卡片 |
| 19 | components/Footer.tsx | 13 | 底部组件 |
| 20 | app/page.tsx | 14 | 首页 |
| 21 | app/result/page.tsx | 15 | 结果页 |

### 11.2 快速参考

**运行项目**：
```bash
npm install && npm run dev
```

**访问地址**：
```
http://localhost:3000
```

**测试 URL**：
```
http://localhost:3000/result?date=2000-01-01&time=08:00
```

### 11.3 边界条件说明

| 参数 | 有效范围 | 无效示例 |
|-----|---------|---------|
| 年份 | 1900-2100 | 1899, 2101 |
| 月份 | 1-12 | 0, 13 |
| 日期 | 1-31（根据月份）| 32, 0 |
| 小时 | 0-23 | 24, -1 |
| 分钟 | 0-59 | 60, -1 |

---

**开发方案结束**
