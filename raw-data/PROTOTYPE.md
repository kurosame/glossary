## category

js

## titles

Prototype
プロトタイプ

## description

以下のコンストラクター関数を例にする

```js
function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
  this.run = function() {...}
}
```

Car コンストラクター関数は`prototype`というオブジェクトを持つ  
`prototype`はコンストラクター関数が持つプロパティ（`constructor`や`make`や`run()`など）を持つ  
`mycar = new Car("Eagle", "Talon TSi", 1993)`でインスタンスを作成した時に`prototype`をインスタンス（mycar）の`__proto__`に代入する  
よって、`__proto__`は`Car.prototype`への参照（`prototype`のアドレスを持つ）である  
これをプロトタイプ継承と呼ぶ  
コンストラクターの各インスタンスは、コンストラクターのプロトタイプにアクセスできる

この仕組みによって、文字列／配列／オブジェクトが、`.length`や`.join()`のような組み込み関数を利用できるようになる

プロトタイプ継承のメリットとして、関数（`this.run`）に関してメモリ消費削減のメリットがある

1. Car をインスタンス化
1. そのインスタンスで run 関数を実行
1. ただし、そのインスタンスは run 関数を保持していない（インスタンス化する度に関数をコピーしない）
1. `__proto__`を経由して親へ run 関数を探しにいって実行する

関数のコピーではなく、参照なのでメモリ削減に繋がる  
`__proto__`を経由する動きをプロトタイプチェーンと呼ぶ

toString 関数のプロトタイプチェーンの例

1. `mycar.__proto__`には未定義
1. 継承元の`Car.__proto__`には定義されている
1. つまり、Car の継承元の`Object.prototype`に toString 関数が定義されている

`Object.prototype`にもない（`Object.__proto__`まで到達した）場合、最上位の`Object.__proto__`は null なため、undefined を返す  
プロトタイプチェーンは`Object.__proto__`が null の場合、終了する

ES6 でコンストラクター関数の糖衣構文である class が導入された  
class には constructor 関数があり、これは基本的にコンストラクター関数と同機能

上記の Car コンストラクター関数を class で書くと以下になる

```js
class Car() {
  constructor(make, model, year){
    this.make = make
    this.model = model
    this.year = year
  }
  run() {...}
}
```
