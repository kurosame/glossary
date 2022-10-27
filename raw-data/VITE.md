## category

build

## titles

Vite

## description

Snowpack と同様なノーバンドルのビルドツール  
Vue.js 作者の Evan You 氏が開発中  
Vue.js だけではなく、React や Preact をサポート

TS から JS へのトランスパイルは esbuild を使っている

### 環境ごとの違い

- 開発環境
  - ESM で動く
    - CJS は ESM に変換する
- 本番環境
  - Rollup を使ってバンドルする
  - バンドルされていない ESM を本番用に使うことは、現状、通信速度的に非効率
    - webpack などで Tree Shaking、モジュール分割などの技術を使いバンドルするのが無難

本番環境は webpack のまま、開発環境のみ Vite に移行する技術判断はあり
