'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardLayoutProps {
  title: string;
  icon?: string;
  children: ReactNode;
  index?: number;
}

/**
 * 共用卡片布局组件
 * 提供深色主题的卡片样式和渐入动画
 */
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
