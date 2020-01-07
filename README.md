<div style="padding: 20px" align="center">

<p>
    <img src="./src/assets/img/Twintelogo-color.png" width="300">
</p>
<p>
    <a href="https://twitter.com/intent/followscreen_name=te_twin">
    <img src="https://flat.badgen.net/twitter/follow/te_twin?icon=twitter&label=%40te_twin" alt="Official Twitter Handle" />
    </a>
    <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
    </a>
    <a href="https://github.com/microsoft/TypeScript">
    <img src="https://flat.badgen.net/badge/icon/typescript?icon=typescript&label" alt="typescript" />
    </a>
    <a href="https://github.com/twin-te/twinte-front/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22">
    <img alt="good first issue" src="https://img.shields.io/github/issues/twin-te/twinte-front/good%20first%20issue.svg?style=flat-square">
    </a>
</p>

</div>

# twin:te-front

時間割アプリ
Twin:te - https://app.twinte.net のフロントエンドです。
バックエンドは[こちら](https://github.com/twin-te/twinte-server)

- 公式サイト - https://www.twinte.net
- AppStore - https://apps.apple.com/us/app/twin-te/id1489274755?l=ja&ls=1
- PlayStore - https://play.google.com/store/apps/details?id=net.twinte.android

## feature

- SSO(シングルサインオン)によるクロスプラットフォームでの時間割の共有
- シンプルな時間割追加 UX と kdb と連携した時間割の自動生成
- 他の時間割アプリと比較して軽量(Web 版は 2Mb 以下 スマホも 4Mb 以下)

## Development

- 📥 Pull requests and 🌟 Stars are always welcome.
- このプロジェクトは OSS のため、コントリビュートを歓迎しております。
- TypeScript と Vuejs のいづれかの基礎知識(HTML, SASS など)があればコントリビュート可能です。
- ![https://github.com/twin-te/twinte-front/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22](https://img.shields.io/github/issues/twin-te/twinte-front/good%20first%20issue.svg?style=flat-square) のタグがついているものは比較的新規者でも扱いやすい issue になっています。

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

フォーマットをします。Prettier の標準ルールに準拠しています。

```
$ yarn format
```

### API ドキュメントの確認

- Twitter アカウント [@te_twin](https://twitter.com/te_twin)
- email info@twinte.net

へご連絡して下さい。

または[バックエンド](https://github.com/twin-te/twinte-server)のコードをごらんください。

![build with Nuxt](https://ja.nuxtjs.org/logos/built-with-nuxt.svg)

```

```

### よくある注意

- TypeScript 3.7 以降を利用すること（現在 VSCode のデフォルトバージョンは 3.6）
