## category

programming

## titles

Closure
クロージャ

## description

関数の中の関数  
無名関数でも書ける  
クロージャは外部のコンテキスト（以下だと outer の x）を束縛し続ける

```js
function outer() {
  var x = 10

  // inner関数はClosureになる
  function inner() {
    alert(x)
    x = x + 1
  }
  return inner

  // 上のクロージャを無名関数＆即時Returnに変更
  return function () {
    alert(x)
    x = x + 1
  }
}

var f = outer() // inner関数もしくは、無名関数がfに代入されるだけ

f() // 10
f() // 11
f() // 12
```
