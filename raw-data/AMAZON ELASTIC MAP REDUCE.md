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

EMR 上で Spark を実行する際は一般的に以下の手順で実行する

1. Spark アプリケーションのパッケージ（JAR ファイル等）を S3 にアップロードする
1. EMR クラスターを起動
1. EMR クラスター上で S3 からパッケージをインストールし、実行する

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

### パフォーマンスチューニング

- maximizeResourceAllocation  
  Amazon EMR 固有の設定  
  クラスター内の各ノードが最大限リソースを利用できるように計算し、spark-defaults を設定する  
  ただし、この設定を使ってもほとんどの場合、デフォルト値は低く設定されてしまうらしい
