'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TarotCard as TarotCardType } from '@/lib/types';
import { CardLayout } from './CardLayout';
import { getTarotMeaning } from '@/lib/textTemplates';

interface TarotCardProps {
  tarotData: TarotCardType[];
}

/**
 * 塔罗卡片组件
 * 展示抽中的塔罗牌和解读
 */
export function TarotCard({ tarotData }: TarotCardProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <CardLayout title="塔罗指引" icon="🎴" index={2}>
      {/* 卡牌展示 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {tarotData.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: revealed ? 180 : 0 }}
            transition={{ delay: revealed ? index * 0.2 : 0, duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative h-48 cursor-pointer"
            onClick={() => setRevealed(true)}
          >
            {/* 卡牌背面 */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: revealed ? 0 : 1 }}
              transition={{ delay: revealed ? 0.3 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-800 to-pink-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-white/30"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-4xl">🌙</div>
            </motion.div>

            {/* 卡牌正面 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: revealed ? 1 : 0 }}
              transition={{ delay: revealed ? 0.3 : 0 }}
              className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg flex flex-col items-center justify-center p-2 border-2 border-white/30"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="text-3xl mb-2">{card.symbol}</div>
              <div className="text-sm text-white text-center font-bold">{card.name}</div>
              <div className={`text-xs mt-2 px-2 py-1 rounded-full ${
                card.orientation === 'upright' ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'
              }`}>
                {card.orientation === 'upright' ? '正位' : '逆位'}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 塔罗解读 */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-3">
              {tarotData.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{card.symbol}</span>
                    <span className="text-sm font-bold text-white">
                      {card.name} ({card.orientation === 'upright' ? '正位' : '逆位'})
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {getTarotMeaning(card.name, card.orientation)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 点击提示 */}
      {!revealed && (
        <div className="text-center text-sm text-gray-400 mt-4">
          点击卡牌揭示命运
        </div>
      )}
    </CardLayout>
  );
}
