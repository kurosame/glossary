## category

db

## titles

MySQL

## description

### テンポラリテーブル

クエリがある条件を満たす場合、MySQL はテンポラリテーブルを作成して、メモリストレージエンジンやディスクの MyISAM ストレージエンジンで処理を行う  
テンポラリテーブルは最初メモリに作成されるが、ある条件を満たすとディスクに移行する

上記のテンポラリテーブルを作成する条件とディスクテンポラリテーブルに移行する条件は以下を参照  
<a href="https://dev.mysql.com/doc/refman/5.6/ja/internal-temporary-tables.html" target="_blank">MySQL が内部一時テーブルを使用する仕組み</a>

テンポラリテーブルが利用されるかどうかは、EXPLAIN を実行し、Extra カラムに Using temporary が含まれていたら、利用される

INFORMATION_SCHEMA の CREATED_TMP_TABLES と CREATED_TMP_DISK_TABLES でテンポラリテーブルの利用状況が確認できる

- CREATED_TMP_TABLES  
  メモリまたはディスクにテンポラリテーブルを作成した回数

- CREATED_TMP_DISK_TABLES  
  ディスクにテンポラリテーブルを作成した回数

```sql
SELECT * FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = "CREATED_TMP_TABLES";
SELECT * FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = "CREATED_TMP_DISK_TABLES";
```
