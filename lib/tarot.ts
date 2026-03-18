import { TarotCard } from './types';
import { TAROT_CARDS } from './mockData';
import { randomOrientation, shuffleArray } from './utils';

/**
 * 抽取塔罗牌
 * @param count 抽取数量（1-3张）
 * @returns 塔罗卡牌数组
 */
export function drawTarot(count: number = 3): TarotCard[] {
  // 验证数量
  if (count < 1) count = 1;
  if (count > 3) count = 3;

  // 随机抽取不重复的牌
  const shuffled = shuffleArray([...TAROT_CARDS]);
  const selected = shuffled.slice(0, count);

  // 为每张牌随机正逆位
  return selected.map(card => ({
    id: card.id,
    name: card.name,
    symbol: card.symbol,
    orientation: randomOrientation(),
    meaning: card.meaning,
  }));
}
