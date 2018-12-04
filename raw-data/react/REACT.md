## category

react

## titles

React

## description

### Component, Element

```js
// Component
const Hello = React.createClass({
  render() {
    return <div id="sample">hello</div>
  }
})
```

```js
// Element
const element = React.createElement('div', { id: 'sample' }, 'hello')
```

Element は仮想 DOM 構造体  
Component とは複数もしくは単体の Element からなる集合体

### PureComponent

v15.3 で追加された  
パフォーマンスを改善したい時に使える  
props や state をコンポーネント内でイミュータブルに扱っている場合のみ利用できるのデータをイミュータブルに扱っている場合  
名前で勘違いしそうだが、ステートレスなコンポーネントということではない  
React.Component の代わりに React.PureComponent を extends して使う

React のパフォーマンスをチューニングする際は shouldComponentUpdate を書き換えることになる  
（デフォルトは常に true を返す為、毎回更新の際にレンダリングしている）  
PureComponent を使うと shouldComponentUpdate のデフォルトの挙動を  
現在の props と新 props を shallow な比較をして true か false を返すように変更できる

v15 時点の React はコンポーネントの更新が発生した場合、そのコンポーネントをルートとするサブツリー上の全てのコンポーネントを再レンダリングする  
このコンポーネントの中には更新の必要がないコンポーネントもいるので、それを制御するため shouldComponentUpdate を使う

### Fragment

React v15 まではルート要素を１つにする必要があった

```js
// React-v15
function App() {
  return (
    <div>
      <span>a</span>
      <span>b</span>
    </div>
  )
}
```

React v16 からは Fragment 構文を使って、以下のように書ける

```js
// React-v16
function App() {
  return (
    <>
      <span>a</span>
      <span>b</span>
    </>
  )
}

もしくは

import { Fragment } from 'react'
function App() {
  return (
    <Fragment>
      <span>a</span>
      <span>b</span>
    </Fragment>
  )
}
```

### ReactDOM.hydrate

SSR された DOM をクライアント側で再利用する場合に  
ReactDOM.render の代わりに ReactDOM.hydrate を使う  
v16 から明示的な API として追加された  
ハイドレーションとは足りない DOM を補う的な意味らしい

SPA のみならば、今まで通り ReactDOM.render を使う

### Context API

v16.3 から追加された機能  
State の管理を React で行えるもの  
State 管理を楽に行いたいけど、Redux を導入するまでも無い時とか良いかもしれない  
また Redux と同様のフローをとるため、その後の移行も楽そう

```react
const { Provider, Consumer } = React.createContext()

render() {
  return (
    <Provider
      data={{
        state: this.state,
        actions: {
          setSample: () => this.setState({ value: this.state.value })
        }
      }}
    >
      <Sample />
    </Provider>
  )
}

const Sample = () => (
  <Consumer>
    {({ state, actions }) => (
      <div>
        <span>{state.value}</span>
        <button onClick={actions.setSample} />
      </div>
    )}
  </Consumer>
)
```

### 良い設計方針

SFC(Stateless Functional Component)を目指す  
state を持たずに、props だけを持つコンポーネント

### パフォーマンスチューニング

- shouldComponentUpdate  
  prevProps と prevState を受け取り、現在の props と state と比較して、更新する必要があれば true を返す  
  デフォルトは true なので、props と state が変更されて更新する必要がなくても再レンダリングされる  
  props と state の値が同じでもオブジェクトが異なる場合も、再レンダリングが走る

- ループ内の要素に key 属性を付ける  
  静的解析で防げる場合が多いが、適切な一意の key を付けないと、ループ内の要素全体をレンダリングしてしまう
