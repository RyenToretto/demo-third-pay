# 添加在线部署配置

## Why
项目需要 push 到 GitHub 后可以在线访问 demo，方便展示和测试。目前项目缺少部署配置和相关文档。

## What Changes
- 添加多种部署平台的配置文件
- 推荐使用 Vercel（零配置，最适合 Nuxt）
- 提供 GitHub Pages 静态部署方案
- 添加 Netlify 配置
- 创建详细的部署文档
- 更新 README 添加在线 demo 链接说明

## Impact
- 新增能力：deployment（部署配置）
- 新增文件：
  - `vercel.json` - Vercel 配置
  - `netlify.toml` - Netlify 配置
  - `.github/workflows/deploy.yml` - GitHub Pages 部署
  - `DEPLOYMENT.md` - 部署文档
- 更新文件：
  - `README.md` - 添加部署说明
  - `nuxt.config.ts` - 添加静态生成配置（可选）
- 无破坏性变更，增强项目可访问性

