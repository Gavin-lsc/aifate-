# AIFATE 运势测算 Web 应用

![Version](https://img.shields.io/badge/version-V0.2.2-purple)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 项目简介

AIFATE 是一款融合中国传统文化（八字）与西方神秘学（星座、塔罗）的运势测算娱乐工具。支持 PC 和移动端访问，提供趣味性的运势分析体验。

### 功能特性

- 📅 输入出生日期和时间进行运势测算
- 🔮 八字计算：四柱、五行分布、解读
- ⭐ 星座运势：自动计算星座，三维运势（爱情/事业/财运）
- 🃏 塔罗指引：随机抽取 1-3 张牌，支持翻牌动画
- 📊 综合运势：0-100 分评分系统
- 💡 今日建议：行动建议、桃花运、幸运数字、幸运颜色

## 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **运行环境**: 浏览器（PC + 移动端）

## 快速开始

### 环境要求

- Node.js 18.17+
- npm 或 yarn 或 pnpm

### 安装

```bash
# 克隆项目
git clone <repository-url>
cd aifate

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 访问应用

- **在线体验**: [https://aifate.netlify.app](https://aifate.netlify.app)
- **本地开发**: 打开浏览器访问 `http://localhost:3000`

## 项目结构

```
aifate/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页（输入页）
│   └── result/
│       └── page.tsx        # 结果页
├── components/             # React 组件
│   ├── CardLayout.tsx      # 共用卡片布局
│   ├── BaziCard.tsx        # 八字卡片
│   ├── ZodiacCard.tsx      # 星座卡片
│   ├── TarotCard.tsx       # 塔罗卡片
│   ├── SummaryCard.tsx     # 综合运势卡片
│   ├── AdviceCard.tsx      # 建议卡片
│   └── Footer.tsx         # 底部组件
├── lib/                   # 业务逻辑
│   ├── types.ts            # TypeScript 类型定义
│   ├── mockData.ts         # Mock 数据
│   ├── utils.ts            # 工具函数
│   ├── bazi.ts            # 八字算法
│   ├── zodiac.ts          # 星座算法
│   ├── tarot.ts           # 塔罗算法
│   ├── fortune.ts         # 运势算法
│   └── textTemplates.ts   # 文案模板
├── public/                # 静态资源
├── CLAUDE.md             # Claude Code 项目配置
├── DEVELOPMENT_PLAN.md    # 开发方案
├── PRD-AIFATE.md         # 产品需求文档
├── tailwind.config.ts     # Tailwind 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖
```

## 开发指南

### 可用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产版本
npm start

# 类型检查
npm run type-check

# Lint 检查
npm run lint
```

### 开发规范

- 板块隔离开发：每个功能板块独立开发、独立测试
- 测试驱动：每个板块完成后必须测试验证通过
- 不存储数据：严禁使用数据库、localStorage 存储用户信息
- 纯前端：所有逻辑在前端完成
- Mobile First：响应式设计优先考虑移动端

详细开发规范请参阅：`CLAUDE.md`

## 浏览器兼容性

| 浏览器 | 最低版本 |
|---------|---------|
| Chrome | 最新 2 个版本 |
| Safari | 最新 2 个版本 |
| Firefox | 最新 2 个版本 |
| Edge | 最新 2 个版本 |
| iOS Safari | iOS 14+ |
| Android Chrome | Android 10+ |

## 隐私声明

本工具仅供娱乐参考，不构成任何实际建议，且不会存储您的个人信息。

- ✅ 不使用数据库
- ✅ 不使用用户登录系统
- ✅ 不存储用户数据
- ✅ 不使用第三方付费 API

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

[MIT License](LICENSE)

## 作者

AIFATE Team

## 联系方式

- 项目地址：[GitHub Repository]
- 问题反馈：[Issues]

## 更新日志

### V0.2.2 (2026-03-18)
- 完成所有 16 个开发板块
- 完成集成测试验证
- 配置 Netlify 自动部署
- 在线体验：https://aifate.netlify.app

### V0.2.1 (2026-03-18)
- 增加 Mock 数据文件
- 增加工具函数文件
- 增加 Framer Motion 动画库
- 增加共用卡片布局组件
- 增加算法代码示例和伪代码
- 增加边界条件定义

### V0.2 (2026-03-18)
- 初始版本完整实现

---

**⚠️ 免责声明：本工具仅供娱乐参考，不构成任何实际建议。**
