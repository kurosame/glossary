## category

scala

## titles

Scala

## description

### `F[_]`

`List[Int]`の型パラメーターを抽象化すると`List[_]`  
さらに`List[_]`の型を抽象化すると`F[_]`

定義する時は`F[_]`のように抽象化されていても、使う時には`List[Int]`のように具体的な型を指定しないとコンパイルエラーになる  
（TS でいう unknown 型っぽい）

<a href="https://gist.github.com/kurosame/fbabc29e6342d9164a58172c7be522ce" target="_blank">Scala スケーラブルプログラミング</a>

<a href="https://gist.github.com/kurosame/997d22544dea0427094f23e515fb78ac" target="_blank">Scala 関数型デザイン&プログラミング - Scalaz コントリビューターによる関数型徹底ガイド</a>
