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

<a href="https://kurosame-th.hatenadiary.com/entry/2020/05/15/194135" target="_blank">Firebase の Functions から Firestore への連携が（たまに）失敗する件の対応</a>

クライアントアプリケーションから直接 Functions を呼ぶのは極力避けるべきである  
直接 Functions を呼び出すということはサーバサイドのロジックをクライアントが知っている必要がある  
それは REST API を使うことに考えが近い、極力避けるべきである  
クライアントは Firestore や Storage などのイベントソースを更新し、それをトリガーにして Functions を呼ぶのが良い
