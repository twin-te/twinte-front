# store

[【書籍】実践 Typescript](https://github.com/takefumi-yoshii/ts-nuxtjs-vuex/tree/master/store)を参考にしており、そのコードは
[ts-nuxtjs-vuex-github](https://github.com/takefumi-yoshii/ts-nuxtjs-vuex/tree/master/store)にある。

vue ファイルに補完が効くように state の型付けを行っている（もともとは any 型）

## 使い方

1. types.ts で型を書く
2. index.ts で関数を書く
3. フォルダーを新規追加するときは[types/shims-vuex-impl.d.ts](..\types\shims-vuex-impl.d.ts)で型付けを行う
