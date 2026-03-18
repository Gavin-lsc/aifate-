'use client';

/**
 * 底部组件
 * 显示版权信息和免责声明
 */
export function Footer() {
  return (
    <footer className="mt-12 py-6 text-center border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-sm text-gray-500 mb-2">
          AIFATE 运势测算 V0.2.1
        </div>
        <div className="text-xs text-gray-600 leading-relaxed">
          本应用仅供娱乐参考，运势测算结果不具有科学依据，请理性对待。
          <br />
          不收集、存储任何用户个人信息。
        </div>
        <div className="mt-4 text-xs text-gray-700">
          © 2026 AIFATE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
