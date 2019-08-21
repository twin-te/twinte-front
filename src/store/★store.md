# store

[【書籍】実践Typescript](https://github.com/takefumi-yoshii/ts-nuxtjs-vuex/tree/master/store)を参考にしており、そのコードは
[ts-nuxtjs-vuex-github](https://github.com/takefumi-yoshii/ts-nuxtjs-vuex/tree/master/store)にある。

vueファイルに補完が効くようにstateの型付けを行っている（もともとはany型）

## 使い方

1. types.tsで型を書く
2. index.tsで関数を書く
3. フォルダーを新規追加するときは[types/shims-vuex-impl.d.ts](..\types\shims-vuex-impl.d.ts)で型付けを行う
