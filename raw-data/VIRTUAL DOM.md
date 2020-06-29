## category

html

## titles

Virtual DOM
仮想 DOM

## description

DOM（Document Object Model）は JS から HTML を操作するための API  
DOM の中にいくつかの Node があり、Node の中に Element などの要素がある

DOM のレンダリングというブラウザにとってコストの高い処理を最適に行うため、仮想 DOM が考えられた

規模の小さいサイトには仮想 DOM のオーバーヘッドが影響するので採用は検討したほうがよい  
仮想 DOM を使わない Svelte という JS フレームワークもある

### 仮想 DOM と実 DOM の更新について（React の場合）

以下の流れで DOM を更新する

1. 仮想 DOM_A から実 DOM_A を初期状態として構築
1. 仮想 DOM_A は実 DOM_A で発生したイベントを受け取り、仮想 DOM_A 内の state の更新を発行
1. 更新された props と state を用いて、仮想 DOM_B を構築
1. 仮想 DOM_A と仮想 DOM_B を比較し、差分を抽出
1. 実 DOM_A に対して、仮想 DOM_B との差分を適用して、実 DOM_B にする

仮想 DOM は差分抽出を高速に行うため、軽量なオブジェクトとして実装されている  
これが ReactElement であり、仮想 DOM 構造体の正体である

仮想 DOM と実 DOM は一致していることが前提なので、実 DOM を直接更新する jQuery は非常に相性が悪い

差分抽出の手がかりとして、Map の中の要素に付ける key 属性がある  
key 属性を適切に付けていれば、key 属性を基に前後の関係を同定できる  
key 属性は仮想 DOM のみに存在し、実 DOM が生成される際には破棄される

Flux で state を管理し、View は state を入力値とするが、この際に state が変われば、変わる度に View をすべてルート要素から再作成している

### 仮想 DOM を作ってみる

以下の HTML に`<span>test span</span>`を追加し、`<p>`のテキストを変更したいとする

```html
<div><p>test</p></div>
```

仮想 DOM は通常の JS オブジェクトなので、以下のように表現される

```js
const vdom = {
  tagName: 'div',
  children: [
    {
      tagName: 'p',
      textContent: 'test'
    }
  ]
}
```

変更したい箇所を含む、仮想 DOM のコピーを作成する

```js
const copy = {
  tagName: 'div',
  children: [
    {
      tagName: 'p',
      textContent: 'test p'
    },
    {
      tagName: 'span',
      textContent: 'test span'
    }
  ]
}
```

仮想 DOM のコピーを利用して、差分を作成する

```js
const diffs = [
  {
    newNode: {
      /* 変更後の「test p」のHTML要素 */
    },
    oldNode: {
      /* 変更前の「test p」のHTML要素 */
    },
    index: {
      /* 子の親ノード内でのインデックス */
    }
  },
  {
    newNode: {
      /* 追加する「test span」のHTML要素 */
    },
    index: {
      /* 子の親ノード内でのインデックス */
    }
  }
]
```

差分を基に必要な更新のみを行う

```js
diffs.forEach(diff => {
  if (diff.oldNode) {
    el.replaceChild(diff.newNode, diff.index)
  } else {
    el.appendChild(diff.newNode)
  }
})
```

普通は、仮想 DOM に直接アクセスせず、React や Vue.js などのフレームワークを利用してアクセスする  
たとえば、React を利用してさきほどの仮想 DOM 更新を実装すると以下のようになる

```js
const newNode = React.createElement(
  'div',
  null,
  React.createElement('p', null, 'test p'),
  React.createElement('span', null, 'test span')
)
ReactDOM.render(newNode, document.body)
```
