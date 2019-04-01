## category

network

## titles

Cross-Origin Resource Sharing
CORS

## description

今見ている Web サイトに別ドメインのサイトから HTTP(S)でデータを読み込もうとすると、エラーになる  
これをアクセス可能にする仕組みが CORS

## 使い方

レスポンスヘッダに Access-Control-Allow-Origin フィールドに許可したいドメインを追加すれば良い  
`*`で全許可できるワイルドカードも使える

Cookie も許可したい場合は Credentials の設定も必要  
ただし、Access-Control-Allow-Origin フィールドにワイルドカードが使えなくなる

以下の 3 つに当てはまる場合、Preflight request として、OPTIONS リクエストを行うことが定められている

1. GET, POST, HEAD 以外である
1. リクエストヘッダに Accept, Accept-Language, Content-Language, Content-Type 以外のフィールドが含まれている
1. リクエストヘッダの Content-Type フィールドに application/x-www-form-urlencoded, multipart/form-data, text/plain 以外の内容が指定されている
