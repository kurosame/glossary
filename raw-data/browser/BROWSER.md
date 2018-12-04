## category

browser

## titles

Browser
ブラウザ

## description

### URL を入力してから、ページが表示されるまでの流れ

1. HTTP リクエストを Web Server へ投げる
1. DNS による名前解決で、サーバの IP アドレスを取得
1. サーバへリクエストを投げて、レスポンスを取得
1. ブラウザのレンダリングエンジンによる描画処理（以下のレンダリングの流れを参照）

### レンダリングの流れ

1. Loading  
   HTML,JavaScript,CSS,画像などのサブリソースをサーバからダウンロードする  
   ブラウザのレンダリングエンジンの内部表現にパースして変換（HTML を DOM に変換、CSS を CSSOM に変換）

1. Scripting  
   JavaScript のコードを JavaScript エンジンに渡して実行  
   コードを AST にパースしてコンパイルし、機械コードにして実行  
   初回実行以外に DOM からイベントが発火する際も同様に行われる

1. Rendering  
   全ての DOM に対して、どの CSS セレクタがマッチするか判断する  
   その後レンダリングエンジンがレイアウトを行う

1. Painting  
   最後に描画する
