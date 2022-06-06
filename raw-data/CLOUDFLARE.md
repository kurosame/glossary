## category

server

## titles

Cloudflare

## description

<a href="https://zenn.dev/kurosame/articles/ebae865d729a38" target="_blank">Cloudflare Pages&Workers を使う（Vercel からの移行）</a>

### Workers

Edge コンピューティングサービス

Workers の実行環境は V8 の JS エンジン  
Node.js ではない

zero cold starts について  
Vercel や Netlify の Serverless Functions は Lambda をベースに動いており、ランタイムはコンテナー環境である  
コンテナーでは実際の処理が開始されるまでに初期化や起動処理などが入り、これが原因でコールドスタートが発生する  
Workers はコンテナーではなく、V8 でも使われている isolate を使っている

### Service bindings

Workers 間の通信を容易にする API  
HTTP リクエストをインターネットを介さずに別 Worker へ送信できる

### Durable Objects

ステートフルでサーバレスなアプローチを提供する

Workers KV はデータの結果整合性を採用しているため、複数の Edge から同タイミングで同一キーのリクエストを受け取った場合、値を後続リクエストが上書きしてしまうリスクがある

Durable Objects は Edge 全体でのトランザクションとデータの即時一貫性を保証しているため、常に適切な順番でデータが処理され、矛盾が生じない

よって、Workers KV は静的コンテンツの管理に適し、Durable Objects は動的コンテンツの管理に適している

### R2

R2 は Storage で、Amazon S3 の競合

- （S3 より）安い
  - 無料枠がでかい
  - egress（下り）料金が無料
    - R2 から配信されるコンテンツの転送料金が無料ということ
- 開発体験の良い Workers から R2 を簡単に操作できる

ユースケース

1. 画像配信
   - R2 を画像のストレージにする
   - Workers で画像配信
   - Workers KV で画像をキャッシュ
1. D1 の DB のスナップショットを R2 に定期的にバックアップ

### D1

D1 は CDN Edge 上に SQLite ベースの RDB サーバを提供するサービス

- 各 Edge がリードレプリカを持っている
  - マスター DB に更新があったら、各 Edge のリードレプリカに自動でレプリケーションを行ってくれる
