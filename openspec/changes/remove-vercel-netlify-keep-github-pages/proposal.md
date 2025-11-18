# 移除 Vercel 和 Netlify 配置，只保留 GitHub Pages

## Why
项目只需要使用 GitHub Pages 进行部署，不需要 Vercel 和 Netlify。移除这些不必要的配置可以简化项目结构，减少维护成本。

## What Changes
- 删除 Vercel 配置文件 (`vercel.json`)
- 删除 Netlify 配置文件 (`netlify.toml`)
- 保留 GitHub Pages 配置 (`.github/workflows/deploy.yml`)
- 更新 DEPLOYMENT.md，只保留 GitHub Pages 部署说明
- 更新 README.md，移除 Vercel 和 Netlify 的按钮和链接
- 删除或简化 QUICK_DEPLOY.md（主要针对 Vercel）
- 更新相关文档，只保留 GitHub Pages 相关内容

## Impact
- 移除能力：Vercel 和 Netlify 部署配置
- 保留能力：GitHub Pages 静态部署
- 删除文件：
  - `vercel.json`
  - `netlify.toml`
  - `QUICK_DEPLOY.md`（可选）
- 更新文件：
  - `DEPLOYMENT.md` - 简化为 GitHub Pages 说明
  - `README.md` - 移除 Vercel/Netlify 按钮
  - `docs/DEPLOYMENT_SUMMARY.md` - 更新部署总结
- 无破坏性变更，简化部署流程

