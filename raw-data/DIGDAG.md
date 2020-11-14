## category

workflow-engine

## titles

Digdag

## description

- コードベースのワークフローエンジンなので、Git 管理できる
- dig ファイルが YAML ライクな DSL なので、書きやすい
- Digdag サーバの冗長化が容易にできる
- Docker コンテナーを使ったジョブ実行が容易に実装できる

ワークフローエンジンとして最低限必要な機能は揃っている印象

<a href="https://qiita.com/kurosame/items/5684825023ef75913a5c" target="_blank">AutoScalingGroup を使って Digdag を冗長構成にした</a>

### Jenkins のデメリット

自由度が高く、GUI 上でジョブの編集など可能なため、管理のルールをちゃんと決めてから運用しないと、属人化する

ローカルのファイルシステムに状態を保存するため、冗長化が難しい

コード管理や Docker でのジョブ実行などもプラグインをインストールすれば可能だが、Jenkins にデフォルトでサポートされているわけではない
