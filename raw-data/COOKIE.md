## category

browser

## titles

Cookie

## description

ステートレスなプロトコルである HTTP でステートフルなやり取りを実現するために、ブラウザとサーバ間で情報を送受信する仕組み

### 各ブラウザの動向

- Safari  
  3rd Party Cookie を保存しない
- Firefox  
  ブラックリストにマッチすると 3rd Party Cookie を保存しない
- Chrome  
  3rd Party Cookie を基本的に廃止するが、Cookie の SameSite 属性を導入する

3rd Party Cookie  
閲覧中のドメイン以外から発行されている Cookie  
Chrome DevTool で Cookie を見ると発行先のドメインを確認できる

### Chrome の SameSite 属性の仕様変更について

- Chrome v79 以下  
  SameSite 属性が未指定の場合、デフォルト値は None

- Chrome v80 以上  
  SameSite 属性が未指定の場合、デフォルト値は Lax  
  SameSite 属性に None を指定する場合、Secure 属性が必須  
  CSRF 対策のために導入された

Secure 属性を付けると HTTPS のみが Cookie の作成／読み取りができる

SameSite 属性は以下の値を設定可能

- Strict  
  当サイト（Cookie を発行したサイト）から別ドメインのサイトへアクセス  
  別ドメインのサイトから当サイトへ Cookie を送信しない

- Lax  
  当サイト（Cookie を発行したサイト）から別ドメインのサイトへアクセス  
  GET の場合のみ、別ドメインのサイトから当サイトへ Cookie の送信を許す

- None  
  当サイト（Cookie を発行したサイト）から別ドメインのサイトへアクセス  
  別ドメインのサイトから当サイトへ Cookie の送信をすべて許す

SameSite 属性を適切に設定することで、別ドメインのサイトから Cookie を利用した CSRF 攻撃を防ぐことができる

Chrome v80 以上から SameSite 属性のデフォルト値が Lax になるが、以下に当てはまる場合は対応不要

- Cookie を使っていないサイト
- 別ドメインから GET 以外（POST や PUT）のリクエストがない
- 別ドメインから GET 以外（POST や PUT）のリクエストがあるが、Cookie を使用する必要がない
