'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { validateDateTime } from '@/lib/utils';

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [error, setError] = useState('');

  // 更新当前时间
  useEffect(() => {
    const update = () => {
      setCurrentTime(new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // 提交表单
  const handleSubmit = () => {
    setError('');

    if (!date || !time) {
      setError('请选择出生日期和时间');
      return;
    }

    // 验证
    const validation = validateDateTime(date, time);
    if (!validation.valid) {
      setError(validation.error || '输入无效');
      return;
    }

    // 跳转到结果页
    router.push(`/result?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  // 默认时间设置为当前时间
  useEffect(() => {
    const now = new Date();
    const defaultTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setTime(defaultTime);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
            AIFATE
          </h1>
          <p className="text-gray-400 text-lg">运势测算</p>
        </motion.div>

        {/* 卡片容器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20"
        >
          {/* 当前时间 */}
          <div className="text-center mb-6">
            <div className="text-sm text-gray-400 mb-1">当前时间</div>
            <div className="text-2xl font-mono text-white">{currentTime}</div>
          </div>

          {/* 表单 */}
          <div className="space-y-6">
            {/* 日期选择 */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">出生日期</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* 时间选择 */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">出生时间</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* 错误提示 */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center bg-red-500/10 rounded-lg p-3"
              >
                {error}
              </motion.div>
            )}

            {/* 提交按钮 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30"
            >
              开始测算
            </motion.button>
          </div>
        </motion.div>

        {/* 提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-xs text-gray-500"
        >
          仅供娱乐参考，请理性对待
        </motion.div>
      </motion.div>
    </main>
  );
}
