## category

programming

## titles

Reactive Programming
RP
リアクティブプログラミング

## description

値同士の関連性をプログラミングして、依存している別の値を更新する  
変更した値と直接依存関係にない値は、キャッシュを使う

変更のあった値のみを伝搬し、差分適用させる

```js
let a = 1
let b = 2
let c = a + b // cがaとbに依存する（この時のcは3）
a = 2 // この時aに依存しているcの値も変わる（cが4になる）
```
