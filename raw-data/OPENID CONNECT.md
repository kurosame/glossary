## category

server

## titles

OpenID Connect

## description

- OAuth がベース
- 認証処理を Cloud Provider（Google や AWS など）などに任せて、認証結果を JWT でクライアントが受け取って認証する方式
- 認証周りの実装・運用を Provider に丸投げできる
  - ただし、ID トークンの検証は必要

1. 自社システム管理者が Cloud Provider に申請し、クライアント ID とクライアントシークレットを発行してもらう
   - 認証処理を Provider に委譲するための申請
1. ユーザーは Provider が提供する認証画面にアクセスする
   - この URL には client_id や response_type などを含む
   - この URL はフロントエンド側で実装しておく
1. 認証画面が表示されたら、ユーザーは ID やパスワードなどを入力する
1. 認証が成功すると、Provider から自社システムにリダイレクトされる
   - この時、response_type が code であれば、認可コードが付与される
   - Provider ではその認可コードと有効期限をセットで保存しておく
1. 自社システムから Provider に対して POST する
   - code（認可コード）、client_id、client_secret などを渡す
1. Provider は有効な認可コードであることを確認し、自社システムに ID トークン（JWT 形式）を返す
1. 自社システムは ID トークンを検証する
