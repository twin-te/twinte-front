<div style="padding: 20px" align="center">

<p>
    <img src="./src/assets/img/Twintelogo-color.png" width="300">
</p>
<p>
    <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
    </a>
</p>

</div>

# twin:te-front

時間割アプリ
Twin:te - https://app.twinte.net のフロントエンドです。

- 公式サイト - https://www.twinte.net
- AppStore - 
- PlayStore - 

## feature

- SSO(シングルサインオン)によるクロスプラットフォームでの時間割の共有
- シンプルな時間割追加UXとkdbと連携した時間割の自動生成
- 他の時間割アプリと比較して軽量(Web版は2Mb以下)

## Development

このプロジェクトはOSSのため、コントリビュートを歓迎しております。
TypeScript と Vuejs のいづれかの基礎知識(HTML, SASSなど)があればコントリビュート可能です。

まずはリポジトリをクローンして依存ライブラリをインストールします。

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

静的ファイルを出力します。出力先は`./dist`です

```
$yarn generate
```

リントします。`@typescript-eslint/parser`を使っているのでちょっと遅いです。fix までするときは`:fix`をつけます。

```
$ yarn lint
or
$ yarn lint:fix
```

フォーマットをします。Prettier の標準ルールに準拠しています。

```
$ yarn format
```

### APIドキュメントの確認

- Twitter アカウント [@te_twin](https://twitter.com/te_twin)
- email info@twinte.net

へご連絡して下さい。

または[バックエンド](https://github.com/twin-te/twinte-server)のコードをごらんください。

![build with Nuxt](https://ja.nuxtjs.org/logos/built-with-nuxt.svg)
