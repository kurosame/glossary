## category

react

## titles

Next.js

## description

<a href="https://qiita.com/kurosame/items/68159bf1c900915bdba1" target="_blank">はじめての Next.js（環境構築）</a>

<a href="https://kurosame-th.hatenadiary.com/entry/2021/08/04/150426" target="_blank">静的サイトの Next.js を SPA でルーティングさせる</a>

### App Router

fetch について

- 標準の fetch にパッチを当てて拡張している
- 取得したデータを自動でキャッシュし、任意のタイミングで Revalidate（データ再取得・キャッシュ更新）が可能

レンダリングについて

- Static Rendering
  - Next.js のデフォルト
  - revalidate なしは SSG 相当
  - revalidate ありは ISR 相当
- Dynamic Rendering
  - SSR 相当

### page,layout,template について

App Router で導入された固有の規約を持ったファイル

- page
  - Server Component もしくは、Client Component で構成された page コンポーネント
- layout
  - 複数のページ間で共有されるコンポーネント
  - 同階層にある page コンポーネントをラップする
  - ページ間のナビゲーション時に状態を保持し、layout コンポーネントは再レンダリングを行わない
    - page コンポーネントのみが再レンダリングされる
  - ルートの layout コンポーネントは必須で、html と body を含む必要がある
- template
  - layout と同じ用途で使うが、以下の違いがある
    - template コンポーネントは、ページ間のナビゲーション時に状態を保持せず、新しい状態を生成する
    - よって、ページ間を移動するたびに再レンダリングが行われる

### Streaming SSR

SSR のレンダリング結果を Streaming にブラウザに返し、表示する  
（レンダリング中に data fetch できるということ）  
従来はすべてレンダリングされた後に結果を渡していた

- React
  - React 18 で追加された
  - Suspense の機能が前提となる
    - サスペンドされたら、そこまでのレンダリング結果を出力し、サスペンドが解除されたら Streaming SSR を再開する

レンダリング中に data fetch するので、data fetch 周りのロジックがサーバーとクライアントの両方に必要になった  
⇒ リクエストの重複などの懸念がある

- React
  - React Server Components により data fetch の責務をサーバーに集約できる
    - クライアントは data fetch を伴わないレンダリングになるため、リクエストの重複が発生しない

### Partial Pre Rendering（PPR）

Static Rendering されたページ内の一部を Dynamic Rendering にすることが可能になる  
ページ内で部分的に静的レンダリング・動的レンダリングの切り替えが可能

SSG/ISR されたページの一部を SSR にしたり、Streaming SSR 実行中の Suspense が fallback している UI 部分を SSG/ISR にするイメージ

PPR 登場以前は、ページ単位での静的レンダリング・動的レンダリングのみが可能だった

### Cache

Next.js には 4 種類のキャッシュがある

Next.js v14 以前は、以下 4 つすべてのキャッシュがデフォルトで有効だったが、  
Next.js v15 以降は、Data Cache と Router Cache に関しては、デフォルトで無効と仕様変更されている

- Request Memoization（サーバー機能）
  - React は fetchAPI を拡張し、同じ URL とオプションを持つリクエストを自動的にメモ化する
    - 同じリクエストの重複は排除される
    - そのリクエストが生きている間のみ有効
    - リクエストのメモ化は React の機能であり、Next.js の機能ではない
  - キャッシュ無効化手順
    ```ts
    const { signal } = new AbortController()
    fetch(url, { signal })
    ```
- Data Cache（サーバー機能）
  - Next.js は fetchAPI を拡張し、各リクエストの結果をキャッシュできる
    - メモリが生きている間のみ有効
      - ここで言うメモリはサーバー上のメモリなので、明示的にキャッシュをクリアしたり、サーバーを再起動しない限り、キャッシュは永続化される
      - また、異なるユーザーに対してもキャッシュは共有される
    - リクエストの結果のキャッシュ化は、Next.js の機能
  - キャッシュ有効化手順
    - fetch ごとに個別に有効化する場合
      ```ts
      fetch(url, { cache: 'force-cache' })
      ```
    - Route Segment Config（page,layout）ごとに有効化する場合
      ```ts
      export const dynamic = 'force-static'
      export const fetchCache = 'default-cache'
      ```
  - キャッシュ無効化手順
    - fetch ごとに個別に無効化する場合
      ```ts
      fetch(url, { cache: 'no-store' })
      ```
    - Route Segment Config（page,layout）ごとに無効化する場合
      ```ts
      export const dynamic = 'force-dynamic'
      ```
  - ベストプラクティス
    - キャッシュは無効化しない方がパフォーマンス的には良い
    - アクセストークンを使ったユーザー個別のデータ取得などは、Dynamic Rendering にせざるを得ないが、`force-dynamic`で Route 全体を Dynamic Rendering にするのではなく、PPR で部分的に Dynamic Rendering へ切り替えるのが良い
- Full Route Cache（サーバー機能）
  - Next.js はビルド時にルートを自動的にレンダリングし、キャッシュする（静的サイトレンダリング）
    - これにより、サーバー上で毎回レンダリングする代わりにキャッシュされたルートを返すため、ページの読み込みが高速化される
    - デフォルトで永続的なキャッシュのため、キャッシュの無効化はデータの再検証や再デプロイによって行える
  - キャッシュ無効化手順
    ```ts
    export const dynamic = 'force-dynamic'
    // or
    export const revalidate = 0
    ```
  - ベストプラクティス
    - キャッシュは無効化せず、Static Rendering を使うのが良い
    - `cookies`など Dynamic Functions を呼んでいる箇所は、Dynamic Rendering にせざるを得ないが、`force-dynamic`で Route 全体を Dynamic Rendering にするのではなく、PPR で部分的に Dynamic Rendering へ切り替えるのが良い
- Router Cache（クライアント機能）
  - Next.js は RSC Payload（RSC のレンダリング結果と RSC からクライアントへの Props）を個別のルートごとにキャッシュする
    - ユーザーがルート間を移動する際、訪れたルートセグメントをキャッシュし、ユーザーが移動する可能性があるルートを事前に fetch する
    - ユーザーのナビゲーション体験が向上する
    - キャッシュの持続期間はセッションによって決まり、セッションはナビゲーション間は維持されるが、ページのリフレッシュで破棄される
      - 時間ベースでのキャッシュ無効化も可能
  - キャッシュ有効化手順
    ```ts
    const nextConfig = {
      experimental: {
        staleTimes: {
          dynamic: 10, // default: 30
          static: 150 // default: 300
        }
      }
    }
    ```
  - キャッシュ無効化手順
    - 明示的なオプションによる無効化は不可能なため、以下の方法でキャッシュをクリアできる
      - クライアント（Client Component）
        ```ts
        router.refresh()
        ```
      - サーバー（Server Actions）
        ```ts
        revalidatePath('/blog/post')
        revalidateTag('post')
        cookies().set('name', 'value')
        cookies().delete('name')
        ```
        - Router Cache はクライアント側のキャッシュのため、あるユーザーがサーバー側で revalidatePath を実行しても別のユーザーのキャッシュが削除されるわけではない
