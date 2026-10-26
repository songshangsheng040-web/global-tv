# Global TV v2 验证记录

验证日期：2026-10-26（Asia/Shanghai）。本次共 21 条频道记录，14 个国家和地区。

## 实际播放通过：11 个

使用本机 Mac 的 Google Chrome，逐个打开官方 YouTube 观看入口，检查认证发布者、当前直播指示或正在观看人数、播放器运行状态和 Chrome 音频播放标识；非仅检查 HTTP 200。结果有时间和地区范围，不能保证未来和其他网络。

- [ABC News Live](https://www.youtube.com/@ABCNews/live)
- [Sky News](https://www.youtube.com/@SkyNews/live)
- [France 24 English](https://www.youtube.com/@France24_en/live)
- [DW English](https://www.youtube.com/watch?v=LuKwFajn37U)
- [CNA](https://www.youtube.com/@channelnewsasia/live)
- [Al Jazeera English](https://www.youtube.com/@aljazeeraenglish/live)
- [Euronews English](https://www.youtube.com/@euronews/live)
- [ABC NEWS Australia](https://www.youtube.com/watch?v=vOTiJkg1voo)
- [NHK WORLD-JAPAN](https://www.youtube.com/@NHKWORLDJAPAN/live)
- [TRT World](https://www.youtube.com/@trtworld/live)
- [ABC7 New York Eyewitness News](https://www.youtube.com/watch?v=VrhYz4CL70I)

## 未验证或受限：10 个

- CBS News 24/7：官方入口存在，当前音视频未通过本次播放测试。
- NBC News NOW：官方入口存在，当前音视频未通过本次播放测试。
- Bloomberg Television：官方入口存在，当前音视频未通过本次播放测试。
- CBC News Explore：官方入口存在，当前音视频未通过本次播放测试。
- TVNZ 1：地区限制且通常需要免费登录。
- Arirang TV：官方入口存在，当前音视频未通过本次播放测试。
- 港台电视 31 / 32：官方入口存在，当前音视频未通过本次播放测试。
- 公视新闻：官方入口存在，当前音视频未通过本次播放测试。
- tagesschau24：官方入口存在，当前音视频未通过本次播放测试。
- NASA Live：官方入口存在，当前音视频未通过本次播放测试。

ABC 官网备用播放器：用户报告 An error has occurred，已登记为未验证和有故障报告，未将 HTTP 成功误标为可播放。Bloomberg 与 CBS 的官方 YouTube /live 本次进入频道页面，未确认当前在播，所以保留官网为未验证入口。没有据此断言其全部直播服务失效。未新增 BBC、CTV 等无法在本次确认免费持续直播的候选。

## 项目回归验证

- Node 语法检查及 6 项 source-policy 回归测试通过：优先级、结束/失效/预告跳过、72 小时过期、未来时间戳、反馈 URL、频道契约和旧 ID 保留。
- 本地浏览器：旧 ABC 收藏仍在；搜索 Sky 返回正确结果；国家/语言筛选、备用面板、故障草稿预览、字幕指南、主题和刷新正常。反馈测试没有点击 GitHub 提交，也没有创建公开 Issue。
- 播放验证与导航代码分离。Mac 启动文件保持原样；收藏和记录使用原键。

## 持续维护

每次修改 sources 后运行 node --test source-policy.test.cjs；经人工播放核验才能标 playable。过期状态在刷新和交互时按 72 小时有效期重新计算，不是后台自动复测。
