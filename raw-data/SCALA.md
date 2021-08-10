## category

scala

## titles

Scala

## description

<a href="https://gist.github.com/kurosame/fbabc29e6342d9164a58172c7be522ce" target="_blank">Scala スケーラブルプログラミング</a>

<a href="https://gist.github.com/kurosame/997d22544dea0427094f23e515fb78ac" target="_blank">Scala 関数型デザイン&プログラミング - Scalaz コントリビューターによる関数型徹底ガイド</a>

<a href="https://github.com/kurosame/read-scala-with-cats" target="_blank">Scala with Cats</a>

### val と def

- val
  - 定義時に評価される
  - 評価された時にメモ化される
- def
  - 呼び出し時に評価される
  - 結果はメモ化されず、呼び出すたびに評価する
- lazy val
  - 呼び出し時に評価される
  - 評価された時にメモ化される

### `F[_]`

`List[Int]`の型パラメーターを抽象化すると`List[_]`  
さらに`List[_]`の型を抽象化すると`F[_]`

定義する時は`F[_]`のように抽象化されていても、使う時には`List[Int]`のように具体的な型を指定しないとコンパイルエラーになる  
（TS でいう unknown 型っぽい）

`List[Int]`、`F[A]`のように型を引数に取るものを型コンストラクターと呼ぶ  
`Foldable[F[A]]`のように型コンストラクターを引数に取るものを高階型コンストラクター（高カインド型）と呼ぶ

`F[_]`について、`_`が`A`のような型であれば、`F[_]`は型コンストラクター  
`_`が`List[A]`のような型コンストラクターであれば、`F[_]`は高階型コンストラクター
