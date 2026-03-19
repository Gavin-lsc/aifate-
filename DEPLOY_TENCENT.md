# 腾讯云静态网站托管部署指南

## 前置条件

- 已注册腾讯云账号：https://cloud.tencent.com/
- 已实名认证

---

## 部署步骤

### 步骤 1：构建项目

```bash
cd D:\Claude Code\CC_05_AIFATE
npm install
npm run build
```

构建完成后，会生成 `out/` 目录，这就是需要上传的文件。

---

### 步骤 2：上传到腾讯云

#### 方法一：通过网页控制台上传

1. 访问 https://console.cloud.tencent.com/tcb
2. 点击「新建环境」
3. 选择「按量付费」或「套餐包」
4. 创建环境后，进入「静态网站托管」
5. 点击「上传文件夹」或「上传文件」
6. 选择项目中的 `out` 目录下所有文件
7. 上传完成

#### 方法二：使用 CLI 工具（推荐）

```bash
# 安装腾讯云 CLI
npm install -g @cloudbase/cli

# 登录
cloudbase login

# 部署
cloudbase hosting:deploy out -e 你的环境ID
```

---

### 步骤 3：访问测试

上传完成后，腾讯云会提供一个访问地址，例如：
`https://你的环境ID.service.tcloudbase.com`

---

## 步骤 4：绑定自定义域名（可选）

1. 在腾讯云购买一个域名（如 aifate.cn）
2. 在静态网站托管中添加自定义域名
3. 配置 DNS 解析：
   - 记录类型：CNAME
   - 记录值：你的环境ID.service.tcloudbase.com

---

## 常见问题

### Q: 上传后显示 404
A: 确保 `trailingSlash: true` 配置正确，且上传了 `out/` 目录下的所有文件。

### Q: 图片无法显示
A: 检查 `next.config.js` 中的 `images.unoptimized: true` 已配置。

### Q: 微信浏览器打不开
A: 确保已降级 Framer Motion 到 v10，并配置了 `transpilePackages`。

---

## 免费额度

- 每月 5GB 存储
- 每月 5GB 流量
- 每日 100 万次请求

对于娱乐应用，免费额度完全够用。
