## category

server

## titles

Vercel

## description

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
