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

- Request Memoization（サーバー機能）
  - React は fetchAPI を拡張し、同じ URL とオプションを持つリクエストを自動的にメモ化する
    - 同じリクエストの重複は排除される
    - そのリクエストが生きている間のみ有効
    - リクエストのメモ化は React の機能であり、Next.js の機能ではない
- Data Cache（サーバー機能）
  - Next.js は fetchAPI を拡張し、各リクエスト独自のキャッシュを保持できる
    - メモリが生きている間のみ有効
    - リクエストのキャッシュ化は、Next.js の機能
- Full Route Cache（サーバー機能）
  - Next.js はビルド時にルートを自動的にレンダリングし、キャッシュする
    - これにより、サーバー上で毎回レンダリングする代わりにキャッシュされたルートを返すため、ページの読み込みが高速化される
    - デフォルトで永続的なキャッシュのため、キャッシュの無効化はデータの再検証や再デプロイによって行える
- Router Cache（クライアント機能）
  - Next.js は RSC Payload（RSC のレンダリング結果と RSC からクライアントへの Props）を個別のルートごとにキャッシュする
    - ユーザーがルート間を移動する際、訪れたルートセグメントをキャッシュし、ユーザーが移動する可能性があるルートを事前に fetch する
    - ユーザーのナビゲーション体験が向上する
    - キャッシュの持続期間はセッションによって決まり、セッションはナビゲーション間は維持されるが、ページのリフレッシュで破棄される
      - 時間ベースでのキャッシュ無効化も可能
