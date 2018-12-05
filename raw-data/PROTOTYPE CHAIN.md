## category

other

## titles

Prototype Chain
プロトタイプチェーン

## description

JavaScript はクラスをインスタンス化して使うクラスベースのプログラミングとは異なり、  
プロトタイプをベースとしてオブジェクトを取り扱う  
（ES6 で class 構文が導入されたが、これは糖衣構文であり、class の内部的にはプロトタイプベース）

JavaScript で唯一継承が発生する要素が Object になる  
全ての Object はプロトタイプを持ち、他の Object への内部的な繋がりをもっている  
Object を作成した時にプロトタイプは自動で生成される

JavaScript のプロトタイプは`[[Prototype]]`の内部プロパティである`prototype`や`__proto__`により実現されている

### プロトタイプチェーンの動き

1. 現在のインスタンスのプロパティを調べる
1. インスタンス元のオブジェクトのプロトタイプを調べる（上位のオブジェクトがある場合は継承の頂点まで繰り返す）
1. 継承ツリーの頂点`Object.prototype`を調べる
1. `Object.prototype`で見つからない場合は`undefined`を返す

```js:PrototypeChainSample
function SampleA() {}
SampleA.prototype.a = 'a'

var SampleB = function() {}
SampleB.prototype = new SampleA()

var sample_obj = new SampleB()

console.log(sample_obj.a)
```

上記の結果は a が出力され、以下のような動きをしている

1. sample_obj の`prototype`にプロパティ`a`があるか調べる -> なし
1. SampleB の`prototype`にプロパティ`a`があるか調べる -> なし
1. SampleA の`prototype`にプロパティ`a`があるか調べる -> あり（探索終了）

上記の例のように、プロトタイプチェーンにより、JavaScript でもクラスベース言語のように SampleB が SampleA を継承していることが分かる

`__proto__`には`prototype`のアドレスが格納されている  
`prototype`は`__proto__`のアドレスを参照し、プロトタイプチェーンを実現している
