## category

css

## titles

Cascading Style Sheets
CSS

## description

### 策定の流れ

以下の流れで策定している

1. FPWD（初期草案）
1. WD（草案）
1. LCWD（最終草案）
1. CR（勧告候補）
1. PR（勧告案）
1. REC（勧告）

勧告までいけば仕様が確定しているので、ブラウザ側で実装していれば使える

草案段階では仕様が確定していないが、勧告まで時間がかかるため、ブラウザ側で独自に実装している場合がある  
そのプロパティを使いたい場合は、ベンダープレフィックスを付ける必要がある（`-moz-`や`-webkit-`など）

その後、その機能が勧告され実装されたらベンダープレフィックスは外すべきである（実装が異なる可能性もあるため）  
もしくは、ベンダープレフィックス無しのプロパティを 1 番最後に書いておくなどの考慮をしておく  
（プロパティの CSS 適用優先度が同じ場合、1 番最後に書いたスタイルが適用されるため）

### webpack でバンドルする場合

CSS ファイルを import している場合、webpack で css-loader や style-loader の利用がほぼ必要になる

- css-loader  
  JS でインポートされた CSS を文字列として JS に組み込む  
  css-loader のオプションで CSS Modules にも対応している

- style-loader  
  css-loader で変換した JS 内の CSS 文字列を DOM に挿入する

### CSS の問題

- グローバルスコープ
- 可読性・メンテナンス性の悪さ

### プリプロセッサ（Sass, Less, Stylus など）

可読性・メンテナンス性は解消された  
しかし、グローバルスコープの解決はしていない

### BEM - Block Element Modifier

セレクターの命名規約により、CSS のグローバルスコープを解決している  
ネストが深いと命名から把握が困難  
BEM ルールをチームに徹底する必要がある

### CSS in JS

JS の中に CSS を直接書く  
テンプレートリテラル形式や JSX に組み込めるのとか色々書き方がある

JS のスキルが必要なため、デザイナーが CSS を書く環境では不向き

### CSS Modules

ローカルスコープ化された（グローバル上でユニークな）セレクター名を生成する  
JS 側で CSS のファイルを import することによって、ビルド時にセレクター名をグローバル上でユニークな名前に変更している

CSS Modules の仕様は 1 つだが、それが現状メンテナンスされていない  
また、実装が css-loader や Vite などでバラバラとなっている

css-loader のメンテナーが将来的に css-loader の CSS Modules モードを非推奨にする予定とも述べている  
<a href="https://github.com/webpack-contrib/css-loader/issues/1050#issuecomment-592541379" target="_blank">css-loader の issue</a>

### ブラウザの速度改善のすすめ

ファーストビューで必要な CSS を抜き出し、HTML にインライン化する  
HTML の link タグによる外部 CSS ダウンロードはブラウザのレンダリングブロックをしてしまう

Lighthouse の Unused CSS rules でレンダリングブロックを起こしている外部 CSS ダウンロードを確認できる

`<link rel="preload">`を使ってファーストビューで不要な CSS を非同期でダウンロードすると良い
