#!/bin/zsh
# 固定打开线上版本，无需本地服务器。
TV_URL='https://songshangsheng040-web.github.io/global-tv/'
if [[ -d '/Applications/Google Chrome.app' || -d "$HOME/Applications/Google Chrome.app" ]]; then
  /usr/bin/open -a 'Google Chrome' "$TV_URL"
  exit $?
fi
print '未检测到 Google Chrome。请从 https://www.google.com/chrome/ 安装 Chrome。'
print "也可直接在浏览器访问：$TV_URL"
read 'reply?按回车关闭此窗口…'
