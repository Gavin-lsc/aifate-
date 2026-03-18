'use client';

import { ZodiacResult } from '@/lib/types';
import { CardLayout } from './CardLayout';

interface ZodiacCardProps {
  zodiacData: ZodiacResult;
}

/**
 * 星座卡片组件
 * 展示星座名称、符号和三维运势
 */
export function ZodiacCard({ zodiacData }: ZodiacCardProps) {
  const { name, symbol, date, fortune, description } = zodiacData;

  // 星星评级
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-lg ${i < count ? 'text-yellow-400' : 'text-gray-600'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <CardLayout title="星座运势" icon="✨" index={1}>
      {/* 星座名称和符号 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-white mb-1">{name}</div>
          <div className="text-sm text-gray-400">{date}</div>
        </div>
        <div className="text-5xl">{symbol}</div>
      </div>

      {/* 三维运势 */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💕</span>
            <span className="text-gray-200">爱情运势</span>
          </div>
          <div className="flex gap-1">{renderStars(fortune.love)}</div>
        </div>
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💼</span>
            <span className="text-gray-200">事业运势</span>
          </div>
          <div className="flex gap-1">{renderStars(fortune.career)}</div>
        </div>
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <span className="text-gray-200">财运运势</span>
          </div>
          <div className="flex gap-1">{renderStars(fortune.wealth)}</div>
        </div>
      </div>

      {/* 运势描述 */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="text-sm text-gray-300 mb-2">今日运势</div>
        <p className="text-sm text-gray-200 leading-relaxed">{description}</p>
      </div>
    </CardLayout>
  );
}
