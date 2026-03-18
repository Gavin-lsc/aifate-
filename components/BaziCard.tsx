'use client';

import { BaziResult } from '@/lib/types';
import { CardLayout } from './CardLayout';

interface BaziCardProps {
  baziData: BaziResult;
}

/**
 * 八字卡片组件
 * 展示四柱八字和五行分布
 */
export function BaziCard({ baziData }: BaziCardProps) {
  const { yearPillar, monthPillar, dayPillar, hourPillar, elements, interpretation } = baziData;

  // 计算五行总数
  const total = elements.metal + elements.wood + elements.water + elements.fire + elements.earth;

  // 计算百分比
  const getPercent = (count: number) => total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <CardLayout title="八字命盘" icon="☯️" index={0}>
      {/* 四柱展示 */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">年柱</div>
          <div className="text-2xl font-bold text-purple-300">{yearPillar}</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">月柱</div>
          <div className="text-2xl font-bold text-green-300">{monthPillar}</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">日柱</div>
          <div className="text-2xl font-bold text-red-300">{dayPillar}</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">时柱</div>
          <div className="text-2xl font-bold text-blue-300">{hourPillar}</div>
        </div>
      </div>

      {/* 五行分布 */}
      <div className="mb-6">
        <div className="text-sm text-gray-300 mb-3">五行分布</div>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 w-8">金</span>
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all"
                style={{ width: `${getPercent(elements.metal)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-6">{elements.metal}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 w-8">木</span>
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full transition-all"
                style={{ width: `${getPercent(elements.wood)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-6">{elements.wood}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 w-8">水</span>
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all"
                style={{ width: `${getPercent(elements.water)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-6">{elements.water}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 w-8">火</span>
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div
                className="bg-red-400 h-2 rounded-full transition-all"
                style={{ width: `${getPercent(elements.fire)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-6">{elements.fire}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 w-8">土</span>
            <div className="flex-1 bg-white/10 rounded-full h-2">
              <div
                className="bg-yellow-600 h-2 rounded-full transition-all"
                style={{ width: `${getPercent(elements.earth)}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 w-6">{elements.earth}</span>
          </div>
        </div>
      </div>

      {/* 八字解读 */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="text-sm text-gray-300 mb-2">命理解读</div>
        <p className="text-sm text-gray-200 leading-relaxed">{interpretation}</p>
      </div>
    </CardLayout>
  );
}
