## category

server

## titles

Vercel

## description

<a href="https://zenn.dev/kurosame/scraps/4049934aa634fe" target="_blank">Vercel 移行メモ</a>

### Serverless Functions

バックエンドは AWS Lambda  
コンテナーで動くので、コールドスタート問題がある  
Node.js、Go、Python などをサポート

### Edge Functions

ランタイムは V8 の JS エンジン（Cloudflare Workers で動いている）  
よって、Node.js の API はサポートされていない  
コールドスタート問題は軽減され、高速なコールドブートを実現できる

### Edge Network Cache

Web ページなどの静的コンテンツをキャッシュする

### Edge Middleware

Network Cache よりも前段に位置するスクリプト  
URL の書き換えやレスポンスヘッダーの追加・削除などを行える

### Edge Runtime

Edge Functions のコンテキストをローカルにエミュレートできる  
ローカル上（ブラウザ・ターミナル）で Edge Functions のテストが可能になる

Edge Runtime は Node.js を使用してプロセスを生成し、ローカル上で Edge Functions を実行する  
ただし、Edge Functions では Node.js の API は使えないため、Edge Runtime でも公開されない  
Web 標準の API（fetch など）は Edge Runtime 上でも公開される

### Edge Config

KVS（Key-Value Store）  
Environment Variables（環境変数）の代替としても使える  
Vercel の環境変数は、適用させるのにデプロイが必要だが、Edge Config は不要

Read は速いが、Write は遅い  
よって、更新頻度が低く、参照頻度が高いデータ向き

### Storage

- Vercel KV
  - Redis 互換の KVS
  - 技術的には Upstash が使われている
    - Upstash はサーバレスな Redis を提供するサービス
  - Edge Config より、Read は遅く、Write は速い
- Vercel Postgres
  - サーバーレスの PostgreSQL データベース
  - 技術的には Neon が使われている
    - Neon はフルマネージドかつサーバーレスな PostgreSQL を提供するサービス
  - Edge Functions や Next.js、Nuxt.js、SvelteKit などのフレームワークでシームレスに実装できるように設計されている
- Vercel Blob
  - 画像や動画などのファイル用ストレージ
  - 技術的には Cloudflare R2 が使われている
- Edge Config
  - 上記参照
