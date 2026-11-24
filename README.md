# 汐光市 · Tidelight

**汐光市 (Tidelight)** 是一款 100% 原创的网页端海滨微缩城市建造模拟游戏（WebGL2 + TypeScript + Three.js + Web Worker 独立仿真核心），以「晴昼微缩模型 · 移轴海滨小镇」为视觉风格，支持桌面键鼠与手机触控畅玩。

**Tidelight (汐光市)** is an original web-based coastal city-builder with a sunlit tilt-shift miniature diorama aesthetic, built with TypeScript, Three.js (WebGL2), and a decoupled Web Worker simulation core. Playable on both desktop and mobile browsers.


**在线试玩 · Play now:** [https://wu352947-cmd.github.io/tidelight-city/](https://wu352947-cmd.github.io/tidelight-city/)  ·  示例小镇：[?demo=1](https://wu352947-cmd.github.io/tidelight-city/?demo=1)

---

## 主要玩法 · Features

- **道路网络 · Road Network**：直线 / 贝塞尔曲线 / 自由绘制与升级，支持节点/路段/15°角度吸附、自动 T 型路口与十字路口拆分；包含双车道小路、林荫小道、单向双车道、四车道大道及对外高速。
- **分区与成长 · Zoning & Growables**：道路两侧 8m×8m 自动分区格，支持低/高密度居住、低/高密度商业、通用工业、现代办公；由 RCI+O 需求、地价、水电、服务覆盖驱动建筑建造与升级。
- **水电与公共服务 · Utilities & Civic Services**：风电 / 燃煤 / 太阳能、抽水站 / 水塔 / 排污口及输电线与地下供水管网；社区诊所、医院、中小学、警察局、消防站、街心公园、海湾广场与填埋场。
- **动态交通与昼夜 · Live Traffic & Day/Night**：车道级寻路与车流跟驰模拟，晴昼 / 晨曦 / 暮光 / 星夜循环，移轴微缩景深与夜景辉光。
- **财政、里程碑与存档 · Economy & Saves**：税率与分项预算调节、5 级人口里程碑解锁、本地自动存档与 3 个手动存档槽。

---

## 操作方式 · Controls

### 桌面端 · Desktop
- **镜头移动**：`W/A/S/D` 或方向键，或无工具时左键拖拽 / 中键拖拽
- **旋转与俯仰**：右键拖拽，或 `Q / E` 旋转
- **缩放**：鼠标滚轮（以光标位置为焦点缩放）
- **建筑旋转 / 取消工具**：`R` 旋转设施，`Esc` 或短按右键取消当前工具
- **查看建筑详情**：无建造工具时左键点击任意建筑

### 移动端 · Mobile / Touch
- **镜头移动**：未选工具时单指拖拽
- **缩放 / 旋转 / 俯仰**：双指捏合缩放、双指扭转旋转、双指上下拖动调整俯仰角
- **建造与涂抹**：从底部工具栏打开抽屉后，单指点击或拖动铺设道路、涂抹分区或放置设施
- **查看建筑详情**：单指轻触或长按建筑

---

## URL 参数 · Launch Parameters

在网址后添加以下参数可直达特定视角或画质模式：

| 参数 Parameter | 说明 Description |
| :--- | :--- |
| `?demo=1` | 载入由真实建造指令与模拟快进生成的海滨示例小镇（推荐快速体验） |
| `?renderer=webgl` | 使用 WebGL2 渲染路径（默认开启，兼容低配显卡与软件渲染） |
| `?quality=low\|medium\|high` | 手动指定画质预设（移动端默认自动降档以保证流畅） |
| `?time=day\|dusk\|night\|dawn` | 锁定昼夜时刻（晴昼 / 暮光 / 星夜 / 晨曦） |
| `?cam=overview\|street\|newcity` | 切换初始视角（鸟瞰 / 街景 / 空白海湾） |
| `?overlay=traffic\|landvalue\|pollution\|power\|water\|services\|happiness` | 启动时直接打开对应城市信息视图 |

示例 / Example:
```text
?demo=1&renderer=webgl&cam=overview&time=day
?demo=1&renderer=webgl&time=night
```

---

## 本地开发 · Development

```bash
npm run dev      # 启动本地开发服务器
npm test         # 运行模拟核心单元测试 (Vitest)
npm run build    # 类型检查并构建生产包 (base: /tidelight-city/)
```

更多致谢与开源许可声明请见 [CREDITS.md](./CREDITS.md) 或点击游戏内左上角「汐光市」打开关于面板。
