# Pretext Typography

一个面向 Codex 的高级排版 skill，底层能力来自 [Pretext](https://github.com/chenglou/pretext)。

[English README](./README.md)

## 这个仓库解决什么问题

`pretext` 本身已经很强，能做多行文本测量、换行、复杂文本流动和跨语言排版。但它还不是一个现成可安装的 Codex skill。

这个仓库把它封装成了一个可以直接复用的顶级 skill，让代理在做排版工作时不只是“知道有 Pretext”，而是真的能把它落地成代码和界面。

它重点补上了这些能力：

- 根据场景选择正确的 Pretext API
- 把排版目标翻译成实现步骤
- 提供可直接起步的模板
- 对多语言、混合脚本、emoji、`pre-wrap` 等场景给出明确指导
- 让代理更稳定地产出真正可上线的高级排版方案

## 适合用在什么场景

用 `$pretext-typography` 处理这些任务很合适：

- 英雄区标题平衡排版
- 聊天气泡、评论卡片的精确高度预测
- 不触发 DOM reflow 的文本高度测量
- 绕图文障碍物排版的 editorial layout
- Canvas、SVG、自定义渲染层中的文本排版
- 英文、中文、阿拉伯文、emoji 混排的复杂界面

## 仓库里包含什么

- `SKILL.md`：真正给 Codex 用的 skill 入口
- `references/`：API 选型、排版模式、多语言 QA 要点
- `assets/templates/`：三个可复用模板
- `scripts/scaffold-template.mjs`：把模板复制到目标目录
- `agents/openai.yaml`：技能元数据
- `.github/workflows/validate.yml`：GitHub CI 校验

## 安装方式

把仓库放到你的 Codex skills 目录里：

```sh
git clone https://github.com/wimi321/pretext-typography-skill.git "$CODEX_HOME/skills/pretext-typography"
```

本地开发阶段也可以直接软链接：

```sh
ln -s /absolute/path/to/pretext-typography "$CODEX_HOME/skills/pretext-typography"
```

## 示例提示词

- `Use $pretext-typography to build a balanced multilingual headline block for our landing page.`
- `Use $pretext-typography to replace DOM text measurement in our chat list with Pretext.`
- `Use $pretext-typography to create an editorial article layout that wraps around two floating cards.`
- `Use $pretext-typography to make our card grid support mixed English, Chinese, and Arabic text without overflow.`

## 内置模板

### `balanced-headline`

适合标题平衡排版，使用：

- `prepareWithSegments()`
- `walkLineRanges()`
- `layoutWithLines()`

脚手架命令：

```sh
node scripts/scaffold-template.mjs balanced-headline ./demo
```

### `editorial-engine`

适合做绕排、障碍物流式排版、杂志感布局，使用：

- `layoutNextLine()`

脚手架命令：

```sh
node scripts/scaffold-template.mjs editorial-engine ./demo
```

### `chat-bubbles`

适合做聊天、评论流、虚拟列表中的精确高度测量，使用：

- `prepare()`
- `layout()`

脚手架命令：

```sh
node scripts/scaffold-template.mjs chat-bubbles ./demo
```

## 直接使用 Pretext

模板默认依赖上游 npm 包：

```sh
npm install @chenglou/pretext
```

这个 skill 不是替代 Pretext，而是把 Pretext 变得更容易被正确使用。

## 本地校验

```sh
npm run validate
```

## 致谢

- 上游项目：[chenglou/pretext](https://github.com/chenglou/pretext)
- npm 包：[`@chenglou/pretext`](https://www.npmjs.com/package/@chenglou/pretext)

## 许可证

MIT，见 [LICENSE](./LICENSE)。
