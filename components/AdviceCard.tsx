'use client';

import { AdviceResult } from '@/lib/types';
import { CardLayout } from './CardLayout';

interface AdviceCardProps {
  adviceData: AdviceResult;
}

/**
 * 建议卡片组件
 * 展示今日建议、桃花运、幸运数字和颜色
 */
export function AdviceCard({ adviceData }: AdviceCardProps) {
  const { dailyAdvice, loveLuck, luckyNumber, luckyColor } = adviceData;

  return (
    <CardLayout title="今日指引" icon="💡" index={4}>
      {/* 今日建议 */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">📝</span>
          <span className="text-sm text-gray-300">今日建议</span>
        </div>
        <p className="text-gray-200 leading-relaxed">{dailyAdvice}</p>
      </div>

      {/* 桃花期 */}
      <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-lg p-4 mb-4 border border-pink-500/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">💕</span>
          <span className="text-sm text-gray-300">桃花运</span>
        </div>
        <p className="text-pink-200 leading-relaxed">{loveLuck}</p>
      </div>

      {/* 幸运信息 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-400 mb-2">幸运数字</div>
          <div className="text-4xl font-bold text-yellow-400">{luckyNumber}</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-400 mb-2">幸运颜色</div>
          <div
            className="text-lg font-bold text-white px-4 py-2 rounded-full bg-white/10"
          >
            {luckyColor}
          </div>
        </div>
      </div>
    </CardLayout>
  );
}
