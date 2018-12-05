## category

other

## titles

Dev.to
日経電子版

## description

サイトが非常に高速で話題になった

### やっていること

- HTTP/2  
  複数リクエストを並行処理できるので、サイト上の画像取得等のリクエストを同時にサーバへ投げている

- 静的な HTML はキャッシュ化している  
  Fastly を使っている  
  動的コンテンツはブラウザのレンダリング後に Ajax で取得する

- InstantClick  
  リンク先をオンマウスした時にページの先読みを行う  
  ページ遷移の速度が上がったように見せることができる

- レンダリングブロッキングの排除  
  レンダリングブロッキングが発生する外部 CSS, Javascript の読み込みを排除する  
  例えば広告やソーシャルウィジェットなど外部 CSS, Javascript をリクエストするものを排除している

  `<script>`タグに async/defer を付けて Javascript を非同期でダウンロードする

  `<script src="https://external.com/script.js" async>`  
  HTML のレンダリングを止めることなく、非同期に JS をダウンロードする  
  ダウンロード直後に JS が実行される（実行中はレンダリングはストップする）  
  複数の JS を async でダウンロードした場合は、それぞれダウンロードが終わった順に JS を実行する

  `<script src="https://external.com/script.js" defer>`  
  こちらも HTML のレンダリングを止めることなく、非同期に JS をダウンロードする  
  HTML のレンダリングが終了した後に JS が実行される（DOMContentLoaded イベントの直前）  
  複数の JS を defer でダウンロードした場合は、script タブを書いた順に JS を実行する

- Polyfill  
  `<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>`  
  こちらをロードした後に他の JS を実行するようにしている  
  よって、JS の初期化処理に DOMContentLoaded イベントは使えず、Polyfill ダウンロード後のイベントで処理する必要がある

- Cloudinaly  
  画像の配信に使っている

- ServiceWorker  
  使っている
