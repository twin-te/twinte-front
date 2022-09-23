# Architecture

[実装クリーンアーキテクチャ](https://qiita.com/nrslib/items/a5f902c4defc83bd46b8)を踏まえて、twinte-front では以下のアーキテクチャは以下を採用しています。

![Architecture image](https://user-images.githubusercontent.com/68944024/161409877-375bb674-b668-4388-9df6-ddd081b9581f.png)

### 1. Entity

ビジネスロジックを表現するためのオブジェクトです。

### 2. UseCase

「このソフトウェアは何ができるのか？」を表現します。

### 3. IRepository

`UseCase`の`Port`を示します。`UseCase`を使用するためのルールのようなものです。

### 4. Repository

データの永続化を行います。`IRepository`の要件さえ満たしていれば、データベースでも、ローカルストレージでも実装方法は問いません。

### 5. Presenter

`ViewModel`と`Entity`の相互変換を行います。

### 6. ViewModel

UI のための型です。`View`で使用されます。

### 7. View

画面の描画を担当します。

# State Management

[Vue.js/State Management](https://vuejs.org/guide/scaling-up/state-management.html)を参考に twinte-front で採用している状態管理について解説します。

`View`を描画するためには、その元となる唯一の情報源が必要で、`State`と呼ばれています。また、ユーザーが`View`から何らかの入力をした場合に、`Action`が呼び出され、`State`を変更することができます。そして、`State`が変更されると`View`は更新されます。この単方向のデータフローを図に示すと以下のようになります。

![Data Flow](https://user-images.githubusercontent.com/68944024/161410858-c3dfca15-2645-4ec5-a7ae-14590462f8b7.png)

## Example

例えば、授業詳細画面でメモの更新を行うときは以下のような処理が行われます。

1. `State` をもとに `View` が描画されている
2. メモの更新を行うため `View` から `Action` を呼び出す（ex. `updateMemo`）
3. `Action` から `UseCase` を呼び出す（ex. `updateRegisteredCrouse`）
4. 更新された `ViewModel` を取得するため `Action` から `Presenter` を呼び出す（ex. `createViewModelCourse`）
5. `State` を 4 で取得した `ViewModel` に更新する
6. `State` が変更されたため `View` が更新される

# References

- [実装クリーンアーキテクチャ](https://qiita.com/nrslib/items/a5f902c4defc83bd46b8)
- [Vue.js/State Management](https://vuejs.org/guide/scaling-up/state-management.html)
- [Twin:te backend v2](https://github.com/twin-te/twinte-server)
- [frontend-clean-architecture](https://github.com/bespoyasov/frontend-clean-architecture/tree/master/src)
- [flux](https://facebook.github.io/flux/docs/in-depth-overview)
