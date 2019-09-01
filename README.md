# twinte-front

twinteのフロントエンドです。WIP。

![shintyoku](img/shintyoku.png)

## Development

リポジトリをクローンして依存ライブラリをインストールします。

```
$ git clone git@github.com:twin-te/twinte-front.git
$ cd twinte-front
$ yarn
```

ローカルホストで動かします。

```
$ yarn dev
```

ビルドします。`.nuxt`に吐き出します。

```
$ yarn build
```

ビルドしてスタートします。`.nuxt`に吐き出してスタートします。

```
$ yarn start
```

リントします。`@typescript-eslint/parser`を使っているのでちょっと遅いです。fixまでするときは`:fix`をつけます。

```
$ yarn lint
or
$ yarn lint:fix
```

フォーマットをします。Prettierの標準ルールに準拠しています。

```
$ yarn format
```

## name

toolbar: 上部のバー
![](img/layout.png)

navigation: サイド（左）のバー
![](img/nav.vue.png)

dialog: ポップアップ画面
![](img/dialog.vue.png)

ripple: タップしたときのエフェクト

## file structure

[layouts/default.vue](src/layouts/default.vue): toolbar, navigation, dialogの基本構造
![](img/layout.png)

[pages/index.vue](src/pages/index.vue): 時間割画面
![](img/index.vue.png)

[components/def-](src/components): default.vueで用いるコンポネントをまとめたもの

[components/app-](src/components)  : pages内で用いるコンポネントをまとめたもの

[components/app-day.vue](src/components/app-day.vue): 時間割の右上に表示するカレンダー

[components/app-table-contents.vue](src/components/app-table-contents.vue): 時間割本体。semesterを引数にとって表示するデータを変えている。

[components/ui-](src/components)     : components内で用いるコンポネントをまとめたもの

[components/ui/nav-list.vue](src/components/ui-nav-list.vue) : リスト型の表示をnav.vueで用いる

[components/ui/ripple.vue](src/components/ui-ripple.vue)   : これで囲うとrippleになる

## 次やること

- add: navigation
- レスポンシブ対応
- svgの細かな修正　<- material iconを導入
- バックエンドとのやりとり
- ログイン機能実装
