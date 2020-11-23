## category

apache

## titles

Apache Spark
Spark

## description

<a href="https://qiita.com/kurosame/items/403146033347db9b5bcc" target="_blank">Apache Spark 初心者メモ</a>

### パフォーマンスチューニング

Spark アプリケーションのチューニングは難しい  
以下にチューニングの失敗例を挙げる

- Executor のインスタンス数、CPU コア数、メモリが適切に設定されていない
- Executor インスタンスのメモリとオーバーヘッドの合計が YARN によって割り当てられるメモリを超過する（アプリケーション全体のメモリ量が少ない）
- Executor インスタンスに GC などのシステム操作を行うのに十分なメモリが割り当てられてない

以下はチューニングする上で行うべき設定である

- アプリケーションのニーズに基づいたインスタンスタイプとインスタンス数の設定

  - CPU を多く使う  
    C タイプのインスタンス
  - メモリを多く使う  
    R タイプのインスタンス
  - バランス型  
    M タイプのインスタンス

- spark.executor.cores  
  各 Executor のコア数  
  コア数が多数であれば、Executor が少数になり、低並列性に繋がる  
  コア数が少数であれば、Executor が多数になり、多量の I/O が発生する  
  AWS ブログではいったんコア数 5 に設定することを提案している

- spark.executor.memory  
  各 Executor のメモリサイズ  
  設定値は以下のように計算して導き出せる

  1. `1インスタンスあたりのExecutor数 = (インスタンスのコア数 - 1) / spark.executor.cores`  
     Hadoop デーモン用に 1 コア減算しておく
  1. `Executorのメモリ = インスタンスのメモリ / 1インスタンスあたりのExecutor数`
  1. `spark.executor.memory = Executorのメモリ * 0.9`  
     10%はメモリオーバーヘッドに割り当てる

- spark.driver.cores  
  Driver のコア数  
  spark.executors.cores と等しくすべき

- spark.driver.memory  
  Driver のメモリサイズ  
  spark.executors.memory と等しくすべき

- spark.executor.instances  
  Executor の数  
  ただし、spark.dynamicAllocation.enabled が true の場合は設定不要

  設定値は以下のように計算して導き出せる  
  `spark.executor.instances = 1インスタンスあたりのExecutor数 * インスタンス数 - 1`  
  Driver 用に 1 インスタンス減算しておく

- spark.default.parallelism  
  YARN コンテナーで使用可能なコア数

  設定値は以下のように計算して導き出せる  
  `spark.default.parallelism = spark.executor.instances * spark.executors.cores * 2`  
  プログラミングで coalesce や repartition を使っている場合、この結果に対してさらに調整した方が良い

- GC の頻度や実行時間を確認する  
  GC が適切に行われていないとメモリを見直す必要がある  
  以下を spark-submit のオプションに追加することで Executor の JVM に GC のログを出力できる  
  `--conf "spark.executor.extraJavaOptions=-verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps"`

- yarn.nodemanager.vmem-check-enabled  
  コンテナーの仮想メモリ制限を超えるメモリを使用するとタスクが kill される  
  false を設定しておくのが良い

- yarn.nodemanager.pmem-check-enabled  
  コンテナーの物理メモリ制限を超えるメモリを使用するとタスクが kill される  
  false を設定しておくのが良い

- デバッグやモニタリングを行う  
  spark-submit の verbose オプションや Ganglia など
