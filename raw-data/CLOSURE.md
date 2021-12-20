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

### Stale Closures 問題

外部のコンテキストの値を束縛することによる弊害がある

```ts
let number = 0

const increment = () => {
  number += 1
  const message = `Incremented to ${number}`

  return () => {
    console.log(message)
    console.log(`Number: ${number}`)
  }
}

// Closureは外側のmessageを束縛し続けるため、値が更新されない
const log = increment()
increment()
increment()
log() // Incremented to 1; Number: 3
increment()
log() // Incremented to 1; Number: 4
```

たとえば、React の state でも同じことが起きる

```ts
const [number, setNumber] = useState(0)

const increment = () => {
  // Closure内でStateのnumberを参照しているため、1秒ごとに「0 + 1」をずっと繰り返す
  return setInterval(() => {
    setNumber(number + 1)
  }, 1000)
}
```

state がプリミティブ型データだとこの問題は解決不可能  
（オブジェクト型データの場合は、中身を更新すれば、回避できそうな気がする）
