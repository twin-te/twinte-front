## ブランチ運用

- ネイティブとアップデートを揃えるため以下のようなブランチを運用
- v20.4 ← 2020年4月にマージされる
- enhancementは基本的にこっち（以下バージョンブランチ）
- bugはmasterに入れていいが、HikaruEgashiraとtakonasu二人にapproveもらいたい
- バージョンブランチはtakonasu(インフラ管理者)が基本的にPR出して、HikaruEgashiraがapprove、takonasuがマージが基本（逆もあるかも）

## 開発環境

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

## API ドキュメントの確認

- Twitter アカウント [@te_twin](https://twitter.com/te_twin)
- email info@twinte.net

へご連絡して下さい。

または[バックエンド](https://github.com/twin-te/twinte-server)のコードをごらんください。
