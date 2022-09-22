## category

architecture

## titles

T3 Stack

## description

シンプルさ、モジュール性、フルスタック型安全に重きを置いた技術スタック

具体的には以下の技術を採用して実現する

- Next.js
- tRPC
  - サーバー（TS）側で定義して export した型をクライアント側で import して使える
  - サーバー側の型定義が正として、開発をすることになる
  - フロントエンドとサーバーサイド両方とも TS である必要がある
  - GraphQL の代替的役割
- Tailwind CSS
- TypeScript
- Prisma
  - ORM
- NextAuth.js
  - Next.js ベースの認証ライブラリ
