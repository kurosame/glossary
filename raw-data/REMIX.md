## category

react

## titles

Remix

## description

2021/11/23 に V1 がリリースされた React ベースの Web フレームワーク  
Remix は Edge ファーストのフレームワークとのこと  
Next.js や Gatsby と同じレイヤー  
Next.js に比べて、ページごとにできる系が多い

特徴は以下

- ベンダーロックインされない
  - Next.js の場合、Vercel に優位性がある
- SG（SSG）や ISR はサポートしていない
- Edge 上での SSR をサポートしている
  - 現状は、Cloudflare Workers のみで実現
  - SSR によるパフォーマンス的懸念は、Edge 上で分散サーバー・分散 DB を実現することで解決のアプローチを図っている
    - ただし、SG で CDN 上に HTML がキャッシュされている方がパフォーマンスは良いだろう
  - Next.js で Edge 上での SSR は難しいらしい
- `app/route`によるファイルベースのルーティング
  - Next.js の pages ディレクトリみたいな
- ページごとに header 情報を書き換えられる
- Nested Routes
  - Nuxt.js の nuxt-child や layout ディレクトリみたいな
- ErrorBoundary と CatchBoundary をページごとに設定できる
  - ErrorBoundary
    - クライアントサイドのコンポーネントエラーのキャッチ
  - CatchBoundary
    - サーバーサイドのエラーのキャッチ
