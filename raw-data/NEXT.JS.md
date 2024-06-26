## category

react

## titles

Next.js

## description

<a href="https://qiita.com/kurosame/items/68159bf1c900915bdba1" target="_blank">はじめての Next.js（環境構築）</a>

<a href="https://kurosame-th.hatenadiary.com/entry/2021/08/04/150426" target="_blank">静的サイトの Next.js を SPA でルーティングさせる</a>

### App Router

- fetch
  - 標準の fetch にパッチを当てて拡張している
  - 取得したデータを自動でキャッシュし、任意のタイミングで Revalidate（データ再取得・キャッシュ更新）が可能

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
  - Next.js は fetchAPI を拡張し、各リクエスト独自のキャッシュを保持できる
    - メモリが生きている間のみ有効
    - リクエストのキャッシュ化は、Next.js の機能
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
          dynamic: 30
        }
      }
    }
    ```
  - キャッシュ無効化手順
    - 明示的なオプションによる無効化は不可能なため、以下の方法でキャッシュをクリアできる
      ```ts
      router.refresh()
      ```
