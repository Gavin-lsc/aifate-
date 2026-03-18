'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
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

import { ResultContent } from './ResultContent';

export default function ResultPage() {
  return (
    <Suspense fallback={
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
    }>
      <ResultContent />
    </Suspense>
  );
}
