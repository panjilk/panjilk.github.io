# 苏毅凯 · 求职个人网站

用于展示个人介绍、技能、项目作品和经历，并提供联系方式；求职方向为 **AI 应用开发 / Python 开发实习**。网站使用 HTML、CSS 和 JavaScript，可通过 GitHub Pages 托管，无需前端构建步骤。

## 本地预览

在 PowerShell 中进入项目目录并启动静态服务：

```powershell
cd "C:\Users\Panjilk\Desktop\项目\个人主页\panjilk.github.io"
npx.cmd --yes http-server . -a 127.0.0.1 -p 4000 -c-1
```

首次运行需要联网下载 `http-server`。打开 <http://127.0.0.1:4000>，修改文件并保存后刷新页面；按 `Ctrl+C` 停止服务。`-c-1` 关闭缓存，方便查看修改。

## 修改网站

| 文件 | 用途 |
| --- | --- |
| `index.html` | 姓名、求职方向、个人介绍、技能、项目作品、教育与经历、联系方式 |
| `assets/portfolio.css` | 颜色、字体、布局、卡片和移动端样式 |
| `assets/portfolio.js` | 导航、主题切换、微信二维码弹窗等交互 |
| `assets/su-yikai.jpg` | 个人头像；替换图片时保持文件名，或同步修改 HTML 中的引用 |
| `assets/wechat-qr.jpg` | 联系弹窗中的微信二维码；替换图片时保持文件名 |
| `404.html` | 页面不存在时显示的错误页 |

主页栏目对应 `#about`、`#skills`、`#projects`、`#experience` 和 `#contact`。可以在 `index.html` 中搜索这些 ID，找到需要修改的区域。

项目作品和联系信息在 `index.html` 中维护。所有“联系我”和“聊聊实习机会”按钮通过 `data-contact-open` 打开微信二维码弹窗；点击关闭按钮、遮罩或按 Esc 可关闭。原博客文章文件保留，但不作为新网站的导航入口。

## 通过 GitHub Pages 发布

在 GitHub 仓库中打开 **Settings → Pages**，将 **Source** 设置为 **Deploy from a branch**，选择 **main** 分支和 **/(root)** 目录并保存。

检查修改，并只提交需要发布的文件：

```powershell
git diff
git add index.html assets/portfolio.css assets/portfolio.js assets/favicon.svg assets/su-yikai.jpg assets/wechat-qr.jpg 404.html README.md .nojekyll
git add -u -- assets
git commit -m "Update job seeking portfolio"
git push origin main
```

每次更新可根据实际修改调整 `git add` 后的文件列表。推送完成后，在仓库的 **Actions** 或 **Settings → Pages** 查看部署结果。

公开访问地址：<https://panjilk.github.io/>。需要 GitHub Pages 部署成功后才能看到最新版本；本说明不代表网站已完成发布。
