![](https://camo.githubusercontent.com/2f150fdb9a34699191ce7d2dd4c38d6dcbe7280c9ba7b559ecbad1a3135e6dda/68747470733a2f2f7777772e7477696e74652e6e65742f6f67702e6a7067)

# 必要な依存

- Node.js v16 以上推奨
- yarn (Node.js が入っている場合は`corepack enable`)

# 開発方法

```sh
yarn install
yarn dev # https://localhost:3000
```

- 注意: [拡張機能](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)などでブラウザの CORS を無効にしてください

# イベント測定用のマーカについて

本アプリでは Google Tag Manager によるユーザイベントの測定を行っています。  
それに伴いデータ属性`data-gtm-marker`やクラス`gtm-marker-*`のイベント発生箇所を特定するためのマーカを各要所に設置してあります。これらを修正する際は Google Tag Manager の設定も合わせて変更して下さい。
