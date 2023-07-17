## category

react

## titles

React

## description

当初は Web 向けライブラリとして開発された  
その後 React Native などが開発され、React≠Web と考えられるようになった  
そこで、Web 向けの機能は react-dom へ移行された  
現状、React はコンポーネントのツリー管理や Reconciler などがメイン機能でプラットフォームには依存していない

<a href="https://kurosame-th.hatenadiary.com/entry/2022/01/19/174253" target="_blank">React DnD v11（古いバージョン）の実装</a>

<a href="https://zenn.dev/kurosame/scraps/9333baf5423339" target="_blank">React v18 概要</a>

<a href="https://zenn.dev/kurosame/articles/78b7b154b90ac7" target="_blank">React のチャートライブラリ選定</a>

<a href="https://zenn.dev/kurosame/scraps/333ce89c557fb3" target="_blank">フロントエンドのディレクトリ構成を考察</a>

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
  1. DOM の更新
  1. componentDidMount

- Updating

  1. props もしくは state の更新がトリガー
  1. render
  1. DOM の更新
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

SSR された DOM をクライアント側で再利用する場合に ReactDOM.render の代わりに ReactDOM.hydrate を使う  
つまり、クライアント側でのレンダリングをスキップできる

Hydration はページ内のすべての JS をダウンロード・実行し、onClick などで渡されたイベントリスナーを DOM に登録する

クライアント側の仮想 DOM と SSR された DOM を検証し、不一致の場合は Hydration を中止する  
この場合、DOM を破棄し、最初からレンダリングを行う  
（この際、ブラウザのコンソールには警告が表示される）

v16 から明示的な API として追加された  
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

### ref と React.forwardRef

- ref

  - オブジェクト、DOM 要素、インスタンスを持つコンポーネントに ref が使用できる
    - インスタンスを持たないオブジェクト（関数コンポーネントなど）は ref が使えない（エラーになる）
  - オブジェクトの ref は、`useRef(1)`のようにコンポーネント内で定義し、その ref をどこにも付与せずに変数のように扱うもの
    - マウントされてからアンマウントされるまでに利用できる変更可能なオブジェクトとなる
  - DOM 要素の ref は、HTML 要素に ref 属性を付与する
    - Ref.current はその DOM 要素を保持している
    - マウントされるまでは`useRef(null)`のように null 等で明示的に初期値を設定可能
  - クラスコンポーネントの ref は、クラスコンポーネントに ref 属性を付与する
    - Ref.current はそのクラスのインスタンスを保持しているので、そのコンポーネントの関数やプロパティにアクセスできる
  - useState は state が変わるたびに再レンダリングされるが、useRef は値が変わっても再レンダリングされない

- forwardRef

  - コンポーネントが受け取った ref をそのコンポーネント内の別の DOM へフォワーディングするときに使う
  - 関数コンポーネントでは ref が使えない
    ```ts
    const ref = useRef(null)
    // 以下はエラー
    return <FC ref={ref} />
    ```
  - ref を props で渡して、子要素に ref を適用することは可能
    - ただし、ref 以外の命名にする必要がある
    ```ts
    const FC2 = ({ _ref }) => {
      console.info({ FC2: _ref.current }) // div要素を保持
      return <div ref={_ref}>test2</div>
    }
    const ref = useRef(null)
    return <FC2 _ref={ref} />
    ```
  - forwardRef を使えば、`_ref`のような名前避けを回避できる
    ```ts
    const FC3 = React.forwardRef((p, ref) => {
      console.info({ FC3: ref.current }) // div要素を保持
      return (
        <div ref={ref} {...p}>
          test3
        </div>
      )
    })
    const ref = useRef(null)
    return <FC3 ref={ref} />
    ```

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

### useEvent

2022/05/10 時点では RFC の提案段階の機能  
⇒ この提案はクローズされた  
⇒ 再検討・ブラッシュアップされる

以下のイベントハンドラーは現在の text を読み取る必要がある

```ts
function Chat() {
  const [text, setText] = useState('')

  const onClick = () => {
    sendMessage(text)
  }

  return <SendButton onClick={onClick} />
}
```

SendButton を React.memo でメモ化する場合、onClick はレンダリングのたびに異なる関数識別子を持つため、メモ化は破綻する  
この場合、onClick を useCallback でラップすることによりメモ化が機能する

```ts
function Chat() {
  const [text, setText] = useState('')

  const onClick = useCallback(() => {
    sendMessage(text)
  }, [text])

  return <SendButton onClick={onClick} />
}
```

ただし、上記は text が変更されるたびに再レンダリングされるため、不要なレンダリングが発生している  
この問題を useEvent が解決する

```ts
function Chat() {
  const [text, setText] = useState('')

  const onClick = useEvent(() => {
    sendMessage(text)
  })

  return <SendButton onClick={onClick} />
}
```

useEvent は依存配列を受け取らない  
onClick 内で参照してる状態（text）は、onClick 実行時の状態で実行される

useEvent の RFC は以下  
<a href="https://github.com/reactjs/rfcs/pull/220" target="_blank">RFC: useEvent</a>

- useEvent の名前が微妙（広義すぎる？）
- useCallback を改良して、最新の状態を参照する機能を追加するのはどうか
- useRef を使うのが適しているのでは？
- 既存の useCallback の 90%ぐらいを useEvent で置き換えられそう（Dan）
- 長期的に見てすべてのイベントハンドラーを useEvent でラップするのは理にかなっている（Dan）
- useEvent は依存配列がない分、useCallback よりメモリ消費が少ない（Dan）

### use(`Promise`)

2022/10/19 時点では RFC の提案段階の機能

以下のように使用する

```js
function Note({ id, shouldIncludeAuthor }) {
  const note = use(fetchNote(id))
  let byline = null
  if (shouldIncludeAuthor) {
    const author = use(fetchNoteAuthor(note.authorId))
    byline = <h2>{author.displayName}</h2>
  }
  return (
    <div>
      <h1>{note.title}</h1>
      {byline}
      <section>{note.body}</section>
    </div>
  )
}
```

- use には Promise が渡せ、その戻り値は Promise の中身になる
- 既存の hook と違い、条件分岐内で使用できる
  - use(`Promise`)は実行されても、されなくても良い
- Promise のエラーは Error Boundary でキャッチする想定
- コンポーネントがレンダリングされるたびに use(`Promise`)が呼ばれると思う
  - Promise の結果をキャッシュできる必要がある

### コンポーネントの Props で T 型を使いたい

```ts
type Props<T> = {
  onChange: (v: T) => void
}

export const Button = <T>({ onClick }: Props<T>): JSX.Element => {}

// 呼び出し元は以下の書き方でT型の実態を指定できる
// <Radio<OriginalType> onClick={setText} />
```

### Data fetch 観点での useEffect と Suspense について

useEffect に渡された関数は画面レンダリング後に実行される  
たとえば Data fetch を渡すと画面レンダリング後に実行されることになる  
（画面レンダリング前に関数を実行することができる useLayoutEffect という Hook はある）

Suspense は Promise（Data fetch など）が解決されるまでは fallback の内容を表示し、Promise が解決されると画面レンダリングする

よって、Suspense 内のコンポーネントで Data fetch を行う useEffect を書いた場合、Suspense が機能しない（画面レンダリング後に Data fetch を行うので Suspense を使う意味がない）

ただし、これは useEffect を使って Data fetch を行う場合のみであり、useEffect と Suspense が共存できないということではない  
React.lazy などの非同期コンポーネントをロードする際には、Suspense と useEffect が共存して問題なく機能する

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
    - state の更新
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
        prevProps と prevState を受け取り、現在の props と state を比較して、更新する必要があれば true を返す（比較ロジックは自分で実装する）  
        デフォルトは true なので props と state が変更されて更新する必要がなくても再レンダリングされる  
        props と state の値が同じでもオブジェクトが異なる場合、再レンダリングが走る
    - 関数型コンポーネントの場合は React.memo  
      子コンポーネント全体を React.memo で囲む  
      PureComponent とやっていることは同じ  
      なお、React.memo はクラス型コンポーネントにも使用できる

  - まとめ  
    React.memo, PureComponent, shouldComponentUpdate の目的は一緒  
    子コンポーネント自体をメモ化するので、子コンポーネントの props と state の更新がなければ再レンダリングしない  
    useCallback はコールバック関数自体をメモ化する  
    親コンポーネントが再レンダリングされた際はコールバック関数も再生成されるため、コールバック関数を子コンポーネントに渡していた場合、React.memo だけだと毎回 props が変更されているとみなされ、再レンダリングが行われてしまう  
    React.memo と useCallback を組み合わせて使用することで再レンダリングを抑制できる  
    useMemo は useCallback と同様に props が値の場合に React.memo と組み合わせて使うのがよい

- ループ内の要素に key 属性を付ける
  - 静的解析で防げる場合が多いが、適切な一意の key を付けないと、ループ内の要素全体をレンダリングしてしまう
  - ループの index を key に使うのは NG
    - ループ内の要素を削除する機能があった場合、key を index にしてキャッシュしてしまうと、要素削除後の index と差異が生まれ、間違ってキャッシュされた要素を表示する可能性がある

### 状態管理ライブラリ比較

- useState + props
  - 親から孫に props 伝達している場合、親がレンダリングされると孫と props を孫に渡しているだけの子もレンダリングされるため、パフォーマンス的に不利
- useContext
  - コンテキストを利用しているコンポーネントのみレンダリングされるため、パフォーマンス的に有利
  - パフォーマンス改善を目的に props 経由からコンテキスト経由に移行すると、コンテキストが肥大化し、設計が難しくなる
- Redux
  - 外部に 1 つだけの Store という State の集約を持つ
  - useSelector を使って、必要な State を Store から持ってくる
  - Store が更新されても useSelector で取得している部分以外であれば、そのコンポーネントのレンダリングは行われない
  - useSelector の型に Store 全体の State を設定するため、利用しない State であっても意識させられる
- Recoil
  - State を Atom という単位で分割して持てる
  - 各コンポーネントは Atom から State を取得する
  - 参照している Atom が更新された場合のみそのコンポーネントをレンダリングする
- useSWR
  - 目的が data fetching からの State 保持が主であれば、キャッシュもできるので強力なライブラリ
  - State 管理のアーキテクチャとしては、Recoil に思想が近い
  - useSWR 単体で状態管理が自己完結しているので、Redux や Recoil などの他の状態管理ライブラリとの併用は考えづらい

### React を書くときに考えること

以下の日本語訳  
<a href="https://github.com/mithi/react-philosophies" target="_blank">react-philosophies</a>

1. 必要最低限

   1. コンピューターはあなたより賢いと理解する

      1. eslint-plugin-react-hooks のルールを入れる
      1. `'use strict';`の有効化
      1. eslint-plugin-react-hooks/exhaustive-deps の警告/エラーを有効化
      1. コンポーネントを map でループする時は key を指定する
         - eslint-plugin-react/jsx-key
      1. hook はトップレベルで呼ぶ（ループ、条件、ネストされた関数で hook を呼ばない）
         - eslint-plugin-react-hooks/rules-of-hooks
      1. `Can't perform state update on unmounted component`という警告の理解

         - <a href="https://github.com/facebook/react/pull/22114" target="_blank">Remove the warning for setState on unmounted components</a>

           - マージされているから、現在、この警告は出ていない
           - 要約すると、アンマウントされたコンポーネントに setState などのアクセスをすると上記の警告を出していたが、以下のような誤検知の回避が難しいので警告を出ないようにしたいという提案

             ```js
             // 以下のコードはunsubscribeし忘れるとメモリリークとなる
             // （アンマウントされてもsubscribeしているから）
             useEffect(() => {
               function handleChange() {
                 setState(store.getState())
               }
               store.subscribe(handleChange)
               return () => store.unsubscribe(handleChange)
             }, [])

             // 以下のコードはメモリリークは起きていない
             // にもかかわらず、POST中にアンマウントされると警告が出てしまう
             async function handleSubmit() {
               setPending(true)
               await post('/some_api') // POST中にアンマウントされることがある
               setPending(false)
             }
             ```

      1. アプリケーションに Error Boundaries を設定し、必要に応じて Sentry や Datadog などにエラー内容を蓄積する
         - componentDidCatch を実装した ErrorBoundary コンポーネント的な
      1. コンソールのエラーや警告はちゃんと確認する
      1. Tree Shaking を意識する
      1. Prettier を使う
      1. TypeScript を使う
      1. Code Climate などのコードの静的解析ツールを検討する
      1. Next.js は良い

   1. コードは必要悪である

      1. たとえば以下のライブラリが本当に必要か考えてみる
         - Redux
           - React 単体でも状態管理できる
         - Apollo Client
           - バンドルサイズが大幅に増える
           - React Query や SWR などの軽量ライブラリも検討するとよい
         - Axios
           - Axios は機能がリッチなので、使いこなせていない場合は Redaxios などの軽量な fetch のラッパーを検討する
         - decimal.js
           - big.js などの他の軽量なライブラリを検討する
         - Lodash / Underscore.js
           - ほとんどの機能は自分で実装できる
             - <a href="https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore" target="_blank">You don't (may not) need Lodash/Underscore</a>
         - Moment.js
           - 使う必要ないかも
             - <a href="https://github.com/you-dont-need/You-Dont-Need-Momentjs" target="_blank">You don't (may not) need Moment.js</a>
         - React Context によるテーマ（ライトモード、ダークモード）の設定
           - ThemeProvider ではなく、テーマは CSS 変数を使っても実装できる
             - <a href="https://epicreact.dev/css-variables" target="_blank">Use CSS Variables instead of React Context</a>
         - JavaScript
           - CSS で代替できるかも
             - <a href="https://github.com/you-dont-need/You-Dont-Need-JavaScript" target="_blank">You Don't Need JavaScript</a>
      1. コードの削減（React 関係なく JS を使って）
         - 複雑な条件をシンプルに書く方法を覚える
           - <a href="https://github.com/sapegin/washingcode-book/blob/master/manuscript/Avoid_conditions.md" target="_blank">Avoid conditions</a>
         - map、filter、find、findIndex、some などの高階関数を利用する
      1. YAGNI
         - You ain't gonna need it（機能は必要になるまで実装しない）

   1. コードを見つけた時より良いものにする
      - 悪いコードはその場で修正し、無理なら TODO にして見える化しておく
   1. もっとうまくできる
      - useEffect や useCallback などの第 2 引数の依存関係の配列に setState（useState からの）や dispatch（useReducer からの）は不要
      - useMemo や useCallback に依存関係の配列がない場合、間違って使用している可能性がある
      - useContext をカスタムフックでラップして、それを使うようにすると、各コンポーネントで useContext を import する処理が省ける
      - コーディングする前にコンポーネントがどのように使用されるかを考える
        - README Driven Development（README 駆動開発）というものがあるらしい

1. 幸せのための設計
   1. 冗長な状態を削除し、状態管理の複雑さを回避する
   1. バナナとジャングル全体を掌握しているゴリラではなく、バナナだけを渡します
      - props で渡すのはプリミティブ型データを好むということ
      - これを行うと 2 つのコンポーネント間の依存度が低くなる
   1. コンポーネントは小さく・シンプルに保つ
      - 単一責任の原則（Single responsibility principle）
      - コンポーネントが単一責任かどうかを確認するには、そのコンポーネントの役割を完結に一言で説明できるかどうかで判断できる
   1. 重複は間違った抽象化よりもはるかにコストが低い
      - 早すぎる・不適切な一般化は避ける
      - 一般化が難しそうであれば、重複で良いということ
   1. Context はすべての状態を共有するためのものではない
   1. useEffect は小さく独立したものに分割する
   1. hook とヘルパー関数にロジックを抽出する
   1. 大きなコンポーネントを避けるため、logical コンポーネントと presentational コンポーネントに責務を分けた方が良い
   1. useCallback、useMemo、useEffect の依存関係はプリミティブ型データが良い
   1. useCallback、useMemo、useEffect に多くの依存関係を配置しない
   1. useState が多い場合、useReducer の使用を検討する
   1. Context はアプリ全体でグローバルである必要はない
      - 境界づけられたコンテキスト
1. パフォーマンスのヒント
   1. 遅い可能性があるなら推測せずにベンチマークで証明する
      - Chrome 拡張の React Developer Tools のプロファイラー利用する
   1. useMemo はコストが高い計算のみに使用する
   1. React.memo、useMemo、useCallback を使用し、再レンダリングを減らす
      - これらの関数の依存関係は少なく、プリミティブ型データが良い
   1. React.memo、useMemo、useCallback を使用した場合、ちゃんと機能しているか確認する（再レンダリングが防げているか）
   1. 再レンダリングを修正する前に遅いレンダリングを修正する
   1. 状態の定義を使用している場所に近づけるとコードの可読性が上がり、アプリが高速になる
      - 関連する状態とロジックをできるだけ同じ場所に実装する
   1. Context は論理的に分離する必要があり、1 つの Context で多くの値を配置しない
      - Context の値が変更されると、その変更された値を使用していなくても再レンダリングされる（Context の別の値を参照している場合）
   1. state と dispatch 関数を分離することで、Context を最適化できる
   1. React.lazy を使った動的 import とバンドルコード分割を理解する
   1. 大きなリストは react-virtual などを使ってレンダリングコストを減らす
   1. バンドルサイズが小さければ、アプリは高速になる
      - source-map-explorer や@next/bundle-analyzer などで計測できる
   1. フォームを開発する場合は、react-hook-form が良い
1. テストの原則
   1. テストは常にソフトウェアの使用方法に似ている必要がある
   1. 実装の詳細をテストしていないことを確認する
      - ユーザーの振る舞いをテストする
      - ユーザーがアプリケーションを使えるかどうかをテストする
   1. 自分のテストで修正したコードがアプリを壊していないことを確認できなかったのであれば、テストは（唯一の）仕事をしていない
   1. 同じユーザーの行動のコードをリファクタリングする時にテストをほとんど変更しなければ、良いテストを実装している
      - ユーザーの振る舞いのテストがちゃんとできている
   1. 100%のコードカバレッジは不要
      - テストは生産性を上げるために存在する
      - テストの維持に執着すると、開発速度が遅くなる
   1. Jest、React Testing Library、Cypress、Mock Service Worker(MSW)を使うのが良い
