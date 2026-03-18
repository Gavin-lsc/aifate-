# AIFATE 项目配置

## 项目概述
- **项目名称**: AIFATE 运势测算 Web App
- **版本**: V0.2.1
- **性质**: 娱乐应用
- **开发原则**: 板块隔离开发、测试驱动、不存储用户数据

---

## 技术栈约束（不可变更）

### 必须使用
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React
- Framer Motion（动画库）

### 严禁使用
- ❌ 数据库
- ❌ 用户登录系统
- ❌ localStorage 存储用户信息
- ❌ 第三方付费 API
- ❌ 后端服务

---

## 目录结构（不可变更）

```
aifate/
├── app/
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页
│   └── result/
│       └── page.tsx        # 结果页
├── components/
│   ├── CardLayout.tsx      # 共用卡片布局
│   ├── BaziCard.tsx
│   ├── ZodiacCard.tsx
│   ├── TarotCard.tsx
│   ├── SummaryCard.tsx
│   ├── AdviceCard.tsx
│   └── Footer.tsx
├── lib/
│   ├── types.ts            # 类型定义
│   ├── mockData.ts         # Mock 数据
│   ├── utils.ts            # 工具函数
│   ├── bazi.ts            # 八字算法
│   ├── zodiac.ts          # 星座算法
│   ├── tarot.ts           # 塔罗算法
│   ├── fortune.ts         # 运势算法
│   └── textTemplates.ts   # 文案模板
├── public/
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 开发规范

### 代码规范
| 规范 | 要求 |
|-----|------|
| 文件编码 | UTF-8 |
| 缩进 | 2 空格 |
| 分号 | TypeScript 必须使用分号 |
| 注释 | 核心逻辑必须有注释 |
| 命名 | 驼峰命名（camelCase）|

### 组件规范
- 必须定义 TypeScript 接口作为 Props 类型
- 必要时提供默认值
- 必须考虑移动端响应式
- 使用 'use client' 标记客户端组件

### 算法规范
- 纯函数：无副作用，相同输入→相同输出
- 完整的 TypeScript 类型
- 合理的边界情况处理
- 易于单元测试

### UI/UX 规范
- 深色主题：背景色 #0f0f1a
- 卡片样式：圆角、阴影、半透明
- 动效：使用 Framer Motion，流畅
- 响应式：Mobile First

---

## 开发流程（按顺序执行）

项目分为 16 个开发板块，必须按顺序执行：

| 板块 | 内容 | 输出文件 |
|-----|------|---------|
| 0 | 项目初始化 | package.json, tailwind.config.ts, tsconfig.json, app/layout.tsx |
| 1 | 类型定义 + 工具函数 | lib/types.ts, lib/utils.ts |
| 2 | Mock 数据 + 文案模板 | lib/mockData.ts, lib/textTemplates.ts |
| 3 | 八字算法 | lib/bazi.ts |
| 4 | 星座算法 | lib/zodiac.ts |
| 5 | 塔罗算法 | lib/tarot.ts |
| 6 | 运势算法 | lib/fortune.ts |
| 7 | CardLayout 组件 | components/CardLayout.tsx |
| 8 | BaziCard 组件 | components/BaziCard.tsx |
| 9 | ZodiacCard 组件 | components/ZodiacCard.tsx |
| 10 | TarotCard 组件 | components/TarotCard.tsx |
| 11 | SummaryCard 组件 | components/SummaryCard.tsx |
| 12 | AdviceCard 组件 | components/AdviceCard.tsx |
| 13 | Footer 组件 | components/Footer.tsx |
| 14 | 首页 | app/page.tsx |
| 15 | 结果页 | app/result/page.tsx |
| 16 | 集成测试 | - |

**重要**: 每个板块完成后必须进行测试验证通过后，才能进入下一个板块。

---

## 边界条件

| 参数 | 格式 | 有效范围 |
|-----|------|---------|
| 出生日期 | YYYY-MM-DD | 1900-01-01 至 当前日期 |
| 出生时间 | HH:mm | 00:00 至 23:59 |
| 年份范围 | 数字 | 1900-2100 |

---

## 导入路径规范

- 使用 `@/lib/` 导入 lib 目录下的文件
- 使用 `@/components/` 导入 components 目录下的文件
- 使用 `@/app/` 导入 app 目录下的文件

示例：
```typescript
import { validateDateTime } from '@/lib/utils';
import { CardLayout } from '@/components/CardLayout';
```

---

## 运行项目

```bash
npm install && npm run dev
```

访问地址：`http://localhost:3000`

---

## 参考

详细开发方案请参阅：`DEVELOPMENT_PLAN.md`
PRD 文档请参阅：`PRD-AIFATE.md`
