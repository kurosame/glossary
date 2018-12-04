## category

aws

## titles

Amazon Elastic MapReduce
Amazon EMR
EMR

## description

Hadoop クラスターを立ち上げ、以下のようなことが行える

- YARN によるリソース管理
- Apache Spark などのフレームワークを実行
- HDFS, S3 などのデータストアの操作
- Ganglia をインストールして、ノードの監視・モニタリング

### EMR クラスター内のノード

EMR クラスター内のノード（EC2 インスタンス）は、以下 3 つのノードタイプを持つ

- マスターノード

  - クラスターに 1 つだけ存在している
  - Resource Manager によるアプリケーション全体のリソース監視と割当てを行う
  - Name Node がデータのメタデータを持つ

- コアノード

  - EMR だけの概念
  - クラスター 1 つあたりに最低 1 つのコアノードが必要
  - Node Manager が、Resource Manager と通信をしてノードのリソースを管理する
  - Data Node がデータの実体を持つ
  - Spark などのフレームワークを実行する

- タスクノード
  - オプション
  - Node Manager を持つ
  - Data Node は無い
  - Spark などのフレームワークを実行する
