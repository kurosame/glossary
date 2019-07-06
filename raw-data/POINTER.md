## category

programming

## titles

Pointer
ポインタ

## description

ポインタ変数とは、メモリアドレスを格納している変数のこと

```go
package main

import (
	"fmt"
)

func main() {
  var m int = 1

	// 値渡し（nを書き換えてもmに反映されることは無い）
	n := m
	n = n + 1
	fmt.Println(m) // 1
	fmt.Println(n) // 2

	// 参照渡し（メモリを共有しているので、pを書き換えたらmに反映される）
	// [*:ポインタ演算子]を使ってint型のポインタ変数を定義
	var p *int
	// [&:アドレス演算子]を使ってmのアドレスをポインタ変数に代入
	p = &m
	*p = *p + 1
	fmt.Println(m)  // 2
	fmt.Println(*p) // 2
}
```
