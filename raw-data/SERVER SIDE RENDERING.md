## category

js

## titles

Server Side Rendering
SSR

## description

リクエストを受けて静的 HTML にレンダリングする  
最新の静的 HTML が作れるが、リクエストの度に作るので負荷はかかる

SSR したものを redis に入れておくのも良いかもしれない

### Vue.js

以下を使う  
vue-server-renderer

Nuxt.js という選択肢もある  
Nuxt.js 自体も内部的には、vue-server-renderer を使っているらしい

### SSR する理由

- OGP（Open Graph Protocol）の考慮  
  SNS 上で OGP を設定しておくと、事前に設定された画像・タイトル・説明文が表示され、ユーザへの訴求力アップに繋がる  
  meta タグに設定するため、最低限 meta タグのみを SSR するのもあり

  将来的に SEO の検索順位の決定は、Googlebot が行うことになるだろう  
  Google の Crawler は JavaScript も解釈すると言われている  
  つまり SPA で空の Body となっていても問題ないということ
