# components

## 命名規則

- app-{}: 一度のみ利用
- def-{}: default.vue で利用
- ui-{}: components 内で利用、複数回使う

## Description

[layouts/default.vue](src/layouts/default.vue): toolbar, navigation, dialog の基本構造

[components/def-nav.vue](src/components/def-nav.vue): サイドバー（ログイン実装までは見えないようになってる）

[components/def-dialog-add.vue](src/components/def-dialog-add.vue): 科目追加画面

[components/def-toolbar.vue](src/components/def-toolbar.vue): 上の teal 色のバー（material デザインの仕様の変更で ToolBar は AppBar になったとか聴いたので名称を変更する可能性がある）

[pages/index.vue](src/pages/index.vue): 時間割画面

[components/app-day.vue](src/components/app-day.vue): 時間割の右上に表示するカレンダー

[components/app-table-header.vue](src/components/app-table-header.vue): 春 C とか月火水とか

[components/app-table-contents.vue](src/components/app-table-contents.vue): 時間割本体。

[components/ui/ripple.vue](src/components/ui-ripple.vue) : これで囲うと ripple になる(非推奨)
