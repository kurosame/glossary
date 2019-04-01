## category

programming

## titles

Currying
カリー化

## description

### 部分適用

一部の引数を固定して、新しい関数を作る

### カリー化

2 引数以上の関数を 1 引数の関数に分解し、ネストさせて同機能となるように置き換えること

### コード例

```js
// 完全適用
const sum1 = (x, y) => x + y

// 部分適用
const sum2 = x => sum1(x, 2)

// カリー化
const sum3 = x => y => x + y

console.log(sum1(1, 2)) // 3
console.log(sum2(1)) // 3
console.log(sum3(1)(2)) // 3
```

上記の例のようにカリー化されていれば、`sum3(1)`のように呼び出せば関数を返すことができるので、  
`filter`などのコールバック関数を引数にする関数と組み合わせれば、`filter`に渡す関数を動的にできる

```js
const compare = x => y => x > y
const objArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(objArray.filter(compare(2))) // [1]
console.log(objArray.filter(compare(8))) // [1, 2, 3, 4, 5, 6, 7]
```
