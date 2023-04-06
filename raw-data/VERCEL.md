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

### Edge Middleware

Edge Functions 上で機能するスクリプト  
リクエストが処理される前段で実行される  
URL の書き換えやレスポンスヘッダーの追加・削除などを行える

### Edge Runtime

Edge Functions のコンテキストをローカルにエミュレートできる  
ローカル上（ブラウザ・ターミナル）で Edge Functions のテストが可能になる

Edge Runtime は Node.js を使用してプロセスを生成し、ローカル上で Edge Functions を実行する  
ただし、Edge Functions では Node.js の API は使えないため、Edge Runtime でも公開されない  
Web 標準の API（fetch など）は Edge Runtime 上でも公開される
