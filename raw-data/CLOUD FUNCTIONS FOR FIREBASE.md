## category

firebase

## titles

Cloud Functions for Firebase
Cloud Functions

## description

サーバレスアーキテクチャ  
Node.js のみをサポート  
Firebase の他のサービスのアクションをトリガーにして、Cloud Functions で処理できる

Glossary アプリでは、以下の用途で使っている

1. Cloud Storage に用語のローデータをアップロード
1. Cloud Functions でフックして、Cloud Storage からファイルをダウンロードして加工
1. 加工したオブジェクトを Cloud Firestore にセット

クライアントアプリケーションから直接 Functions を呼ぶのは極力避けるべきである  
直接 Functions を呼び出すということはサーバサイドのロジックをクライアントが知っている必要がある  
それは REST API を使うことに考えが近い、極力避けるべきである  
クライアントは Firestore や Storage などのイベントソースを更新し、それをトリガーにして Functions が呼ばれるのが良い
