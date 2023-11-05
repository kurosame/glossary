## category

react

## titles

React Server Components
RSC

## description

React Server Components はサーバーサイドのみで実行される  
一部のコンポーネントはサーバ側でレンダリングし、それ以外はクライアント側でレンダリングするみたいな世界観  
ただし、クライアントコンポーネントはサーバサイドコンポーネントを import できない

クライアントコンポーネントの children や他のクライアントコンポーネントへの props にサーバサイドコンポーネントを渡すことは可能  
この場合、渡されるサーバサイドコンポーネントは事前にサーバーサイドでレンダリングされた HTML を渡すイメージ

たとえば、以下の例だと、CounterServer はサーバーでレンダリングされ、HTML を返すだけの関数となる  
（HTML 化により、クライアントでは不要なコンポーネント（以下の例だと`Btn`）も削除されるため、バンドルサイズが減る）  
（また、Btn コンポーネントの処理も無くなるのでパフォーマンスも良い）  
CounterClient はそのままクライアントへ送信され、クライアントで実行され、レンダリングされる

```ts
// サーバー実行用React
export default function CounterServer(count, setCount) {
  return (
    <div>
      <p>You clicked {count} times</p>
      <Btn onClick={() => setCount(count + 1)}>Click me</Btn>
    </div>
  )
}

// クライアント実行用React
;('use client')

export default function CounterClient() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

RSC は 2023/07 時点でまだ安定版ではなく、React Canary として機能提供されている  
破壊的変更も多いため、React 単体で RSC を使うことは想定されず、基本的には Next.js などのフレームワークを経由して使うことになる  
ただ、将来的に安定版になっても自前でサーバー処理を実装する必要があるため、Next.js などを使ったほうが楽だろう

### RSC のメリット

- サーバーサイドでレンダリングするので、クライアントのバンドルサイズは軽くなる
  - サードパーティパッケージをバンドルファイルに含める必要がないから
- DB、GraphQL エンドポイント、ファイルシステムなどのサーバーサイドのリソースに直接アクセスできる
  - サーバー側で API の実装が不要になるケースもある
  - コンポーネントのレンダリングも速くなる
- コンポーネントで async/await が利用可能

### RSC でできないこと

- useState や useEffect などのフックは使えない

### SSR との違い

- RSC
  - コンポーネント単位のレンダリング
  - クライアントは React コンポーネントで受け取る
- SSR
  - ページ単位のレンダリング
  - クライアントは HTML で受け取る
    - クライアント用のコンポーネントを無理やりサーバーで実行し、HTML にシリアライズしている

RSC と SSR を組み合わせて使うことも可能

- RSC あり、SSR あり
  - サーバーコンポーネントを RSC で実行
  - クライアントコンポーネントを SSR で実行
- RSC あり、SSR なし
  - サーバーコンポーネントを RSC で実行
  - クライアントコンポーネントはクライアントで実行
- RSC なし、SSR あり
  - クライアントコンポーネントを SSR で実行
- RSC なし、SSR なし
  - クライアントコンポーネントはクライアントで実行

### 再レンダリングについて

クライアントコンポーネントの再レンダリングは普通に React で可能だが、サーバーコンポーネントの再レンダリングは React では不可能  
サーバーコンポーネントの再レンダリングは、Next.js などのフレームワークが担当することになる

### 入れ子の Server Component（SC）と Client Component（CC）について

以下の`->`は`親 -> 子`の意味

- `SC1 -> CC1 -> SC2 -> CC2`
  - SC2 は CC1 から import されて呼び出されているので、CC となる
  - よって、上記は実質、`SC -> CC -> CC -> CC`となる

トラブルシューティング

- `SC1 -> CC1 -> SC2 -> CC2`のケースで`SC2`が async コンポーネントの場合、エラー
  - SC2 は CC1 から呼ばれているため、CC となり、CC は async コンポーネントをサポートしていないため
  - 解決法は、SC2 を SC1 で import し、CC1 へ props もしくは children として渡す

### PHP の再来？

プログラムがサーバー側で実行され、その後クライアント側で実行されるという観点では RSC と PHP は似ている

- RSC
  1. サーバーで React コンポーネントがレンダリングされ、クライアント用の React コンポーネントが出力される
  1. クライアントへ送信され、ブラウザで実行される
- PHP
  1. サーバーで実行され、HTML/JS が出力される
  1. クライアントへ送信され、ブラウザで実行される
