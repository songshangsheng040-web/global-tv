# Global TV｜全球电视直播台 · 直播源升级 v2

网站固定地址：https://songshangsheng040-web.github.io/global-tv/

面向 Mac Chrome 的官方新闻直播导航。继续使用原仓库和 GitHub Pages；无付费 API、盗版 IPTV、私自抽取的 M3U8 或外部播放器。原 Mac 启动文件继续有效，无需重新下载。

## 立即观看与备用线路

点击频道，再点击“立即观看”。优先使用经人工核验的官方 YouTube 持续直播入口或当前直播观看页；官网为备用。没有可靠 YouTube 直播时保留官网并明确标记未验证。播放器在 Chrome 新标签页打开，不自动重试，不自动连开多个标签。全屏由 YouTube 或官方播放器提供。

“备用线路”展开后可查看每条线路的 URL、状态、核对时间、验证范围、官方来源依据和限制，再手动切换。不存在的备用入口不会编造。YouTube 频道首页、过去的 LIVE 标题、直播回放均不能作为当前直播证明。

“已验证可播放”仅显示当前仍在验证有效期内的频道。所有频道仍可搜索，并按国家、语言、分类筛选。收藏和最近观看继续使用 `globaltv.favorites`、`globaltv.recent`；升级没有改名或清除这些键。数据仅保存在当前浏览器；网站数据被清除或更换设备后不能恢复。

## 状态与证据

`channels.json` schemaVersion 为 2。每个频道保留原 `id`，新增 `sources`。每条线路记录：

- `type`：youtube / website；`label`、`url`：官方观看入口。
- `status`：playable 已验证可播放 / unverified 官方入口存在但播放未验证 / region 地区限制 / login 需要登录或订阅 / ended 直播已结束 / invalid 链接失效。
- `liveState`：live 核对时正在直播 / unknown 未确认 / scheduled 尚未开播 / ended 已结束。
- `checkedAt`：带时区的实际核对时间。
- `playbackVerifiedAt`、`playbackEvidence`：实际播放测试时间和证据；禁止仅凭 HTTP 200 设置 playable。
- `officialEvidence`：官方身份依据；`verification`、`restrictions`：核对范围及限制。

本次通过 Chrome 检查官方认证频道、播放器正在运行、正在直播指示和音频播放标识。结果仅代表此台 Mac 和当时的网络，不代表全部地区、未来持续可播放或所有节目均实时制作。线性电视可包含官方安排的重播节目。NHK YouTube 新闻流不等于完整 NHK WORLD TV 节目表。

播放证明有效期 72 小时，之后界面自动显示“官方入口存在，但播放未验证”；这不是自动重新测通。未来时间戳不会被视为有效证明。ended、invalid、scheduled 线路不会作为“立即观看”目的地。本站没有绕过跨域限制的自动探测，也没有每页加载后台访问所有广播机构。

详细频道名单及本次实际测试范围见 `VALIDATION.md`。ABC 官网有用户报告的播放器错误，已明确记录在该备用线路。Bloomberg、CBS 的 YouTube /live 本次未进入正在直播播放器，所以没有据此新增“可播放”记录。

## 故障反馈

点击“反馈故障”，选择发生问题的线路和故障类型，可选填说明，先预览。本站不会自动获取位置、账号、浏览记录或用户代理，也不自动创建 Issue。

只有用户点击“在 GitHub 打开草稿”后，所选频道、线路 URL、故障类型和自填说明才会传给 GitHub。用户还必须登录并亲自点击 Submit new issue。Issue 为公开内容，GitHub 用户名可能显示；不要填写密码、邮箱或其他私人信息。关闭反馈窗口不会提交。

## Chrome 字幕翻译

保留已有 Chrome 设置即可，本站不会修改字幕或翻译设置。YouTube 自带 CC 与 Chrome 实时字幕是两种功能；即使 YouTube 提示“无法显示字幕”，有声内容仍可由 Chrome 实时字幕识别，具体以浏览器能力为准。

如需设置：地址栏打开 `chrome://settings/accessibility` → 实时字幕 → 英语 → 实时翻译 → 中文（简体）。翻译由 Chrome 提供，字幕会发送给 Google；网络、设备、音质和版本可能影响结果。本站不提供自制双语字幕。

官方说明：https://support.google.com/chrome/answer/10538231?hl=zh-Hans

## 更新与新增频道

保留原频道 `id`，编辑 `sources`；先核验官方身份，再检查当前直播标识和实际播放器，不把频道主页、预告或回放登记为可播放。未测试填 unverified / unknown，不存在的备用不要添加。有实测证据才填写 playable 和对应时间。更新 `updatedAt` 后提交 main。

GitHub Pages 从 main 根目录自动发布；网址不变。每次加载和点击“更新频道”用时间戳与 `cache: no-store` 读取最新数据，JS/CSS 版本参数避免旧版资源长期缓存。未使用 Service Worker。数据失败会显示错误，不会谎报更新成功。页面程序升级后刷新 Chrome 即可，不影响原收藏和观看记录。

## 验证

`node --check app.js`、`node --check core.js` 检查语法。运行 `node --test source-policy.test.cjs` 检查优先级、失效与预告跳过、证据过期、未来时间戳、反馈草稿和数据契约。浏览器检查旧收藏、搜索、筛选、备用线路、反馈预览、字幕说明、主题和观看记录。

本地预览：在仓库根目录运行 `python3 -m http.server 8765`，使用 Chrome 访问 http://127.0.0.1:8765 。不要直接双击 HTML，因为频道数据通过 fetch 加载。
