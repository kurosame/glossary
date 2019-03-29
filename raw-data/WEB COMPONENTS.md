## category

html

## titles

Web Components

## description

Web Components とは、以下の 4 つの仕様を組み合わせた際の総称

### Custom Elements

独自の要素（タグ）を登録し利用するための仕様  
以下のような感じ  
ハイフンを入れないといけないというルールがある

```js
var component = document.registerElement('my-component')
document.body.appendChild(new component())
```

### Templates

JavaScript から利用することができる DOM ベースのテンプレート仕様  
`<template>`タグのこと  
template 内に先程の Custom Elements を追加したりする  
そして template を外出しして、部品化するイメージ

### HTML Imports

関連する HTML,CSS,JavaScript ファイルなどをまとめてロードするための仕様  
先程外出しした template を import するイメージ  
ただし今後は HTML Imports から ES Modules に置き換わっていく

### Shadow DOM

DOM ツリーに対してカプセル化を実現するための仕様  
先程 import した template(HTML)で Shadow DOM して完全な部品化となる

```js
const div = document.querySelector('div')
const shadowRoot = div.attachShadow({
  mode: 'open' // or 'close'
})

// readonly な shadowRoot プロパティの追加
console.log(div.shadowRoot)
```

mode が open だと外部から参照できる。close だと不可  
close の場合は、shadowRoot は null になっている（完全に独立した DOM を構築できる）
