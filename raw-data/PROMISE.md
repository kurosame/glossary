## category

js

## titles

Promise

## description

Promise の状態は以下のいずれかとなる

- pending  
  Promise インスタンス作成時に pending になる
- fulfilled  
  コールバック関数内で resolve された時に fulfilled になる  
  then 関数を呼ぶ
- rejected  
  コールバック関数内で reject された時に rejected になる  
  catch 関数を呼ぶ

並行処理は Promise.all 関数を使う  
直列処理は then 関数を繋いでいく

状態が pending から 1 回変化すると、その後もう 2 度と状態は変化しない

### then 関数

- then 関数の引数に渡した関数の戻り値を新しい Promise にして返す
- 新しい Promise は fulfilled か rejected に評価済み
- 非同期で実行される

### catch 関数

- catch 関数の引数に渡した関数の戻り値を新しい Promise にして返す
- then 関数で繋いでいて、そのいずれかが rejected になった場合でも catch 関数が呼ばれる（then 関数が新しい Promise を作るから）
