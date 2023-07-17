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

### Server Actions

Server Actions はサーバーコンポーネントとクライアントコンポーネントのどちらでも機能する

クライアントコンポーネント内では、Server Actions は定義できないが、別ファイルに定義した Server Actions を import することはできる  
import した Server Actions はフォームアクション（`<form action={serverActions}>`）などを利用して、ユーザーのインタラクションに応じて実行することが可能
