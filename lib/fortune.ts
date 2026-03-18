import { FortuneResult } from './types';
import { BaziResult, ZodiacResult, TarotCard } from './types';

/**
 * 生成综合运势
 * @param inputs 输入数据
 * @returns 运势计算结果
 */
export function generateFortune(inputs: {
  bazi: BaziResult;
  zodiac: ZodiacResult;
  tarot: TarotCard[];
}): FortuneResult {
  // 1. 计算基础分（40-60）
  const baseScore = Math.floor(Math.random() * 21) + 40; // 40-60

  // 2. 加星座运势分（0-20）
  // 计算星座平均星数（1-5），乘以4得到0-20分
  const zodiacAvg = (inputs.zodiac.fortune.love +
                    inputs.zodiac.fortune.career +
                    inputs.zodiac.fortune.wealth) / 3;
  const zodiacScore = (zodiacAvg - 1) * 5; // 0-20

  // 3. 加塔罗运势分（0-20）
  // 正位牌每张约7分，逆位牌每张约3分
  let tarotScore = 0;
  for (const card of inputs.tarot) {
    tarotScore += card.orientation === 'upright' ? 7 : 3;
  }
  // 最多20分
  tarotScore = Math.min(20, tarotScore);

  // 4. 加八字的五行平衡分（0-5）
  // 五行越平衡，分数越高
  const elements = inputs.bazi.elements;
  const elementValues = Object.values(elements);
  const maxElement = Math.max(...elementValues);
  const minElement = Math.min(...elementValues);
  const balanceScore = maxElement > 0 ? (5 - (maxElement - minElement)) : 0;
  const baziBonus = Math.max(0, balanceScore);

  // 5. 计算总分
  const totalScore = baseScore + zodiacScore + tarotScore + baziBonus;
  const score = Math.min(100, Math.max(0, Math.round(totalScore)));

  // 6. 生成总结描述
  let summary = '';
  if (score >= 85) {
    summary = '运势极佳，天时地利人和，抓住机遇，大展身手！';
  } else if (score >= 70) {
    summary = '运势良好，稳步前进，积极行动必有收获。';
  } else if (score >= 55) {
    summary = '运势平稳，保持耐心，静待花开。';
  } else if (score >= 40) {
    summary = '运势一般，调整心态，积蓄力量。';
  } else {
    summary = '运势低迷，放平心态，重新出发。';
  }

  return {
    score,
    summary,
  };
}
