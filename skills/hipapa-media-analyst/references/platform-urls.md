# 四平台后台URL模板

## 公众号

**首页概览**：`https://mp.weixin.qq.com/cgi-bin/home?t=home/index&lang=zh_CN&token=TOKEN`

**图文分析**：`https://mp.weixin.qq.com/cgi-bin/appmsg?t=media/appmsg_list&action=list&lang=zh_CN&token=TOKEN`

**用户分析**：`https://mp.weixin.qq.com/cgi-bin/useranalysis?action=attr&lang=zh_CN&token=TOKEN`

**菜单分析**：`https://mp.weixin.qq.com/cgi-bin/frame?t=advanced/dev_frame&lang=zh_CN&token=TOKEN`

## 小红书

**粉丝数据**：`https://creator.xiaohongshu.com/statistics/fans-data`

**笔记管理**：`https://creator.xiaohongshu.com/new/note-manager`

**数据中心**：`https://creator.xiaohongshu.com/statistics/data-analysis`

**创作灵感**：`https://creator.xiaohongshu.com/new/inspiration`

## 视频号

**数据概览**：`https://channels.weixin.qq.com/platform/statistic/overview`

**作品数据**：`https://channels.weixin.qq.com/platform/statistic/post`

**直播数据**：`https://channels.weixin.qq.com/platform/statistic/live`

## 微博

**数据助手**：`https://dss.sc.weibo.com/pc/index`

**粉丝分析**：`https://dss.sc.weibo.com/pc/fans`

**内容分析**：`https://dss.sc.weibo.com/pc/content`

## 采集注意事项

### Token有效期
- 公众号token约30分钟过期
- 小红书/视频号/微博依赖登录态cookie
- **建议**：让用户打开后台页面后，立刻把链接发给你

### 独立浏览器采集流程
```
1. browser open profile=openclaw url=LINK
2. browser snapshot
3. 提取数据
4. browser close
```

### 数据提取要点

**公众号**：
- 总用户数、新增关注、取消关注
- 昨日阅读、昨日分享、昨日点赞
- 近期文章列表（标题/日期/阅读/在看/点赞/收藏）
- 直播数据（如有）

**小红书**：
- 总粉丝、新增粉丝、流失粉丝
- 粉丝来源分布
- 笔记列表（曝光/观看/点击/互动/涨粉）
- 近7日/30日趋势

**视频号**：
- 总粉丝、昨日新增
- 作品数据（播放/点赞/评论/分享/收藏）
- 直播数据（观看/成交）

**微博**：
- 总粉丝、昨日新增
- 昨日发博数、阅读量、互动量
- 页面访问量
- 蓝V认证状态
