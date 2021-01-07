## category

scala

## titles

http4s

## description

### http4s-dsl

- `case req @ POST -> Root / "async_jobs" :? params as user =>`
  - http4s 固有の DSL 言語を使った書き方
  - ルーターのパターンマッチングは、`(HTTP.Method, Path)`のタプルでマッチングさせる
  - `:?`と`as`は unapply 関数が実装されていて、T を取り出せる
    - Path の`:?`はクエリパラメーターを Map で取り出し、params にキャプチャする
    - Auth の`as`は AuthedRoutes に設定したケースクラス（上記の例だと UserDto）を取り出し、user にキャプチャする
  - `req @`の req には POST した時の body が入っている
