## category

architecture

## titles

Clean Architecture
クリーンアーキテクチャ

## description

内側から

1. Entities
1. Use Cases
1. Controllers, Gateways, Presenters
1. Devices, DB, External Interfaces, Web, UI

以下のルールを持つ

- 外側から内側への依存は許す（外側から内側の関数は普通に呼べる）
- 内側から外側への依存は不可
  - 呼び出す場合はインターフェイスを介して、直接呼ばないようにする（依存性逆転の法則）
- Entities は Model などを置く
- Batch や Repository は Controllers などと同じ層になる
- DB などの 1 番外側の層はライブラリに任せる部分であり、直接実装する部分ではない
