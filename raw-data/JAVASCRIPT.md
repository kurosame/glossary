## category

js

## titles

JavaScript
JS

## description

シングルスレッドで動いているので、並列処理はできない  
キューに登録された関数が順番に実行されていく  
非同期処理はサポートされているので、キューに登録される順番は同期だったり、非同期だったりする

<a href="https://qiita.com/kurosame/items/0434d81bdcd97eb0da19" target="_blank">1 年前に作ったフロントエンド環境を色々新しくした</a>

### var, let, const

- var  
  関数スコープ, 再代入可

- let  
  ブロックスコープ, 再代入可

- const  
  ブロックスコープ, 再代入不可

### this

関数呼び出し時にレシーバが存在すれば、this はそのレシーバを指す  
関数呼び出し時にレシーバが存在しなければ、this はグローバルオブジェクト（window オブジェクト）を指す  
ただし、Strict モード（`use strict`）の時は undefined になる  
アロー関数の場合、宣言された時点で this を確定する  
正確には定義しているスコープの this を引き継ぐ

```js
this.param = 'global'

function param1() {
  console.log(this.param)
}

const param2 = () => console.log(this.param)

const param3 = {
  param: 'local',
  func: param1,
  arrow: param2
}

const param4 = {
  param: 'local',
  func: function() {
    ;(function() {
      console.log(this.param)
    })()
  },
  arrow: function() {
    ;(() => {
      console.log(this.param)
    })()
  }
}

param3.func() // local - thisはparam3になる
param3.arrow() // global - 定義しているスコープ（グローバルオブジェクト）のthisを引き継ぐ
param4.func() // global - funcの中のconsole.logを実行している関数はレシーバが無いので、thisはグローバルオブジェクトを指す
param4.arrow() // local - 定義しているスコープ（param4）のthisを引き継ぐ
```

```js
'use strict'
this.param = 'global'

const param4 = {
  param: 'local',
  func: function() {
    ;(function() {
      console.log(this.param)
    })()
  }
}

param4.func() // error - Strictモードでthisがundefinedになっているので、undefined.paramとなりエラー
```

### bind

bind でオブジェクトを紐づけておけば、レシーバが存在しなくても紐づけたオブジェクトを参照する

```js
this.param = 'global'
const param1 = {
  param: 'local',
  get: function() {
    return this.param
  }
}
const func = param1.get

console.log(param1.get()) // local
console.log(func()) // global
console.log(func.bind(param1)()) // local
```

### reduce

- 動き  
  配列の各要素に対して左から右へ関数を適用し、単一の値にする  
  第 2 引数を指定するかしないかで accumulator が変わる  
  指定しない場合は、accumulator に配列の最初の値が入る  
  指定した場合は、accumulator に第 2 引数が入る

- accumulator  
  関数の戻り値を蓄積する

- currentValue  
  現在参照している配列要素の値

- currentIndex  
  現在参照している配列要素のキー

- array  
  reduce している配列

```js
// 第2引数指定無し
const result = [1, 3, 5, 7].reduce(
  (accumulator, currentValue, currentIndex, array) => {
    console.log('#################')
    console.log(accumulator)
    console.log(currentValue)
    console.log(currentIndex)
    console.log(array)
    console.log('#################')
    return accumulator + currentValue
  }
)
console.log(result)
```

```sh
#################
1
3
1
[1, 3, 5, 7]
#################
#################
4
5
2
[1, 3, 5, 7]
#################
#################
9
7
3
[1, 3, 5, 7]
#################
16
```

```js
// 第2引数指定有り
const result = [1, 3, 5, 7].reduce(
  (accumulator, currentValue, currentIndex, array) => {
    console.log('#################')
    console.log(accumulator)
    console.log(currentValue)
    console.log(currentIndex)
    console.log(array)
    console.log('#################')
    return accumulator + currentValue
  },
  10
)
console.log(result)
```

```sh
#################
10
1
0
[1, 3, 5, 7]
#################
#################
11
3
1
[1, 3, 5, 7]
#################
#################
14
5
2
[1, 3, 5, 7]
#################
#################
19
7
3
[1, 3, 5, 7]
#################
26
```

### Polyfill

- babel-polyfill  
  内部的にカスタム regenerator と core-js を読み込んでいる

### モジュール分割について

- 課題点  
  CDN 経由等の script タグでの読み込みの場合、以下の問題点がある

  - 名前衝突（グローバル領域での名前汚染）
  - 読み込むモジュールに依存関係を事前に知っておく必要がある（読み込み順を間違えると先に script タグで読み込んだモジュールでエラーになる）

- CommonJS  
  module.exports で export したモジュールを require で読み込む  
  CommonJS の仕様でビルド時にライブラリの依存関係を解決するツールが Browserify や webpack

  - メリット

    - グローバル名前空間の汚染を防げる
    - 依存関係を明示できる
    - 同期的に require された順に読み込む
    - シンプルに書ける

  - デメリット
    - モジュール読み込みに時間がかかる為、ブラウザ的にはよろしくない

- AMD（Asynchronous Module Definition）  
  非同期でモジュールを読み込むブラウザファーストな手法  
  書き方が冗長  
  AMD のモジュール仕様で書いた JavaScript をブラウザ上で動かせるようにしたのが、RequireJS  
  RequireJS は CommonJS 仕様の Browserify や webpack と違いランタイムで各モジュールの依存関係を解決する

- UMD（Universal Module Definition）  
  CommonJS と AMD の両方をサポートしている  
  クライアントとサーバの両方で利用可能

- ECMAScript  
  export と import  
  CommonJS や AMD の良い所取り（シンプルで分かりやすい構文と非同期読み込み）

### コンパイラー

<a href="https://qiita.com/kurosame/items/b8f9cb3657538ef703c0" target="_blank">JS の最適化ツール「Prepack」を使ってみる</a>

### フレームワーク比較

<a href="https://kurosame-th.hatenadiary.com/entry/2018/12/25/123302" target="_blank">React と Vue.js と Angular の比較</a>
