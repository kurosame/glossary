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

<a href="https://zenn.dev/kurosame/articles/9167a0dcff3d98" target="_blank">Digdag で環境ごとのパラメーターを設定</a>

### タスクの実行環境について

Digdag では、`+task_name:`という記述でタスクを記述していく

Digdag をサーバーモードで起動（`digdag server`）した場合、タスクごとに専用の workspace ディレクトリを`/tmp`配下に生成し、そのディレクトリ内でタスクが実行される  
そして、タスクが完了したら、そのディレクトリは削除される

よって、タスク 1 で生成したファイルをタスク 2 で使おうとしても、タスク 1 が完了した時点でディレクトリが削除されてしまうので、タスク 2 はそのファイルを参照することができない

Digdag をローカルモードで起動（`digdag run`）した場合は、`digdag run`を行ったディレクトリでタスクが実行されるので、別タスクで生成したファイルを参照することは可能

### Jenkins のデメリット

自由度が高く、GUI 上でジョブの編集など可能なため、管理のルールをちゃんと決めてから運用しないと、属人化する

ローカルのファイルシステムに状態を保存するため、冗長化が難しい

コード管理や Docker でのジョブ実行などもプラグインをインストールすれば可能だが、Jenkins にデフォルトでサポートされているわけではない
