## category

js

## titles

WinterCG
Web-interoperable Runtimes Community Group

## description

非 Web ブラウザのランタイム（Node.js や Deno）が API の相互運用性を改善するために設立されたコミュニティグループ  
なお、Web ブラウザ環境に関しては、WHATWG や W3C が API の標準化を行っている

WinterCG は Node.js、Deno、Cloudflare、Vercel、Shopify などのコアコントリビューターが設立メンバー

Cloudflare や Vercel が持つサーバーレス環境や Node.js、Deno のランタイム環境など非ブラウザ環境で発生する問題などを議論する場となるとのこと  
また、WinterCG 独自で API の標準化を行うのではなく、WHATWG や W3C と連携しながら問題解決を行っていく予定

### WinterJS

WinterCG に準拠したサーバーサイド JS のランタイム（ServiceWorker）  
2024/03 に正式版となる v1.0 がリリースされた

- Rust で開発
- JS エンジンは Firefox の SpiderMonkey を採用
- WinterJS は WebAssembly バイナリにコンパイルすることが可能

<a href="https://github.com/wasmerio/winterjs" target="_blank">WinterJS のコード</a>
