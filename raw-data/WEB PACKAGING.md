## category

browser

## titles

Web Packaging

## description

Web ページのリソース（HTML,CSS,JS など）を 1 つにまとめて配布元が署名して、改竄されていないことを証明するということができるようになる  
たとえば、配信を Google のキャッシュサーバーが行っても、そのサイトは配布元が秘密鍵で署名しているため、中身が改竄されていないことを証明できる

Web Packaging は主に以下 3 つの技術

- Signed HTTP Exchanges（SXG）
  - 署名
- Web Bundles
  - 複数のコンテンツをバンドル
- Loading Signed Exchanges
  - ブラウザで署名のロードや検証

### Signed HTTP Exchanges（SXG）

単一の HTTP リクエストとレスポンスに対して署名する

たとえば、AMP は Google のキャッシュサーバーから配信されるため、Google の検索結果からアクセスしたサイトの URL をシェアしたい時、`https://google.com/amp/...`という URL になってしまう欠点がある  
SXG で署名すれば、キャッシュサーバーがなんであれ配布元オリジンの URL にすることができる
