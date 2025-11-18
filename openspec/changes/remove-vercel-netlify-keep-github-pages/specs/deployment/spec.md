# 部署配置规范 - Delta

## REMOVED Requirements

### Requirement: Vercel 部署支持
**Reason**: 项目只使用 GitHub Pages 部署，不需要 Vercel  
**Migration**: 使用 GitHub Pages 替代

### Requirement: Netlify 部署支持
**Reason**: 项目只使用 GitHub Pages 部署，不需要 Netlify  
**Migration**: 使用 GitHub Pages 替代

## MODIFIED Requirements

### Requirement: GitHub Pages 静态部署
系统 SHALL 使用 GitHub Pages 作为唯一的部署平台。

#### Scenario: 静态生成
- **WHEN** 运行 `npm run generate` 命令
- **THEN** 生成完整的静态站点到 `.output/public` 目录
- **AND** 所有页面都可以正常访问

#### Scenario: GitHub Actions 自动部署
- **WHEN** 代码 push 到 main 或 master 分支
- **THEN** 自动触发 GitHub Actions workflow
- **AND** 构建并部署到 GitHub Pages
- **AND** 部署成功后可通过 GitHub Pages URL 访问

### Requirement: 部署文档
系统 SHALL 提供 GitHub Pages 部署文档。

#### Scenario: 查看部署说明
- **WHEN** 用户打开 DEPLOYMENT.md
- **THEN** 只看到 GitHub Pages 部署说明
- **AND** 包含详细的步骤说明
- **AND** 包含常见问题的解决方案

#### Scenario: 快速部署
- **WHEN** 用户需要部署项目
- **THEN** 只需 push 代码到 GitHub
- **AND** 在仓库设置中开启 GitHub Pages
- **AND** 选择 GitHub Actions 作为 source

