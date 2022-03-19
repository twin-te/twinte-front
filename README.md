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

# 推奨開発環境

本開発には [VSCode](https://code.visualstudio.com/) および VSCode の拡張機能 [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) を推奨します。  
また Vue Language Features (Volar) は [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471) を有効にすることを推奨します。

推奨理由は Vue Language Features (Volar) により Single File Components 内の型検査結果が視覚的に示されるためです。

なお IDE の型検査はあくまで開発補助機能であり `yarn typecheck` により同様の型検査が行えます。

# イベント測定用のマーカについて

本アプリでは Google Tag Manager によるユーザイベントの測定を行っています。  
それに伴いデータ属性`data-gtm-marker`やクラス`gtm-marker-*`のイベント発生箇所を特定するためのマーカを各要所に設置してあります。これらを修正する際は Google Tag Manager の設定も合わせて変更して下さい。
