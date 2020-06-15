## category

react

## titles

React

## description

当初は Web 向けライブラリとして開発された  
その後 React Native などが開発され、React≠Web と考えられるようになった  
そこで、Web 向けの機能は react-dom へ移行された  
現状、React はコンポーネントのツリー管理や Reconciler などがメイン機能でプラットフォームには依存していない

### Component と Element

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

- Component  
  props や state を持ち、複数もしくは単体の ReactElement をレンダリングする集合体

- Element  
  ReactComponent から createElement によって生成された仮想 DOM 構造体

### ライフサイクル

- Mounting

  1. constructor
  1. render
  1. DOM の更新
  1. componentDidMount

- Updating

  1. props もしくは state の更新がトリガー
  1. render
  1. DOM の更新
  1. componentDidUpdate

- Unmounting

  1. componentWillUnmount

- constructor  
  state の初期化やイベントハンドラーのバインドを行う  
  これらの処理が不要であれば、実装不要  
  setState 関数は呼び出さず、this.state で初期値をセットする

- render  
  クラスコンポーネントで唯一必須の関数  
  この関数は副作用のない純粋関数である必要がある  
  副作用は後述するライフサイクル関数で行う

- componentDidMount  
  Component が実 DOM としてマウント（実体化）された時に呼ばれる

- componentDidUpdate(prevProps, prevState, snapshot)  
  props と state が何らかの条件で変更し、実 DOM へ適用された後に呼ばれる

- componentWillUnmount  
  Component が実 DOM から削除される直前に呼ばれる

### 仮想 DOM と実 DOM の更新について

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
      /* 「test p」のHTML要素 */
    },
    oldNode: {
      /* 「test」のHTML要素 */
    },
    index: {
      /* 子の親ノード内でのインデックス */
    }
  },
  {
    newNode: {
      /* 「test span」のHTML要素 */
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

### Reconciler

仮想 DOM が抽出した差分を実 DOM にどう適用するかの処理を考える  
複数のプラットフォームに対応するため、Reconciler は React 特有の抽象層になっている  
つまり、複数のプラットフォームでも Reconciler は 1 つしか存在しない

### Renderer

仮想 DOM が抽出した差分を実 DOM にどう適用するかの実装を担当する  
複数のプラットフォームごとに実装は別となっている

### Fragment

React v15 まではルート要素を 1 つにする必要があった

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
State 管理を楽に行いたいけど、Redux を導入するまでもない時とか良いかもしれない  
また Redux と同様のフローをとるため、その後の移行も楽そう

<a href="https://kurosame-th.hatenadiary.com/entry/2018/11/05/193908" target="_blank">React の Context API について</a>

### React.lazy

動的にインポートされるコンポーネントを React.lazy でラップする  
レンダリングツリーの上位に React.Suspense を使うことで React.lazy でラップしたコンポーネントを読み込んでいる間、fallback 内の処理を行うように指定できる

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  )
}
```

### React.forwardRef

- ref  
  props を使わずに子要素を変更できる  
  子要素を命令型のコードを使って操作する

- forwardRef  
  コンポーネントが受け取った ref をそのコンポーネント内の別の DOM へフォワーディングするときに使う

```ts
const StaticLink = React.forwardRef((p, ref: React.Ref<Link>) => (
  <Link ref={ref} to={t.to} {...p} />
))
```

Glossary 内のコードでは React Router の Link は Material-UI の Tab でラップされている  
React から Link を操作したいので、Tab を使って ref をフォワーディングさせているのだと思う

### Error Boundaries

子コンポーネントツリーで発生したエラーをキャッチして処理できるコンポーネントを定義できる  
getDerivedStateFromError と componentDidCatch の 2 通りの方法がある  
getDerivedStateFromError で状態の更新を行うと、再レンダリングが行われるので、それを利用してフォールバック UI を表示させる実装が良い  
getDerivedStateFromError は副作用が許可されていないが、componentDidCatch は副作用が許可されているので componentDidCatch はエラーロギングなどの用途で使うべきである

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    logErrorToMyService(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

### React Hooks

<a href="https://kurosame-th.hatenadiary.com/entry/2018/11/07/193117" target="_blank">React Hooks について[Basic Hooks 編]</a>

### 良い設計方針

- components

  - Presentational components
  - 見た目への関心を持つ
  - 独自の DOM マークアップとスタイルを持つ
  - 基本的にステートレスだが、稀に独自の状態とその状態に対してのロジックを持つ
  - Flux のアクションやストアに依存しない
  - 独自以外の状態とロジックを持たない
  - props 経由で独自以外の状態とロジック（コールバック）を受け取る

- containers

  - Container Components
  - ロジック（振る舞い）への関心を持つ
  - DOM マークアップとスタイルは持たない
  - ステートフルで状態とロジックを持ち、それを Presentational components に渡す
  - React Redux の connect 関数などの上位コンポーネントから生成される

- メリット

  - 見た目のロジックの分離ができる
  - Presentational components の再利用性が高い
  - Presentational components で Storybook が導入しやすい

- デメリット
  - レンダリングされるコンポーネントが増えるので、memo 化が必須

### パフォーマンスチューニング

- 子コンポーネントの再レンダリングを防ぐ

  - React はコンポーネントの更新が発生した場合、そのコンポーネントをルートとするサブツリー上のすべてのコンポーネントを再レンダリングしようとする
  - ルートとなる親コンポーネントは当然再レンダリングが発生しているが、その子コンポーネントの再レンダリング有無は制御可能
  - 子コンポーネントの再レンダリングが発生する条件として、以下のいずれかを満たせば再レンダリングが発生する

    - props の更新
      - useCallback, useMemo で抑制できる
    - state の更新
      - これは再レンダリングされてよい
    - 親コンポーネントの再レンダリング
      - React.memo で抑制できる

  - useCallback  
    親コンポーネントから子コンポーネントに props でコールバック関数を渡している場合、そのコールバック関数に適用できる  
    useCallback はコールバック関数をメモ化する

  - useMemo  
    関数および関数の結果をメモ化する  
    ただし、関数の場合は`useMemo(() => func, [])`のように関数を返す関数を第 1 引数に渡す必要があり複雑  
    よって、関数の場合は`useCallback(func, [])`のほうがよい

  - PureComponent, React.memo

    - クラス型コンポーネントの場合は PureComponent  
      shouldComponentUpdate のデフォルトの挙動を現在の props と新 props を shallow な比較をして true か false を返すように変更できる
      - shouldComponentUpdate  
        prevProps と prevState を受け取り、現在の props と state を比較して、更新する必要があれば true を返す（比較ロジックは自分で実装する）  
        デフォルトは true なので props と state が変更されて更新する必要がなくても再レンダリングされる  
        props と state の値が同じでもオブジェクトが異なる場合、再レンダリングが走る
    - 関数型コンポーネントの場合は React.memo  
      子コンポーネント全体を React.memo で囲む  
      PureComponent とやっていることは同じ

- まとめ  
  React.memo, PureComponent, shouldComponentUpdate の目的は一緒  
  子コンポーネント自体をメモ化するので、子コンポーネントの props と state の更新がなければ再レンダリングしない  
  useCallback はコールバック関数自体をメモ化する  
  親コンポーネントが再レンダリングされた際はコールバック関数も再生成されるため、コールバック関数を子コンポーネントに渡していた場合、React.memo だけだと毎回 props が変更されているとみなされ、再レンダリングが行われてしまう  
  React.memo と useCallback を組み合わせて使用することで再レンダリングを抑制できる  
  useMemo は useCallback と同様に props が値の場合に React.memo と組み合わせて使うのがよい

- ループ内の要素に key 属性を付ける  
  静的解析で防げる場合が多いが、適切な一意の key を付けないと、ループ内の要素全体をレンダリングしてしまう
