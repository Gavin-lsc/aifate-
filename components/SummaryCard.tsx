'use client';

import { motion } from 'framer-motion';
import { FortuneResult } from '@/lib/types';
import { CardLayout } from './CardLayout';

interface SummaryCardProps {
  fortuneData: FortuneResult;
}

/**
 * 综合运势卡片组件
 * 展示运势评分和总结
 */
export function SummaryCard({ fortuneData }: SummaryCardProps) {
  const { score, summary } = fortuneData;

  // 根据分数确定颜色
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-400';
    if (s >= 60) return 'text-blue-400';
    if (s >= 40) return 'text-yellow-400';
    return 'text-orange-400';
  };

  // 根据分数确定进度条颜色
  const getBarColor = (s: number) => {
    if (s >= 80) return 'bg-green-400';
    if (s >= 60) return 'bg-blue-400';
    if (s >= 40) return 'bg-yellow-400';
    return 'bg-orange-400';
  };

  return (
    <CardLayout title="综合运势" icon="📊" index={3}>
      {/* 评分展示 */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* 背景圆环 */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
            />
            {/* 进度圆环 */}
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              className={`${getBarColor(score)}`}
              initial={{ strokeDasharray: '440', strokeDashoffset: '440' }}
              animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{ strokeDasharray: '440' }}
            />
          </svg>
          {/* 分数 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`text-5xl font-bold ${getScoreColor(score)}`}
              >
                {score}
              </motion.div>
              <div className="text-sm text-gray-400">运势分</div>
            </div>
          </div>
        </div>
      </div>

      {/* 总结 */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="text-sm text-gray-300 mb-2">运势总结</div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-lg text-white font-semibold leading-relaxed text-center"
        >
          {summary}
        </motion.p>
      </div>

      {/* 运势等级 */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="text-gray-400">优秀 (80+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-gray-400">良好 (60-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="text-gray-400">一般 (40-59)</span>
        </div>
      </div>
    </CardLayout>
  );
}
