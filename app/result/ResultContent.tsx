'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

export function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    if (!date || !time) {
      setError('参数缺失，请重新输入');
      setLoading(false);
      return;
    }

    // 验证参数
    const validation = validateDateTime(date, time);
    if (!validation.valid) {
      setError(validation.error || '参数无效，请重新输入');
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
      setError('计算失败，请重试');
      setLoading(false);
    }
  }, [searchParams]);

  // 返回首页
  const handleBack = () => {
    router.push('/');
  };

  // 加载状态
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4"
          >
            🔮
          </motion.div>
          <p className="text-white text-lg">正在测算您的运势...</p>
        </motion.div>
      </main>
    );
  }

  // 错误状态
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-4">测算失败</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            className="px-8 py-3 bg-purple-600 rounded-xl text-white font-bold hover:bg-purple-700 transition-colors"
          >
            返回首页
          </motion.button>
        </motion.div>
      </main>
    );
  }

  // 结果展示
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e]">
      <div className="max-w-4xl mx-auto p-4 pb-8">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            运势测算结果
          </h1>
        </motion.div>

        {/* 卡片列表 */}
        <AnimatePresence mode="wait">
          {data && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <BaziCard baziData={data.bazi} />
              <ZodiacCard zodiacData={data.zodiac} />
              <TarotCard tarotData={data.tarot} />
              <SummaryCard fortuneData={data.fortune} />
              <AdviceCard adviceData={data.advice} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 返回按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            className="px-8 py-3 bg-white/10 backdrop-blur-md rounded-xl text-white font-bold hover:bg-white/20 transition-colors border border-white/20"
          >
            重新测算
          </motion.button>
        </motion.div>

        {/* 底部 */}
        <Footer />
      </div>
    </main>
  );
}
