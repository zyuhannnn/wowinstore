# 展示策略代码示例

`offer-display-expiry.ts` 原样复制自本地开发源码的 `app/lib/offer-display-expiry.ts`，保留真实实现，而非为作品集重新发明一套逻辑。

`offer-display-expiry.test.mjs` 是本次新增的独立最小测试，使用虚构日期，不依赖服务器、密钥或生产数据库。

在支持 TypeScript 类型擦除的 Node.js 22.18+ 或 24 下，从仓库根目录运行：

```sh
node --test examples/offer-display-expiry.test.mjs
```
